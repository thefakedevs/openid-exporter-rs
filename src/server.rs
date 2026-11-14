use crate::{
    FRIDA_VERSION,
    adb::{Adb, Identity, quote},
};
use anyhow::{Context, Result, bail, ensure};
use futures_util::StreamExt;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::{
    io::{Read, Write},
    path::{Path, PathBuf},
    time::{Duration, Instant},
};

#[derive(Clone, Serialize, Deserialize)]
pub struct ServerState {
    pub serial: String,
    pub directory: String,
    pub identity: Option<Identity>,
    pub host_port: Option<u16>,
    pub remote_port: u16,
}

pub struct Server {
    pub adb: Adb,
    pub state: ServerState,
    pub token: String,
    path: PathBuf,
}

pub fn cache_dir() -> Result<PathBuf> {
    Ok(
        directories::ProjectDirs::from("org", "idpocket", "exporter")
            .context("Не найден каталог кэша")?
            .cache_dir()
            .to_owned(),
    )
}

pub fn arch(abi: &str) -> Result<(&'static str, u8, u16)> {
    match abi {
        "arm64-v8a" => Ok(("arm64", 2, 183)),
        "armeabi-v7a" => Ok(("arm", 1, 40)),
        "x86" => Ok(("x86", 1, 3)),
        "x86_64" => Ok(("x86_64", 2, 62)),
        _ => bail!("ABI Android не поддерживается: {abi}"),
    }
}

fn validate_elf(bytes: &[u8], abi: &str) -> Result<()> {
    let (_, class, machine) = arch(abi)?;
    ensure!(
        bytes.len() >= 64
            && &bytes[..4] == b"\x7fELF"
            && bytes[4] == class
            && bytes[5] == 1
            && u16::from_le_bytes([bytes[18], bytes[19]]) == machine,
        "frida-server не соответствует ABI {abi}"
    );
    Ok(())
}

pub fn random_hex(n: usize) -> Result<String> {
    let mut bytes = vec![0; n];
    getrandom::getrandom(&mut bytes).map_err(|e| anyhow::anyhow!("random: {e}"))?;
    Ok(bytes.iter().map(|b| format!("{b:02x}")).collect())
}

pub async fn binary(adb: &Adb, abi: &str, local: Option<&Path>) -> Result<PathBuf> {
    let (arch, _, _) = arch(abi)?;
    if let Some(p) = local {
        let bytes = std::fs::read(p).context("Не удалось прочитать --frida-server")?;
        ensure!(
            bytes.len() <= 256 * 1024 * 1024,
            "frida-server слишком большой"
        );
        validate_elf(&bytes, abi)?;
        return Ok(p.to_owned());
    }
    let cache = cache_dir()?;
    std::fs::create_dir_all(&cache)?;
    let path = cache.join(format!("frida-server-{FRIDA_VERSION}-android-{arch}"));
    if path.exists() {
        let data = std::fs::read(&path)?;
        validate_elf(&data, abi)?;
        adb.ui.debug("server.cache", path.display().to_string());
        return Ok(path);
    }
    let url = format!(
        concat!(
            "https://github.com/frida/frida/releases/download/{version}/",
            "frida-server-{version}-android-{arch}.xz"
        ),
        version = FRIDA_VERSION,
        arch = arch
    );
    adb.ui.debug("server.download", &url);
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(60))
        .build()?;
    let response = client.get(&url).send().await?.error_for_status()?;
    let known = response.content_length();
    adb.ui.download(known);
    let mut stream = response.bytes_stream();
    let mut compressed = Vec::new();
    while let Some(chunk) = stream.next().await {
        let b = chunk?;
        ensure!(
            compressed.len() + b.len() <= 96 * 1024 * 1024,
            "Архив frida-server слишком большой"
        );
        compressed.extend(b);
        adb.ui.downloaded(compressed.len() as u64);
        adb.ui.debug(
            "server.download",
            format!("received={} total={known:?}", compressed.len()),
        );
    }
    let mut unpacked = Vec::new();
    lzma_rust2::XzReader::new(compressed.as_slice(), true)
        .take(256 * 1024 * 1024 + 1)
        .read_to_end(&mut unpacked)?;
    ensure!(
        unpacked.len() <= 256 * 1024 * 1024,
        "frida-server слишком большой"
    );
    validate_elf(&unpacked, abi)?;
    let mut tmp = tempfile::NamedTempFile::new_in(cache)?;
    tmp.write_all(&unpacked)?;
    tmp.as_file().sync_all()?;
    match tmp.persist_noclobber(&path) {
        Ok(_) => {}
        Err(e) if e.error.kind() == std::io::ErrorKind::AlreadyExists => {}
        Err(e) => return Err(e.error.into()),
    }
    Ok(path)
}

impl Server {
    pub fn register(adb: Adb) -> Result<Self> {
        let cache = cache_dir()?;
        std::fs::create_dir_all(&cache)?;
        let id = random_hex(8)?;
        let path = cache.join(format!("server-{id}.json"));
        let state = ServerState {
            serial: adb.serial.clone().context("Нет serial")?,
            directory: format!("/data/local/tmp/idpocket-rs-{id}"),
            identity: None,
            host_port: None,
            remote_port: 27062,
        };
        let server = Self {
            adb,
            state,
            token: random_hex(32)?,
            path,
        };
        server.save()?;
        // Registration precedes mutations so --stop can recover an interrupted upload.
        Ok(server)
    }

    fn save(&self) -> Result<()> {
        let parent = self.path.parent().unwrap();
        let mut tmp = tempfile::NamedTempFile::new_in(parent)?;
        serde_json::to_writer(&mut tmp, &self.state)?;
        tmp.persist(&self.path).map_err(|e| e.error)?;
        Ok(())
    }

    async fn process_ids(&self) -> Result<Vec<u32>> {
        let command = format!(
            concat!(
                "for p in $(pidof server 2>/dev/null); do ",
                "if [ \"$(readlink /proc/$p/exe)\" = {} ]; then echo $p; fi; done"
            ),
            quote(&format!("{}/server", self.state.directory))
        );
        let pids = self.adb.text(&command, true).await?;
        let pids: Vec<u32> = pids
            .split_whitespace()
            .map(str::parse)
            .collect::<std::result::Result<_, _>>()
            .context("Неверный ответ при поиске собственного frida-server")?;
        ensure!(
            pids.len() <= 1,
            "Несколько процессов в собственном каталоге сервера"
        );
        Ok(pids)
    }

    pub async fn start(&mut self, binary: &Path) -> Result<()> {
        let dir = quote(&self.state.directory);
        let upload = format!("{}/server.upload", self.state.directory);
        let exe = format!("{}/server", self.state.directory);
        self.adb
            .text(&format!("mkdir {dir} && chmod 700 {dir}"), false)
            .await?;
        // ADB's sync service runs as shell, so it must own the upload directory.
        self.adb.push(binary, &upload).await?;
        self.adb
            .text(
                &format!(
                    concat!(
                        "chown 0:0 {dir} {upload} && chmod 700 {dir} {upload} && ",
                        "mkdir {dir}/work && mv {upload} {exe}"
                    ),
                    dir = dir,
                    upload = quote(&upload),
                    exe = quote(&exe)
                ),
                true,
            )
            .await?;
        let hash = format!("{:x}", Sha256::digest(std::fs::read(binary)?));
        let phone = self
            .adb
            .text(&format!("sha256sum {}", quote(&exe)), true)
            .await?;
        ensure!(
            phone.split_whitespace().next() == Some(hash.as_str()),
            "frida-server повредился при передаче"
        );
        let version = self
            .adb
            .text(&format!("{} --version", quote(&exe)), true)
            .await?;
        ensure!(
            version == FRIDA_VERSION,
            "Версия frida-server {version}; нужна {FRIDA_VERSION}"
        );
        let cmd = format!(
            concat!(
                "{} --daemonize --listen=127.0.0.1:{} --token={} --directory={}/work ",
                "--disable-preload > {}/server.log 2>&1 < /dev/null && echo ready"
            ),
            quote(&exe),
            self.state.remote_port,
            quote(&self.token),
            dir,
            dir
        );
        // Frida's daemon mode returns only after startup and detaches from su/ADB.
        let ready = self.adb.shell(&cmd, true, true).await?;
        if std::str::from_utf8(&ready)?.trim() != "ready" {
            let log = self
                .adb
                .text(
                    &format!(
                        "tail -c 16384 {}",
                        quote(&format!("{}/server.log", self.state.directory))
                    ),
                    true,
                )
                .await
                .unwrap_or_else(|error| format!("Не удалось прочитать журнал: {error}"));
            self.adb.ui.debug("server.log", log);
            bail!("frida-server не запустился. Подробности: --verbose.");
        }
        let pid = self
            .process_ids()
            .await?
            .into_iter()
            .next()
            .context("Не найден процесс запущенного frida-server")?;
        // Capture identity before forwarding. Cleanup can recover an interrupted
        // start by the unique executable path in this registered directory.
        let identity = self.adb.identity(pid).await?;
        ensure!(
            identity.uid == 0 && identity.exe == exe,
            "Не удалось подтвердить собственный frida-server"
        );
        self.state.identity = Some(identity);
        self.save()?;
        let remote = format!("tcp:{}", self.state.remote_port);
        // Choose and register the host port before ADB mutates forwarding. This
        // makes a Ctrl+C immediately after forward recoverable with --stop.
        let listener = std::net::TcpListener::bind("127.0.0.1:0")?;
        let port = listener.local_addr()?.port();
        self.state.host_port = Some(port);
        self.save()?;
        drop(listener);
        self.adb
            .run(
                &["forward", "--no-rebind", &format!("tcp:{port}"), &remote],
                25,
                false,
            )
            .await?;
        self.adb.ui.debug(
            "server",
            format!("version={version} pid={pid} endpoint=127.0.0.1:{port}"),
        );
        Ok(())
    }

    pub async fn cleanup(&mut self) -> Result<()> {
        self.adb.ui.debug("cleanup", "starting");
        let directory = self.state.directory.clone();
        let d = &directory;
        ensure!(
            regex::Regex::new(r"^/data/local/tmp/idpocket-rs-[0-9a-f]{16}$")?.is_match(d),
            "Некорректный каталог сервера в state"
        );
        if self.state.identity.is_none() {
            let pids = self.process_ids().await?;
            if let Some(pid) = pids.first() {
                let id = self.adb.identity(*pid).await?;
                ensure!(
                    id.uid == 0 && id.exe == format!("{d}/server"),
                    "Не подтверждён собственный сервер"
                );
                self.state.identity = Some(id);
                self.save()?;
            }
        }
        if let Some(id) = &self.state.identity {
            ensure!(
                id.pid > 1
                    && id.pid < 4_194_304
                    && id.uid == 0
                    && id.exe == format!("{d}/server")
                    && id.start.bytes().all(|b| b.is_ascii_digit()),
                "Некорректная identity в state"
            );
            // Compare UID, executable and start time in the same remote shell before signalling.
            let cmd = format!(
                concat!(
                    "p={}; if [ -d /proc/$p ]; then ",
                    "exe=$(readlink /proc/$p/exe) || exit 8; ",
                    "uid=$(awk '/^Uid:/ {{print $2}}' /proc/$p/status); ",
                    "st=$(sed 's/.*) //' /proc/$p/stat | awk '{{print $20}}'); ",
                    "[ \"$exe\" = {} ] && [ \"$uid\" = 0 ] && [ \"$st\" = {} ] || exit 9; ",
                    "kill -TERM $p; fi"
                ),
                id.pid,
                quote(&id.exe),
                quote(&id.start)
            );
            self.adb.text(&cmd, true).await?;
            let deadline = Instant::now() + Duration::from_secs(5);
            loop {
                let alive = self
                    .adb
                    .text(
                        &format!("[ -d /proc/{} ] && echo alive || echo gone", id.pid),
                        true,
                    )
                    .await?;
                if alive == "gone" {
                    break;
                }
                ensure!(
                    Instant::now() < deadline,
                    "frida-server ещё работает; повторите --stop"
                );
                tokio::time::sleep(Duration::from_millis(200)).await;
            }
        }
        if let Some(port) = self.state.host_port {
            let list = self.adb.run(&["forward", "--list"], 25, false).await?;
            let expected = format!(
                "{} tcp:{port} tcp:{}",
                self.state.serial, self.state.remote_port
            );
            let text = String::from_utf8(list)?;
            if text.lines().any(|l| l.trim() == expected) {
                self.adb
                    .run(&["forward", "--remove", &format!("tcp:{port}")], 25, false)
                    .await?;
            } else {
                ensure!(
                    !text.lines().any(
                        |l| l.split_whitespace().nth(1) == Some(format!("tcp:{port}").as_str())
                    ),
                    "Forward был заменён; очистка остановлена"
                );
            }
        }
        self.adb
            .text(&format!("rm -rf -- {}", quote(d)), true)
            .await?;
        if self.path.exists() {
            std::fs::remove_file(&self.path)?;
        }
        self.adb.ui.debug("cleanup", "done");
        Ok(())
    }
}

pub async fn stop(adb: Adb) -> Result<()> {
    let cache = cache_dir()?;
    if !cache.exists() {
        adb.ui.ok("Нет собственного сервера для остановки");
        return Ok(());
    }
    let mut count = 0;
    for entry in std::fs::read_dir(cache)? {
        let entry = entry?;
        let name = entry.file_name();
        let name = name.to_string_lossy();
        if !name.starts_with("server-") || !name.ends_with(".json") {
            continue;
        }
        let data = std::fs::read(entry.path())?;
        ensure!(data.len() < 16384, "State слишком большой");
        let state: ServerState = serde_json::from_slice(&data)?;
        if Some(&state.serial) != adb.serial.as_ref() {
            continue;
        }
        let mut server = Server {
            adb: adb.clone(),
            state,
            token: String::new(),
            path: entry.path(),
        };
        server.cleanup().await?;
        count += 1;
    }
    adb.ui.ok(&format!("Очистка завершена: {count} серверов"));
    Ok(())
}
