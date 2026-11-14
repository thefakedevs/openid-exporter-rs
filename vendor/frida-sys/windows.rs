//! Discover the host libclang and MSVC/Windows SDK headers for bindgen.

use std::{
    env,
    path::{Path, PathBuf},
};

pub fn configure() -> Vec<String> {
    for variable in [
        "TARGET",
        "FRIDA_LIBCLANG_PATH",
        "LIBCLANG_PATH",
        "INCLUDE",
        "VCINSTALLDIR",
        "WindowsSdkDir",
        "ProgramFiles",
        "ProgramFiles(x86)",
    ] {
        println!("cargo:rerun-if-env-changed={variable}");
    }

    let target = env::var("TARGET").unwrap();
    let compiler = cc::windows_registry::find_tool(&target, "cl.exe").expect(
        "MSVC and Windows SDK not found. Install Visual Studio Build Tools with \
         Desktop development with C++ and Windows SDK.",
    );

    let mut includes = Vec::new();
    for (_, value) in compiler.get_envs().filter(|(key, _)| *key == "INCLUDE") {
        includes.extend(env::split_paths(value));
    }
    if let Some(value) = env::var_os("INCLUDE") {
        includes.extend(env::split_paths(&value));
    }
    includes.retain(|path| path.is_dir());
    assert!(
        includes.iter().any(|path| path.join("time.h").is_file()),
        "Windows SDK/UCRT headers (time.h) not found. Install Windows SDK using \
         Visual Studio Installer."
    );

    let libclang = find_libclang(&target).expect(
        "Host libclang.dll not found. Install LLVM (winget install LLVM.LLVM), \
         or set FRIDA_LIBCLANG_PATH to its bin directory.",
    );
    // This single-threaded build-script process is the only environment changed.
    env::set_var("LIBCLANG_PATH", &libclang);

    let mut arguments = vec![format!("--target={target}")];
    for path in includes {
        arguments.push("-isystem".into());
        arguments.push(path.to_string_lossy().into_owned());
    }
    arguments
}

fn library_directory(path: &Path) -> Option<PathBuf> {
    let directory = if path.is_file() { path.parent()? } else { path };
    directory
        .join("libclang.dll")
        .is_file()
        .then(|| directory.to_owned())
}

fn is_embedded_clang(path: &Path) -> bool {
    let path = path.to_string_lossy().to_ascii_lowercase();
    path.contains("esp-clang") || path.contains("xtensa")
}

fn find_libclang(target: &str) -> Option<PathBuf> {
    if let Some(path) = env::var_os("FRIDA_LIBCLANG_PATH") {
        return Some(library_directory(Path::new(&path)).expect(
            "FRIDA_LIBCLANG_PATH must contain a host libclang.dll file or its directory.",
        ));
    }

    let manifest = PathBuf::from(env::var_os("CARGO_MANIFEST_DIR")?);
    let project = manifest.parent()?.parent()?;
    let portable = project.join("target/tooling/libclang");
    if let Some(directory) = library_directory(&portable) {
        return Some(directory);
    }
    if let Ok(entries) = std::fs::read_dir(portable) {
        for entry in entries.flatten() {
            let directory = entry.path().join("platlib/clang/native");
            if let Some(directory) = library_directory(&directory) {
                return Some(directory);
            }
        }
    }

    for variable in ["ProgramFiles", "ProgramFiles(x86)"] {
        if let Some(base) = env::var_os(variable) {
            if let Some(directory) = library_directory(&Path::new(&base).join("LLVM/bin")) {
                return Some(directory);
            }
        }
    }
    if let Some(clang) = cc::windows_registry::find_tool(target, "clang.exe") {
        if let Some(directory) = clang.path().parent().and_then(library_directory) {
            return Some(directory);
        }
    }

    // A globally configured embedded clang (e.g. ESP32) must not override host LLVM.
    if let Some(path) = env::var_os("LIBCLANG_PATH") {
        if !is_embedded_clang(Path::new(&path)) {
            if let Some(directory) = library_directory(Path::new(&path)) {
                return Some(directory);
            }
        }
    }
    for directory in env::split_paths(&env::var_os("PATH").unwrap_or_default()) {
        if !is_embedded_clang(&directory) {
            if let Some(directory) = library_directory(&directory) {
                return Some(directory);
            }
        }
    }
    None
}
