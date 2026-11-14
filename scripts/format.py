"""Format the project's source files, or verify them with --check."""

import argparse
import pathlib
import subprocess
import sys


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check without changing files")
    args = parser.parse_args()
    root = pathlib.Path(__file__).resolve().parents[1]

    commands = [
        ["cargo", "fmt", "--all", *(["--", "--check"] if args.check else [])],
        [
            "rustfmt",
            "--edition",
            "2024",
            *(["--check"] if args.check else []),
            "tests/fixtures/mock_adb.rs",
        ],
        [
            "rustfmt",
            "--edition",
            "2021",
            *(["--check"] if args.check else []),
            "vendor/frida-sys/build.rs",
            "vendor/frida-sys/windows.rs",
            "vendor/frida-sys/src/lib.rs",
        ],
        [
            sys.executable,
            "-m",
            "ruff",
            "check",
            *([] if args.check else ["--fix"]),
            "scripts",
            "tests",
        ],
        [
            sys.executable,
            "-m",
            "ruff",
            "format",
            *(["--check"] if args.check else []),
            "scripts",
            "tests",
        ],
        [
            "node",
            "agent/node_modules/prettier/bin/prettier.cjs",
            "--plugin",
            "./agent/node_modules/prettier-plugin-toml/lib/index.js",
            "--check" if args.check else "--write",
            "--ignore-path",
            ".prettierignore",
            "**/*.{js,cjs,ts,json,yml,yaml,toml,md}",
        ],
    ]

    for command in commands:
        subprocess.run(command, cwd=root, check=True)


if __name__ == "__main__":
    main()
