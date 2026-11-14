use crate::{
    adb::{Adb, Identity},
    agent,
    cli::Cli,
    frida::Frida,
    import_url,
    model::{self, Material},
    output,
    server::{self, Server},
    ui::Ui,
};
use anyhow::{Context, Result, bail, ensure};
use serde_json::Value;
use std::time::Duration;

#[derive(Debug)]
struct Cancelled;

impl std::fmt::Display for Cancelled {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Отменено пользователем")
    }
}

impl std::error::Error for Cancelled {}

pub struct Outcome {
    pub code: i32,
    pub error: Option<anyhow::Error>,
}

async fn interruptible<T>(future: impl std::future::Future<Output = Result<T>>) -> Result<T> {
    tokio::select! {
        result = future => result,
        _ = tokio::signal::ctrl_c() => Err(Cancelled.into()),
    }
}

async fn prompt<T: Send + 'static>(f: impl FnOnce() -> Result<T> + Send + 'static) -> Result<T> {
    let result = tokio::task::spawn_blocking(f).await?;
    match result {
        Err(e)
            if e.chain().any(|source| {
                source
                    .downcast_ref::<std::io::Error>()
                    .is_some_and(|io| io.kind() == std::io::ErrorKind::Interrupted)
            }) =>
        {
            Err(Cancelled.into())
        }
        other => other,
    }
}

async fn initial(cli: &Cli, ui: &Ui) -> Result<(Adb, Identity, Value, String)> {
    output::preflight(cli.output.as_deref())?;
    ui.stage("Проверяю подключение…");
    let adb = Adb {
        executable: cli.adb.clone(),
        serial: None,
        ui: ui.clone(),
    }
    .connect(cli.serial.as_deref())
    .await?;
    let metadata = adb.metadata().await?;
    server::arch(metadata["arch"].as_str().context("Нет ABI телефона")?)?;
    ui.ok(&format!(
        "{} подключён",
        metadata["deviceName"].as_str().unwrap_or("Телефон")
    ));
    ui.stage("Проверяю root и MAX…");
    adb.root().await?;
    let target = adb.target(cli.android_user).await?;
    ui.ok("Root доступен; MAX найден");
    ui.debug(
        "target",
        format!(
            "pid={} uid={} user={} start={}",
            target.pid,
            target.uid,
            target.uid / 100000,
            target.start
        ),
    );
    let password = prompt({
        let ui = ui.clone();
        move || ui.password()
    })
    .await?;
    Ok((adb, target, metadata, password))
}

async fn event(frida: &mut Frida, kind: &str, seconds: u64, ui: &Ui) -> Result<Value> {
    tokio::time::timeout(Duration::from_secs(seconds), async {
        while let Some(p) = frida.events.recv().await {
            let k = p["kind"].as_str().unwrap_or("unknown");
            ui.debug("frida.message", format!("kind={k}"));
            if k == "error" {
                let code = p["code"].as_str().unwrap_or("UNKNOWN");
                if ui.verbose {
                    ui.debug(
                        "frida.error",
                        format!(
                            "code={code} description={} reason={} stack={}",
                            p["description"], p["reason"], p["stack"]
                        ),
                    );
                }
                let action = match code {
                    "OPEN_DIGITAL_ID_AND_UNLOCK_FIRST" | "CAPTURE_TIMEOUT" => {
                        "Откройте Digital ID в MAX, разблокируйте его и дождитесь QR."
                    }
                    "SESSION_DETACHED" => {
                        "Процесс MAX завершён или телефон отключён. Повторите экспорт."
                    }
                    "MULTIPLE_VISIBLE_DID_VIEWS" => {
                        "Открыто несколько DID WebView. Закройте лишние окна MAX."
                    }
                    "NATIVE_SETUP_FAILED" | "JAVA_SETUP_FAILED" | "AGENT_EXCEPTION" => {
                        let description = p["description"]
                            .as_str()
                            .unwrap_or("Причина не передана агентом");
                        let stage = if code == "NATIVE_SETUP_FAILED" {
                            "Не удалось подключить Frida"
                        } else {
                            "Ошибка агента Frida"
                        };
                        bail!("{stage}: {description} ({code})");
                    }
                    "ORIGIN_CHANGED" => "Страница Digital ID изменилась. Повторите экспорт.",
                    _ => "Повторите экспорт с --verbose для диагностики.",
                };
                bail!("{action} ({code})");
            }
            if k == kind {
                return Ok(p);
            }
        }
        bail!("Frida worker остановился до получения {kind}")
    })
    .await
    .with_context(|| format!("Frida: ожидание {kind} превысило {seconds}s"))?
}

struct CaptureState {
    native: Option<Frida>,
    published: bool,
}

async fn capture(
    cli: &Cli,
    ui: &Ui,
    server: &mut Server,
    target: &Identity,
    metadata: &Value,
    password: &str,
    state: &mut CaptureState,
) -> Result<()> {
    ui.stage("Подготовка экспорта…");
    let abi = metadata["arch"].as_str().context("Нет ABI")?;
    let binary = server::binary(&server.adb, abi, cli.frida_server.as_deref()).await?;
    server.start(&binary).await?;
    let endpoint = format!(
        "127.0.0.1:{}",
        server.state.host_port.context("Нет forward")?
    );
    state.native = Some(Frida::start(
        endpoint,
        server.token.clone(),
        target.pid,
        agent::source(),
    )?);
    let frida = state.native.as_mut().unwrap();
    frida.configure(agent::configuration(
        cli.with_biometry,
        &format!("__idp_{}", server::random_hex(8)?),
    )?)?;
    let ready = event(frida, "ready", 150, ui).await?;
    ui.debug("frida.ready", format!("{ready}"));
    ensure!(
        ready["uid"].as_u64() == Some(target.uid as u64),
        "UID агента не совпал с процессом MAX"
    );
    ui.ok("Всё готово");
    prompt({
        let ui = ui.clone();
        move || {
            ui.enter(concat!(
                "Откройте Digital ID в MAX и разблокируйте его. ",
                "Когда появится QR, нажмите Enter здесь."
            ))
        }
    })
    .await?;
    ui.stage("Ожидаю Digital ID…");
    frida.post("capture")?;
    let p = event(
        frida,
        "material",
        if cli.with_biometry { 140 } else { 65 },
        ui,
    )
    .await?;
    let material: Material = serde_json::from_value(p["material"].clone())
        .context("Неподдерживаемые поля снимка Digital ID")?;
    material.validate(cli.with_biometry)?;
    ui.stage("Проверяю данные и создаю ссылку…");
    let session = server.adb.preferences(target.uid / 100000).await?;
    ensure!(
        server.adb.identity(target.pid).await? == *target,
        "Процесс MAX изменился во время экспорта. Повторите экспорт."
    );
    let account = model::build_account(&session, &material, metadata, cli.with_biometry)?;
    let uri = import_url::encode(&account, password)?;
    ui.debug(
        "output",
        format!(
            "roundtrip=ok uri_bytes={} file={:?} stdout={}",
            uri.len(),
            cli.output,
            cli.stdout || cli.output.is_none()
        ),
    );
    ui.pause();
    output::write(&uri, cli.output.as_deref(), cli.stdout)?;
    state.published = true;
    Ok(())
}

pub async fn run(cli: Cli, ui: Ui) -> Outcome {
    ui.title();
    ui.debug(
        "runtime",
        format!(
            "core={} os={} arch={}",
            crate::frida::core_version(),
            std::env::consts::OS,
            std::env::consts::ARCH
        ),
    );
    if cli.doctor || cli.stop {
        let result = interruptible(async {
            ui.stage("Проверяю ADB и телефон…");
            let adb = Adb {
                executable: cli.adb.clone(),
                serial: None,
                ui: ui.clone(),
            }
            .connect(cli.serial.as_deref())
            .await?;
            adb.root().await?;
            if cli.stop {
                server::stop(adb).await?;
            } else {
                let meta = adb.metadata().await?;
                let id = adb.target(cli.android_user).await?;
                server::arch(meta["arch"].as_str().unwrap_or(""))?;
                ui.ok(&format!(
                    "{} · MAX {} · Android user {} · root OK · Frida {}",
                    meta["deviceName"].as_str().unwrap_or("Android"),
                    meta["appVersion"].as_str().unwrap_or("?"),
                    id.uid / 100000,
                    crate::FRIDA_VERSION
                ));
            }
            Ok(())
        })
        .await;
        return outcome(result, false, false);
    }
    let (adb, target, metadata, password) = match interruptible(initial(&cli, &ui)).await {
        Ok(v) => v,
        Err(e) => return outcome(Err(e), false, false),
    };
    let mut server = match Server::register(adb) {
        Ok(s) => s,
        Err(e) => return outcome(Err(e), false, false),
    };
    let mut state = CaptureState {
        native: None,
        published: false,
    };
    let result = interruptible(capture(
        &cli,
        &ui,
        &mut server,
        &target,
        &metadata,
        &password,
        &mut state,
    ))
    .await;
    ui.pause();
    if let Some(frida) = &mut state.native
        && let Err(e) = frida.close().await
    {
        ui.debug("cleanup.frida", format!("{e:#}"));
        ui.warn("Не удалось полностью отключить Frida; продолжаю остановку сервера");
    }
    let cleanup = server.cleanup().await;
    if let Err(e) = &cleanup {
        ui.debug("cleanup.server", format!("{e:#}"));
        ui.warn("Очистка не завершена. Подключите телефон и выполните --stop.");
    }
    if state.published {
        if let Some(p) = &cli.output {
            ui.ok(&format!("Готово — ссылка сохранена: {}", p.display()));
        } else {
            ui.ok("Готово — скопируйте ссылку в ID Pocket");
        }
    }
    outcome(result, state.published, cleanup.is_err())
}

fn outcome(result: Result<()>, published: bool, cleanup_failed: bool) -> Outcome {
    let result = if published && result.as_ref().is_err_and(|e| e.is::<Cancelled>()) {
        Ok(())
    } else {
        result
    };
    let code = match &result {
        Ok(()) if published && cleanup_failed => 3,
        Ok(()) => 0,
        Err(e) if e.is::<Cancelled>() && !published => 130,
        Err(_) => 2,
    };
    Outcome {
        code,
        error: result.err(),
    }
}
