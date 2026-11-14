use anyhow::{Context, Result, bail, ensure};
use idpocket_exporter::{
    adb::{Adb, quote},
    agent,
    frida::Frida,
    server::{self, Server},
    ui::Ui,
};
use std::{path::PathBuf, time::Duration};

#[tokio::test]
#[ignore = "Requires rooted Android, running MAX and IDPOCKET_TEST_SERIAL"]
async fn java_agent_ready_and_cleanup_on_android() {
    let adb = Adb {
        executable: std::env::var_os("IDPOCKET_TEST_ADB")
            .map(PathBuf::from)
            .unwrap_or_else(|| "adb".into()),
        serial: Some(std::env::var("IDPOCKET_TEST_SERIAL").unwrap()),
        ui: Ui::new(false),
    };
    adb.root().await.unwrap();
    let target = adb.target(Some(0)).await.unwrap();
    let abi = adb.text("getprop ro.product.cpu.abi", false).await.unwrap();
    let binary = server::binary(&adb, &abi, None).await.unwrap();
    let mut server = Server::register(adb).unwrap();
    let mut native = None;

    let connected: Result<()> = async {
        server.start(&binary).await?;
        let endpoint = format!(
            "127.0.0.1:{}",
            server.state.host_port.context("Missing ADB forward")?
        );
        native = Some(Frida::start(
            endpoint,
            server.token.clone(),
            target.pid,
            agent::source(),
        )?);
        let frida = native.as_mut().unwrap();
        frida.configure(agent::configuration(false, "__idp_readiness_test")?)?;

        // Install the real Java/WebView hooks, but never trigger a DID snapshot.
        tokio::time::timeout(Duration::from_secs(150), async {
            while let Some(packet) = frida.events.recv().await {
                match packet["kind"].as_str() {
                    Some("ready") => {
                        ensure!(packet["uid"].as_u64() == Some(u64::from(target.uid)));
                        return Ok(());
                    }
                    Some("error") => bail!("Java agent: {packet}"),
                    _ => {}
                }
            }
            bail!("Frida worker stopped before Java agent became ready")
        })
        .await
        .context("Java agent readiness timed out")?
    }
    .await;

    let closed = if let Some(frida) = native.as_mut() {
        frida.close().await
    } else {
        Ok(())
    };
    let cleaned = server.cleanup().await;
    let process_after = server.adb.identity(target.pid).await;
    let directory_after = server
        .adb
        .text(
            &format!(
                "[ ! -e {} ] && echo removed",
                quote(&server.state.directory)
            ),
            true,
        )
        .await;

    assert!(connected.is_ok(), "agent setup: {connected:?}");
    assert!(closed.is_ok(), "agent close: {closed:?}");
    assert!(cleaned.is_ok(), "server cleanup: {cleaned:?}");
    assert_eq!(process_after.unwrap(), target, "MAX process changed");
    assert_eq!(directory_after.unwrap(), "removed");
}
