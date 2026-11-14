use idpocket_exporter::{
    adb::{Adb, quote},
    server::{self, Server},
    ui::Ui,
};
use std::path::{Path, PathBuf};

async fn assert_directory_removed(server: &Server) {
    let result = server
        .adb
        .text(
            &format!(
                "[ ! -e {} ] && echo removed",
                quote(&server.state.directory)
            ),
            true,
        )
        .await
        .unwrap();
    assert_eq!(result, "removed");
}

#[tokio::test]
#[ignore = "Requires rooted Android and IDPOCKET_TEST_SERIAL"]
async fn shell_upload_root_start_and_cleanup_on_android() {
    let adb = Adb {
        executable: std::env::var_os("IDPOCKET_TEST_ADB")
            .map(PathBuf::from)
            .unwrap_or_else(|| "adb".into()),
        serial: Some(std::env::var("IDPOCKET_TEST_SERIAL").unwrap()),
        ui: Ui::new(true),
    };
    adb.root().await.unwrap();
    assert_eq!(
        adb.shell("printf '\\000\\012\\015\\377'", false, true)
            .await
            .unwrap(),
        [0x00, 0x0a, 0x0d, 0xff]
    );
    let abi = adb.text("getprop ro.product.cpu.abi", false).await.unwrap();
    let binary = server::binary(&adb, &abi, None).await.unwrap();

    let mut server = Server::register(adb.clone()).unwrap();
    let started = server.start(&binary).await;
    let permissions = if started.is_ok() {
        server
            .adb
            .text(
                &format!(
                    "stat -c '%u %a' {} {}",
                    quote(&server.state.directory),
                    quote(&format!("{}/server", server.state.directory))
                ),
                true,
            )
            .await
    } else {
        Ok(String::new())
    };
    let cleaned = server.cleanup().await;
    assert!(started.is_ok(), "server start: {started:?}");
    assert!(cleaned.is_ok(), "server cleanup: {cleaned:?}");
    assert_eq!(
        permissions.unwrap().lines().collect::<Vec<_>>(),
        ["0 700", "0 700"]
    );
    assert_directory_removed(&server).await;

    // A failed ADB upload must also remove the shell-owned staging directory.
    let mut server = Server::register(adb).unwrap();
    let missing =
        Path::new(env!("CARGO_MANIFEST_DIR")).join("target/nonexistent-server-for-upload-test");
    assert!(!missing.exists());
    assert!(server.start(&missing).await.is_err());
    server.cleanup().await.unwrap();
    assert_directory_removed(&server).await;
}
