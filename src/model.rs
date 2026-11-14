use anyhow::{Result, ensure};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};

#[derive(Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Material {
    pub schema: String,
    pub origin: String,
    pub user_id: u64,
    pub user_agent: String,
    pub biometry: Biometry,
    pub pin_salt: Option<String>,
    pub creation_timestamp: Value,
    pub biometric_token: Option<String>,
}

#[derive(Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Biometry {
    pub device_id: String,
}

#[derive(Default)]
pub struct Session {
    pub access_token: String,
    pub device_id: String,
    pub bot_id: Option<u64>,
}

fn string(s: &str, lo: usize, hi: usize) -> bool {
    (lo..=hi).contains(&s.chars().count()) && !s.chars().any(char::is_control)
}

impl Material {
    pub fn validate(&self, bio: bool) -> Result<()> {
        ensure!(
            self.schema == "did-local-material-v1" && self.origin == "https://digital-id.max.ru",
            "Неверный origin/schema Digital ID"
        );
        ensure!(
            (1..=9_007_199_254_740_991).contains(&self.user_id),
            "Не получен accountId Digital ID"
        );
        ensure!(
            string(&self.biometry.device_id, 1, 256),
            "Не получен biometric deviceId"
        );
        ensure!(
            string(&self.user_agent, 8, 1024)
                && self.user_agent.bytes().all(|b| (32..=126).contains(&b)),
            "Некорректный User-Agent WebView"
        );
        ensure!(
            self.pin_salt.as_ref().is_none_or(|s| string(s, 1, 1024)),
            "Неподдерживаемый формат PIN-соли"
        );
        ensure!(
            self.biometric_token
                .as_ref()
                .is_none_or(|s| bio && string(s, 8, 32768)),
            "Неожиданный biometricToken"
        );
        ensure!(
            self.pin_salt.is_some() || self.biometric_token.is_some(),
            "Нет PIN-соли. Разблокируйте DID; для старого профиля используйте --with-biometry."
        );
        ensure!(
            self.creation_timestamp
                .as_f64()
                .is_some_and(|n| n > 0.0 && n <= 9_007_199_254_740_991.0)
                || self
                    .creation_timestamp
                    .as_str()
                    .is_some_and(|s| string(s, 1, 128)),
            "Не получен creationTimestamp"
        );
        Ok(())
    }
}

pub fn build_account(s: &Session, m: &Material, metadata: &Value, bio: bool) -> Result<Value> {
    m.validate(bio)?;
    ensure!(
        string(&s.access_token, 8, 32768),
        "Некорректный auth.token MAX"
    );
    ensure!(
        string(&s.device_id, 8, 256) && !s.device_id.chars().any(char::is_whitespace),
        "Некорректный device.id MAX"
    );
    let version = metadata["appVersion"].as_str().unwrap_or("");
    ensure!(
        regex::Regex::new(r"^\d+(?:\.\d+){1,3}$")?.is_match(version),
        "Не определена версия MAX"
    );
    let mut ua = json!({
        "deviceType": "ANDROID",
        "osVersion": "14",
        "deviceName": "Android",
        "arch": "arm64-v8a",
        "headerUserAgent": m.user_agent,
        "locale": "ru",
        "deviceLocale": "ru",
        "screen": "1080x2400 3.0x",
        "timezone": "Europe/Moscow",
        "appVersion": version,
    });
    for key in [
        "osVersion",
        "deviceName",
        "arch",
        "timezone",
        "appVersion",
        "buildNumber",
    ] {
        if let Some(v) = metadata.get(key) {
            ua[key] = v.clone();
        }
    }
    let mut account = json!({
        "schema": 1,
        "accountId": m.user_id,
        "imported": true,
        "max": {
            "accessToken": s.access_token,
            "deviceId": s.device_id,
            "userAgent": ua,
        },
        "did": {
            "pinSalt": m.pin_salt,
            "creationTimestamp": m.creation_timestamp,
            "biometricDeviceId": m.biometry.device_id,
            "biometricToken": m.biometric_token,
        },
        "webUserAgent": m.user_agent,
        "options": {
            "tcpVersion": 10,
            "fingerprint": false,
            "loginUserAgent": false,
            "appVersion": version,
            "esiaVersion": 3,
        },
    });
    if let Some(bot) = s.bot_id {
        ensure!(bot > 0, "Некорректный botId");
        account["max"]["botId"] = json!(bot);
    }
    Ok(account)
}
