"""Black-box release tests with a synthetic ADB executable; no Android required."""

import os
import pathlib
import shutil
import subprocess
import sys
import tempfile

root = pathlib.Path(__file__).resolve().parents[1]
suffix = ".exe" if os.name == "nt" else ""
binary = root / "target/release" / ("idpocket-exporter" + suffix)
env = {**os.environ, "NO_COLOR": "1", "TERM": "dumb"}


def run(*args):
    return subprocess.run(
        [str(binary), *map(str, args)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdin=subprocess.DEVNULL,
        timeout=15,
        env=env,
    )


with tempfile.TemporaryDirectory(prefix="idpocket cli ") as folder:
    directory = pathlib.Path(folder)
    mock = directory / ("mock adb" + suffix)
    subprocess.run(
        ["rustc", "--edition=2024", str(root / "tests/fixtures/mock_adb.rs"), "-o", str(mock)],
        check=True,
        env=env,
    )
    version = run("--version")
    assert version.returncode == 0 and b"0.1.0" in version.stdout
    good = run("--doctor", "--adb", mock)
    assert good.returncode == 0 and good.stdout == b"" and b"Mock Phone" in good.stderr
    verbose = run("--doctor", "--adb", mock, "-v")
    assert verbose.returncode == 0 and verbose.stdout == b"" and b"DEBUG" in verbose.stderr
    assert b"synthetic-token" not in verbose.stderr
    missing = run("--adb", directory / ("not installed" + suffix))
    assert missing.returncode == 2 and missing.stdout == b""
    assert b"Platform-Tools" in missing.stderr and b"\x1b" not in missing.stderr
    for mode in ("unauthorized", "offline"):
        executable = directory / (mode + suffix)
        shutil.copy2(mock, executable)
        result = run("--doctor", "--adb", executable)
        assert result.returncode == 2 and result.stdout == b""
    file = directory / "existing.txt"
    file.write_text("keep", encoding="utf-8")
    existing = run("-o", file, "--adb", mock)
    assert existing.returncode == 2 and existing.stdout == b"" and file.read_text() == "keep"
    invalid = run("--doctor", "--stop")
    assert invalid.returncode == 2 and invalid.stdout == b""
print("Release CLI smoke: 8 scenarios OK; no actual Android accessed")
