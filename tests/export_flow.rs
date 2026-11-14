use idpocket_exporter::{adb::quote, frida};

#[test]
fn native_core_linked_and_remote_failure_is_reported() {
    assert_eq!(frida::core_version(), idpocket_exporter::FRIDA_VERSION);
    let rt = tokio::runtime::Runtime::new().unwrap();
    rt.block_on(async {
        let mut f = frida::Frida::start(
            "127.0.0.1:1".into(),
            "synthetic".into(),
            42,
            "send({kind:'ready'});".into(),
        )
        .unwrap();
        let event = tokio::time::timeout(std::time::Duration::from_secs(15), f.events.recv())
            .await
            .unwrap()
            .unwrap();
        assert_eq!(event["code"], "NATIVE_SETUP_FAILED");
        assert!(f.close().await.is_err());
    });
}

#[test]
fn android_shell_arguments_are_quoted() {
    assert_eq!(quote("a'b $x;"), "'a'\\''b $x;'");
}

#[test]
fn native_cancel_interrupts_a_stalled_connection() {
    let listener = std::net::TcpListener::bind("127.0.0.1:0").unwrap();
    let endpoint = listener.local_addr().unwrap().to_string();
    listener.set_nonblocking(true).unwrap();
    let (stop, wait) = std::sync::mpsc::channel();
    let peer = std::thread::spawn(move || {
        let mut sockets = Vec::new();
        loop {
            if wait.try_recv().is_ok() {
                break;
            }
            if let Ok((socket, _)) = listener.accept() {
                sockets.push(socket);
            }
            std::thread::sleep(std::time::Duration::from_millis(10));
        }
    });
    let rt = tokio::runtime::Runtime::new().unwrap();
    rt.block_on(async {
        let mut f = frida::Frida::start(
            endpoint,
            "synthetic-token".into(),
            42,
            "send({kind:'ready'});".into(),
        )
        .unwrap();
        tokio::time::sleep(std::time::Duration::from_millis(150)).await;
        let event = tokio::time::timeout(std::time::Duration::from_secs(5), async {
            loop {
                f.cancel();
                tokio::select! {
                    e = f.events.recv() => break e.unwrap(),
                    _ = tokio::time::sleep(std::time::Duration::from_millis(50)) => {},
                }
            }
        })
        .await
        .unwrap();
        assert_eq!(event["code"], "NATIVE_SETUP_FAILED");
        assert!(f.close().await.is_err());
    });
    stop.send(()).unwrap();
    peer.join().unwrap();
}

#[test]
fn adb_process_flow_and_changes_are_checked() {
    use idpocket_exporter::{adb::Adb, ui::Ui};
    let dir = tempfile::tempdir().unwrap();
    let extension = if cfg!(windows) { ".exe" } else { "" };
    let executable = dir.path().join(format!("mock adb{extension}"));
    let compiler = std::process::Command::new("rustc")
        .args(["--edition=2024", "tests/fixtures/mock_adb.rs", "-o"])
        .arg(&executable)
        .output()
        .unwrap();
    assert!(
        compiler.status.success(),
        "{}",
        String::from_utf8_lossy(&compiler.stderr)
    );
    let rt = tokio::runtime::Runtime::new().unwrap();
    rt.block_on(async {
        let adb = Adb {
            executable: executable.clone(),
            serial: None,
            ui: Ui::new(false),
        }
        .connect(None)
        .await
        .unwrap();
        assert_eq!(adb.serial.as_deref(), Some("SYNTHETIC"));
        adb.root().await.unwrap();
        let id = adb.target(Some(0)).await.unwrap();
        assert_eq!(id.pid, 4242);
        assert_eq!(id.uid, 10123);
        assert_eq!(id.start, "12345");
        let metadata = adb.metadata().await.unwrap();
        assert_eq!(metadata["appVersion"], "26.28.0");
        let prefs = adb.preferences(0).await.unwrap();
        assert_eq!(prefs.access_token, "synthetic-token");
        assert!(
            !adb.run(&["fail-private"], 1, true)
                .await
                .unwrap_err()
                .to_string()
                .contains("synthetic-token")
        );
        let start = std::time::Instant::now();
        assert!(adb.run(&["sleep"], 1, false).await.is_err());
        assert!(start.elapsed() < std::time::Duration::from_secs(3));
        for mode in ["unauthorized", "offline", "changed"] {
            let path = dir.path().join(format!("{mode}{extension}"));
            std::fs::copy(&executable, &path).unwrap();
            let adb = Adb {
                executable: path,
                serial: None,
                ui: Ui::new(false),
            };
            if mode == "changed" {
                let adb = adb.connect(None).await.unwrap();
                assert!(
                    adb.preferences(0)
                        .await
                        .err()
                        .unwrap()
                        .to_string()
                        .contains("изменились")
                );
            } else {
                assert!(adb.connect(None).await.is_err());
            }
        }
    });
}
