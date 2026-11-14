// Test executable compiled in a temporary directory; never distributed.
use std::{env, io::Write};

fn records() -> Vec<u8> {
    let mut out = Vec::new();
    for (key, value) in [
        ("auth.token", "synthetic-token"),
        ("device.id", "synthetic-device"),
    ] {
        out.extend((key.len() as u16).to_be_bytes());
        out.extend(key.as_bytes());
        out.push(3);
        out.extend((value.len() as u16).to_be_bytes());
        out.extend(value.as_bytes());
    }
    out
}

fn main() {
    let executable = env::current_exe().unwrap();
    let mode = executable.file_stem().unwrap().to_string_lossy();
    let mut args = env::args().skip(1).collect::<Vec<_>>();
    if args.first().is_some_and(|s| s == "-s") {
        assert_eq!(args[1], "SYNTHETIC");
        args.drain(..2);
    }
    let s = args.join(" ");
    if s == "sleep" {
        std::thread::sleep(std::time::Duration::from_secs(10));
        return;
    }
    if s == "fail-private" {
        eprintln!("synthetic-token-must-not-appear");
        std::process::exit(1);
    }
    if s == "version" {
        println!("Android Debug Bridge version 1.0.41");
        return;
    }
    if s == "devices -l" {
        println!("List of devices attached");
        if mode.contains("unauthorized") {
            println!("SYNTHETIC unauthorized");
        } else if mode.contains("offline") {
            println!("SYNTHETIC offline");
        } else {
            println!("SYNTHETIC device model:Mock");
        }
        return;
    }
    if !s.starts_with("shell -T ") && !s.starts_with("exec-out ") {
        panic!("unexpected args");
    }
    if s.contains("pidof ru.oneme.app") {
        println!("4242");
    } else if s.contains("head -c 4096 /proc/") {
        std::io::stdout().write_all(b"ru.oneme.app\0").unwrap();
    } else if s.contains("Uid:") {
        println!("Uid: 10123 10123 10123 10123");
    } else if s.contains("/proc/4242/stat") {
        let mut fields = vec!["0"; 20];
        fields[0] = "S";
        fields[19] = "12345";
        println!("4242 (MAX process) {}", fields.join(" "));
    } else if s.contains("readlink /proc/") {
        println!("/system/bin/app_process64");
    } else if s.contains("dumpsys package") {
        println!("versionName=26.28.0\nversionCode=123");
    } else if s.contains("ro.product.cpu.abi") {
        println!("arm64-v8a");
    } else if s.contains("ro.product.model") {
        println!("Mock Phone");
    } else if s.contains("ro.build.version.release") {
        println!("15");
    } else if s.contains("persist.sys.timezone") {
        println!("Europe/Moscow");
    } else if s.contains("find ") {
        if s.contains("app_file_prefs") {
            std::io::stdout()
                .write_all(b"/data/user/0/ru.oneme.app/app_file_prefs/session.prefs\0")
                .unwrap();
        }
    } else if s.contains("stat -c %s") {
        println!("{}", records().len());
    } else if s.contains("head -c 8388609") {
        let mut bytes = records();
        if mode.contains("changed") {
            let counter = executable.with_extension("counter");
            let n = std::fs::read_to_string(&counter)
                .unwrap_or_default()
                .parse::<u32>()
                .unwrap_or(0);
            std::fs::write(counter, (n + 1).to_string()).unwrap();
            if n > 0 {
                bytes[15] ^= 1;
            }
        }
        std::io::stdout().write_all(&bytes).unwrap();
    } else if s.contains("su -c 'id'") {
        println!("uid=0(root) gid=0(root)");
    } else {
        panic!("unexpected shell command");
    }
}
