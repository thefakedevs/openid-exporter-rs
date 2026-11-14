"""Independent Python reader for the Rust vector; developer/CI check only."""

import base64
import hashlib
import json
import pathlib
import subprocess

from cryptography.hazmat.primitives.ciphers.aead import AESGCM

b64 = lambda s: base64.urlsafe_b64decode(s + "=" * (-len(s) % 4))
root = pathlib.Path(__file__).resolve().parents[1]
vector = json.loads((root / "tests/fixtures/python-v1.json").read_text())
# Example is an offline core harness, not a second user-facing executable.
uri = subprocess.check_output(
    ["cargo", "run", "--locked", "--quiet", "--example", "interop"], cwd=root, text=True
).strip()
env = json.loads(b64(uri.split("#", 1)[1]))
key = hashlib.pbkdf2_hmac("sha256", vector["password"].encode(), b64(env["salt"]), 310000, 32)
plain = AESGCM(key).decrypt(b64(env["iv"]), b64(env["ciphertext"]), b"didpocket-import-v1")
assert json.loads(plain) == {"schema": 1, "account": vector["account"]}
print("Rust -> Python import/v1: OK")
