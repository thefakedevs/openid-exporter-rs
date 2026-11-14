use crate::{model::Session, prefs, ui::Ui};
use anyhow::{Context, Result, bail, ensure};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use std::{
    collections::BTreeMap,
    path::{Path, PathBuf},
    process::Stdio,
    time::{Duration, Instant},
};
use tokio::{io::AsyncReadExt, process::Command};

pub fn quote(s: &str) -> String {
    format!("'{}'", s.replace('\'', "'\\''"))
}

#[derive(Clone)]
pub struct Adb {
    pub executable: PathBuf,
    pub serial: Option<String>,
    pub ui: Ui,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Identity {
    pub pid: u32,
    pub uid: u32,
    pub start: String,
    pub exe: String,
    pub name: String,
}

impl Adb {
    pub async fn run(&self, args: &[&str], seconds: u64, sensitive: bool) -> Result<Vec<u8>> {
        let start = Instant::now();
        self.ui.debug(
            "adb",
            format!(
                "{} {} timeout={seconds}s",
                self.executable.display(),
                if sensitive {
                    "<private command>".into()
                } else {
                    format!("{args:?}")
                }
            ),
        );
        let mut c = Command::new(&self.executable);
        if let Some(s) = &self.serial {
            c.args(["-s", s]);
        }
        c.args(args)
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .stdin(Stdio::null())
            .kill_on_drop(true);
        #[cfg(windows)]
        c.creation_flags(0x08000000);
        let mut child = c.spawn().with_context(|| {
            format!(
                concat!(
                    "ADB не найден или не запускается: {}. ",
                    "Установите Android Platform-Tools: ",
                    "https://developer.android.com/tools/releases/platform-tools ; ",
                    "либо укажите --adb PATH"
                ),
                self.executable.display()
            )
        })?;
        let mut stdout = child.stdout.take().unwrap();
        let mut stderr = child.stderr.take().unwrap();
        let op = async {
            let mut out = Vec::new();
            let mut err = Vec::new();
            let mut out_reader = (&mut stdout).take(9 * 1024 * 1024);
            let mut err_reader = (&mut stderr).take(64 * 1024);
            let (a, b, status) = tokio::join!(
                out_reader.read_to_end(&mut out),
                err_reader.read_to_end(&mut err),
                child.wait()
            );
            a?;
            b?;
            let status = status?;
            Ok::<_, anyhow::Error>((status, out, err))
        };
        let (status, out, err) = match tokio::time::timeout(Duration::from_secs(seconds), op).await
        {
            Ok(r) => r?,
            Err(_) => {
                let _ = child.kill().await;
                let _ = child.wait().await;
                bail!("ADB-команда не завершилась за {seconds}s");
            }
        };
        self.ui.debug(
            "adb",
            format!(
                "elapsed={:.3}s exit={status} stdout={}B stderr={}B",
                start.elapsed().as_secs_f64(),
                out.len(),
                err.len()
            ),
        );
        if !sensitive {
            self.ui.debug("adb.stdout", String::from_utf8_lossy(&out));
            self.ui.debug("adb.stderr", String::from_utf8_lossy(&err));
        }
        ensure!(
            out.len() < 9 * 1024 * 1024 && err.len() < 64 * 1024,
            "Слишком большой ответ ADB"
        );
        if !status.success() {
            if sensitive {
                bail!(
                    "Ошибка ADB при чтении закрытых данных (exit {status}); проверьте root и подключение"
                );
            } else {
                bail!("ADB: {}", String::from_utf8_lossy(&err).trim());
            }
        }
        Ok(out)
    }

    pub async fn shell(&self, cmd: &str, root: bool, private: bool) -> Result<Vec<u8>> {
        let cmd = if root {
            format!("su -c {}", quote(cmd))
        } else {
            cmd.to_owned()
        };
        // exec-out preserves bytes, including LF, on the Windows ADB client.
        self.run(&["exec-out", &cmd], 25, private).await
    }

    pub async fn text(&self, cmd: &str, root: bool) -> Result<String> {
        let cmd = if root {
            format!("su -c {}", quote(cmd))
        } else {
            cmd.to_owned()
        };
        // Text commands use shell v2 so a remote failure has a nonzero exit status.
        let bytes = self.run(&["shell", "-T", &cmd], 25, false).await?;
        Ok(String::from_utf8(bytes)?.trim().into())
    }

    pub async fn connect(mut self, serial: Option<&str>) -> Result<Self> {
        self.run(&["version"], 25, false).await?;
        let bytes = self.run(&["devices", "-l"], 25, false).await?;
        let txt = String::from_utf8(bytes)?;
        let devices: Vec<_> = txt
            .lines()
            .skip(1)
            .filter_map(|l| {
                let mut p = l.split_whitespace();
                Some((p.next()?.to_owned(), p.next()?.to_owned()))
            })
            .collect();
        let pick = if let Some(s) = serial {
            devices
                .iter()
                .find(|(id, _)| id == s)
                .context("Указанный телефон не найден в adb devices")?
        } else {
            let good: Vec<_> = devices.iter().filter(|(_, st)| st == "device").collect();
            match good.len() {
                0 => {
                    if devices.iter().any(|(_, st)| st == "unauthorized") {
                        bail!("Телефон не разрешил USB-отладку. Подтвердите запрос на телефоне.");
                    }
                    bail!(
                        "Нет доступного телефона. Подключите USB, включите USB debugging и проверьте adb devices."
                    );
                }
                1 => good[0],
                _ => {
                    let choices = good.iter().map(|(id, _)| id.clone()).collect::<Vec<_>>();
                    let ui = self.ui.clone();
                    let i = tokio::task::spawn_blocking(move || {
                        ui.choose("Выберите телефон", &choices)
                    })
                    .await??;
                    good[i]
                }
            }
        };
        ensure!(
            pick.1 == "device",
            "Телефон {}: {}. Проверьте USB-отладку и подключение.",
            pick.0,
            pick.1
        );
        self.serial = Some(pick.0.clone());
        Ok(self)
    }

    pub async fn root(&self) -> Result<()> {
        let text = self.text("id", true).await?;
        ensure!(
            text.contains("uid=0("),
            "Root недоступен. Разрешите su для ADB на телефоне."
        );
        Ok(())
    }

    pub async fn identity(&self, pid: u32) -> Result<Identity> {
        ensure!(pid > 1 && pid < 4_194_304, "Некорректный PID");
        let name = self
            .shell(&format!("head -c 4096 /proc/{pid}/cmdline"), true, true)
            .await?;
        let name = String::from_utf8(name.split(|b| *b == 0).next().unwrap_or_default().to_vec())?;
        let status = self
            .text(&format!("grep '^Uid:' /proc/{pid}/status"), true)
            .await?;
        let uids: Vec<_> = status
            .split_whitespace()
            .skip(1)
            .map(str::parse::<u32>)
            .collect::<std::result::Result<_, _>>()
            .context("Некорректные числовые UID в /proc/status")?;
        ensure!(
            uids.len() == 4 && uids.iter().all(|v| *v == uids[0]),
            "Некорректный UID процесса"
        );
        let stat = self.text(&format!("cat /proc/{pid}/stat"), true).await?;
        let start = stat
            .rsplit_once(')')
            .context("Некорректный /proc/stat")?
            .1
            .split_whitespace()
            .nth(19)
            .context("Нет starttime")?
            .to_owned();
        let exe = self
            .text(&format!("readlink /proc/{pid}/exe"), true)
            .await?;
        Ok(Identity {
            pid,
            uid: uids[0],
            start,
            exe,
            name,
        })
    }

    pub async fn target(&self, user: Option<u32>) -> Result<Identity> {
        let pids = self.text("pidof ru.oneme.app || true", true).await?;
        let pids: Vec<u32> = pids
            .split_whitespace()
            .map(str::parse)
            .collect::<std::result::Result<_, _>>()?;
        ensure!(pids.len() <= 16, "Слишком много процессов MAX");
        let mut targets = Vec::new();
        for pid in pids {
            let id = self.identity(pid).await?;
            if id.name == "ru.oneme.app"
                && id.uid % 100000 >= 10000
                && user.is_none_or(|u| u == id.uid / 100000)
            {
                targets.push(id);
            }
        }
        match targets.len() {
            0 => bail!("Откройте главный экран MAX в нужном Android-профиле и запустите ещё раз."),
            1 => Ok(targets.remove(0)),
            _ => {
                let choices = targets
                    .iter()
                    .map(|t| format!("Android user {} (PID {})", t.uid / 100000, t.pid))
                    .collect::<Vec<_>>();
                let ui = self.ui.clone();
                let i = tokio::task::spawn_blocking(move || {
                    ui.choose("Выберите профиль MAX", &choices)
                })
                .await??;
                Ok(targets.remove(i))
            }
        }
    }

    async fn snapshot(&self, user: u32) -> Result<BTreeMap<String, Vec<u8>>> {
        let mut files = BTreeMap::new();
        let mut total = 0;
        for (sub, suffix) in [("app_file_prefs", ".prefs"), ("shared_prefs", ".xml")] {
            let dir = format!("/data/user/{user}/ru.oneme.app/{sub}");
            let q = quote(&dir);
            let list = self
                .shell(
                    &format!(
                        "if [ -d {q} ]; then find {q} -maxdepth 1 -type f -name {} -print0; fi",
                        quote(&format!("*{suffix}"))
                    ),
                    true,
                    true,
                )
                .await?;
            for path in list.split(|b| *b == 0).filter(|v| !v.is_empty()) {
                let path = std::str::from_utf8(path)?;
                let base = path
                    .strip_prefix(&format!("{dir}/"))
                    .context("Неверный путь preferences")?;
                ensure!(
                    !base.contains('/')
                        && base.ends_with(suffix)
                        && !base.chars().any(char::is_control),
                    "Неверный путь preferences"
                );
                ensure!(files.len() < 128, "Слишком много файлов preferences");
                let q = quote(path);
                let size = self
                    .shell(&format!("[ ! -L {q} ] && stat -c %s {q}"), true, true)
                    .await?;
                let size = std::str::from_utf8(&size)?.trim().parse::<usize>()?;
                ensure!(size <= 8 * 1024 * 1024, "Слишком большой файл preferences");
                total += size;
                ensure!(
                    total <= 32 * 1024 * 1024,
                    "Слишком большой набор preferences"
                );
                let bytes = self
                    .shell(&format!("[ ! -L {q} ] && head -c 8388609 {q}"), true, true)
                    .await?;
                ensure!(
                    bytes.len() == size,
                    "Размер preferences изменился при чтении"
                );
                self.ui.debug("preferences", format!("{path} bytes={size}"));
                files.insert(path.to_owned(), bytes);
            }
        }
        Ok(files)
    }

    pub async fn preferences(&self, user: u32) -> Result<Session> {
        let a = self.snapshot(user).await?;
        let b = self.snapshot(user).await?;
        ensure!(a == b, "Preferences MAX изменились. Повторите экспорт.");
        let mut records = Vec::new();
        for (path, data) in a {
            let parsed = if path.ends_with(".xml") {
                prefs::xml(&data)?
            } else {
                prefs::binary(&data)
            };
            self.ui.debug(
                "preferences",
                format!("{path} named_records={}", parsed.len()),
            );
            records.extend(parsed);
        }
        prefs::session(&records)
    }

    pub async fn metadata(&self) -> Result<Value> {
        let dump = self.text("dumpsys package ru.oneme.app", false).await?;
        let version = regex::Regex::new(r"\bversionName=(\d+(?:\.\d+){1,3})(?:\s|$)")?
            .captures(&dump)
            .context("Не определена версия MAX")?[1]
            .to_owned();
        let mut result = json!({ "appVersion": version });
        for (key, prop) in [
            ("osVersion", "ro.build.version.release"),
            ("deviceName", "ro.product.model"),
            ("arch", "ro.product.cpu.abi"),
        ] {
            let v = self.text(&format!("getprop {prop}"), false).await?;
            ensure!(
                !v.is_empty() && v.len() <= 1024 && !v.chars().any(char::is_control),
                "Некорректное metadata {key}"
            );
            result[key] = json!(v);
        }
        if let Some(c) = regex::Regex::new(r"\bversionCode=(\d+)")?.captures(&dump) {
            result["buildNumber"] = json!(c[1].parse::<u64>()?);
        }
        let tz = self.text("getprop persist.sys.timezone", false).await?;
        if regex::Regex::new(r"^[A-Za-z0-9_+/:-]{1,80}$")?.is_match(&tz) {
            result["timezone"] = json!(tz);
        }
        Ok(result)
    }

    pub async fn push(&self, local: &Path, remote: &str) -> Result<()> {
        self.run(
            &[
                "push",
                local.to_str().context("Путь frida-server не UTF-8")?,
                remote,
            ],
            180,
            false,
        )
        .await?;
        Ok(())
    }
}
