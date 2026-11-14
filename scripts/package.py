"""Create a fresh release ZIP with dependency notices and SHA-256 checksums."""

import hashlib
import json
import pathlib
import platform as host
import shutil
import subprocess
import sys
import tempfile
import tomllib
import zipfile


def main() -> None:
    root = pathlib.Path(__file__).resolve().parents[1]
    platform = {"win32": "windows", "darwin": "macos"}.get(sys.platform, "linux")
    machine = host.machine().lower()
    if machine not in ("amd64", "x86_64", "arm64", "aarch64"):
        raise SystemExit(f"Unsupported architecture: {machine}")
    arch = "aarch64" if machine in ("arm64", "aarch64") else "x86_64"
    suffix = ".exe" if sys.platform == "win32" else ""
    exe = root / "target/release" / ("idpocket-exporter" + suffix)
    documents = ("README.md", "LICENSE", "THIRD_PARTY.md", "BUILD_STATUS.json")
    for path in (exe, *(root / name for name in documents)):
        if not path.is_file():
            raise SystemExit(f"Required release file is missing: {path.name}")

    metadata = json.loads(
        subprocess.check_output(["cargo", "metadata", "--locked", "--format-version=1"], cwd=root)
    )
    version = tomllib.loads((root / "Cargo.toml").read_text(encoding="utf-8"))["package"]["version"]
    name = f"idpocket-exporter-{version}-{platform}-{arch}"
    out = root / "dist"
    out.mkdir(exist_ok=True)
    archive = out / f"{name}.zip"

    # Start with an empty directory so stale dist files cannot enter a new release.
    with tempfile.TemporaryDirectory(prefix="package-", dir=root / "target") as temporary:
        staging = pathlib.Path(temporary)
        package = staging / name
        package.mkdir()
        shutil.copy2(exe, package / exe.name)
        for document in documents:
            shutil.copy2(root / document, package / document)

        licenses = package / "licenses"
        licenses.mkdir()
        inventory = []
        for dependency in metadata["packages"]:
            inventory.append(
                {k: dependency.get(k) for k in ("name", "version", "license", "repository")}
            )
            directory = pathlib.Path(dependency["manifest_path"]).parent
            destination = licenses / (dependency["name"] + "-" + dependency["version"])
            for file in directory.iterdir():
                if file.is_file() and file.name.upper().startswith(
                    ("LICENSE", "COPYING", "NOTICE")
                ):
                    destination.mkdir(exist_ok=True)
                    shutil.copy2(file, destination / file.name)
        (licenses / "cargo-packages.json").write_text(
            json.dumps(inventory, indent=2) + "\n", encoding="utf-8"
        )
        for file in (root / "licenses").iterdir():
            if file.is_file():
                shutil.copy2(file, licenses / file.name)

        sums = []
        for file in sorted(package.rglob("*")):
            if file.is_file():
                sums.append(
                    hashlib.sha256(file.read_bytes()).hexdigest()
                    + "  "
                    + file.relative_to(package).as_posix()
                )
        (package / "SHA256SUMS.txt").write_text("\n".join(sums) + "\n", encoding="utf-8")
        temporary_zip = staging / archive.name
        with zipfile.ZipFile(
            temporary_zip, "w", zipfile.ZIP_DEFLATED, strict_timestamps=False
        ) as bundle:
            for file in sorted(package.rglob("*")):
                if file.is_file():
                    bundle.write(file, file.relative_to(staging))
        temporary_zip.replace(archive)

    archive.with_suffix(".zip.sha256").write_text(
        hashlib.sha256(archive.read_bytes()).hexdigest() + "  " + archive.name + "\n",
        encoding="ascii",
    )
    print(archive)


if __name__ == "__main__":
    main()
