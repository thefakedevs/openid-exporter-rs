use aes_gcm::{
    Aes256Gcm, KeyInit, Nonce,
    aead::{Aead, Payload},
};
use anyhow::{Context, Result, bail, ensure};
use base64::{Engine, engine::general_purpose::URL_SAFE_NO_PAD as B64};
use serde_json::{Value, json};
use sha2::Sha256;

pub const PREFIX: &str = "didpocket://import/v1#";
const AAD: &[u8] = b"didpocket-import-v1";
const ITERATIONS: u32 = 310_000;

pub fn validate_password(p: &str) -> Result<()> {
    ensure!(
        (12..=256).contains(&p.len()) && p.bytes().all(|c| (32..=126).contains(&c)),
        "Пароль: 12–256 печатных ASCII символов"
    );
    Ok(())
}

fn cipher(p: &str, salt: &[u8]) -> Aes256Gcm {
    let mut key = [0u8; 32];
    pbkdf2::pbkdf2_hmac::<Sha256>(p.as_bytes(), salt, ITERATIONS, &mut key);
    Aes256Gcm::new_from_slice(&key).unwrap()
}

pub fn encode_fixed(account: &Value, p: &str, salt: [u8; 16], iv: [u8; 12]) -> Result<String> {
    validate_password(p)?;
    let plain = serde_json::to_vec(&json!({ "schema": 1, "account": account }))?;
    let ct = cipher(p, &salt)
        .encrypt(
            Nonce::from_slice(&iv),
            Payload {
                msg: &plain,
                aad: AAD,
            },
        )
        .map_err(|_| anyhow::anyhow!("Ошибка AES-GCM"))?;
    let envelope = json!({
        "v": 1,
        "kdf": "PBKDF2-HMAC-SHA256",
        "iterations": ITERATIONS,
        "salt": B64.encode(salt),
        "iv": B64.encode(iv),
        "ciphertext": B64.encode(ct),
    });
    let encoded = B64.encode(serde_json::to_vec(&envelope)?);
    Ok(format!("{PREFIX}{encoded}"))
}

pub fn encode(account: &Value, p: &str) -> Result<String> {
    let mut salt = [0; 16];
    let mut iv = [0; 12];
    getrandom::getrandom(&mut salt).map_err(|e| anyhow::anyhow!("random: {e}"))?;
    getrandom::getrandom(&mut iv).map_err(|e| anyhow::anyhow!("random: {e}"))?;
    let uri = encode_fixed(account, p, salt, iv)?;
    ensure!(
        decode(&uri, p)? == json!({ "schema": 1, "account": account }),
        "Контрольная расшифровка не совпала"
    );
    Ok(uri)
}

pub fn decode(uri: &str, p: &str) -> Result<Value> {
    validate_password(p)?;
    ensure!(uri.len() <= 2 * 1024 * 1024, "Слишком длинная ссылка");
    let env: Value =
        serde_json::from_slice(&B64.decode(uri.strip_prefix(PREFIX).context("Не import/v1")?)?)?;
    ensure!(
        env["v"] == 1 && env["kdf"] == "PBKDF2-HMAC-SHA256" && env["iterations"] == ITERATIONS,
        "Неподдерживаемый формат шифрования"
    );
    let field = |k: &str| -> Result<Vec<u8>> {
        Ok(B64.decode(env[k].as_str().context("Нет поля envelope")?)?)
    };
    let salt = field("salt")?;
    let iv = field("iv")?;
    let ct = field("ciphertext")?;
    ensure!(
        salt.len() == 16 && iv.len() == 12 && ct.len() >= 16,
        "Некорректные размеры envelope"
    );
    let plain =
        match cipher(p, &salt).decrypt(Nonce::from_slice(&iv), Payload { msg: &ct, aad: AAD }) {
            Ok(v) => v,
            Err(_) => bail!("Неверный пароль или повреждённая ссылка"),
        };
    Ok(serde_json::from_slice(&plain)?)
}
