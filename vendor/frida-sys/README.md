# Local frida-sys build patch

Source: `frida-sys 0.17.2` from crates.io, upstream commit
[`117728945e04d3eb44442e19d0e0311e56863f1e`](https://github.com/frida/frida-rust/tree/117728945e04d3eb44442e19d0e0311e56863f1e).
The original copyright notices and wxWindows license apply to the upstream code.

The FFI source and fallback header are unchanged. `FRIDA_VERSION` selects Core
17.23.3; bindings are generated from that devkit's header when auto-download is
enabled. The build script additionally discovers MSVC/Windows SDK include directories using `cc`,
selects a host libclang, and passes the Rust target explicitly to Clang. All
environment changes stay inside the dependency's build-script process.

Libclang selection: explicit `FRIDA_LIBCLANG_PATH`, the project's portable copy
under `target/tooling/libclang`, installed LLVM, Visual Studio LLVM, an existing
desktop `LIBCLANG_PATH`, then PATH. A global ESP32/xtensa `LIBCLANG_PATH` is ignored.
Missing tools produce an installation hint. Linux and macOS use upstream setup.
