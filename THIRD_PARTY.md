# Third-party components

The project license is GPL-3.0-only; see `LICENSE`.

## Frida Core and Java bridge

The executable embeds the official Frida Core **17.23.3** devkit. The Android
Frida server uses the same version. `vendor/frida-sys/FRIDA_VERSION` and
`src/lib.rs` record these versions.

- [Frida release 17.23.3](https://github.com/frida/frida/releases/tag/17.23.3)
- [Frida Core source](https://github.com/frida/frida-core/tree/b03488ac72c309fc93d555f5f71aa213e4de463f)
- [Frida Gum source](https://github.com/frida/frida-gum/tree/1208a1266e9d28e6c958b6a167b6d944ebefaf47)

The embedded Java agent uses `frida-java-bridge` 7.0.13 with upstream Android 17
fixes, pinned to commit
[`b38a5b647d3e6b72aa19bcf8eb5e41c550a0e622`](https://github.com/frida/frida-java-bridge/tree/b38a5b647d3e6b72aa19bcf8eb5e41c550a0e622).
Its download URL and integrity are recorded in `agent/package-lock.json`.

Frida's license notices and source references are included in `licenses/`.
The Java bridge declares `LGPL-2.0 WITH WxWindows-exception-3.1` in its package
metadata. See the upstream notices for the license text.

## Rust dependencies

`Cargo.lock` records exact versions. The local `vendor/frida-sys` patch is based
on `frida-sys` 0.17.2 and adds Windows toolchain discovery; its upstream notice
is preserved in `vendor/frida-sys/COPYING`.

RustCrypto supplies AES-GCM, PBKDF2 and SHA-256. The remaining dependencies provide
CLI, asynchronous I/O, TLS, parsing, compression and operating-system integration.

`python scripts/package.py` writes a dependency inventory to
`licenses/cargo-packages.json` inside each release archive and copies the available
LICENSE, COPYING and NOTICE files from resolved Cargo packages. It also includes
the Frida notices from this repository. Build tools such as LLVM, Rust, Node and
Python are not distributed in the executable.
