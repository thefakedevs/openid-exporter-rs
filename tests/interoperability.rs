use clap::Parser;
use idpocket_exporter::{
    cli::Cli,
    import_url,
    model::{self, Material, Session},
    output, prefs,
};
use serde_json::{Value, json};

#[test]
fn python_vector_and_rust_roundtrip() {
    let fixture: Value = serde_json::from_str(include_str!("fixtures/python-v1.json")).unwrap();
    let account = fixture["account"].clone();
    let p = fixture["password"].as_str().unwrap();
    assert_eq!(
        import_url::decode(fixture["uri"].as_str().unwrap(), p).unwrap(),
        json!({ "schema": 1, "account": account })
    );
    let uri = import_url::encode_fixed(&account, p, [0x11; 16], [0x22; 12]).unwrap();
    assert_eq!(
        import_url::decode(&uri, p).unwrap(),
        json!({ "schema": 1, "account": account })
    );
    assert!(import_url::decode(&uri, "wrong-password-123").is_err());
    let mut damaged = uri.clone().into_bytes();
    let n = damaged.len();
    damaged[n - 5] = if damaged[n - 5] == b'A' { b'B' } else { b'A' };
    assert!(import_url::decode(std::str::from_utf8(&damaged).unwrap(), p).is_err());
}

fn record(key: &str, tag: u8, value: &[u8]) -> Vec<u8> {
    let mut r = (key.len() as u16).to_be_bytes().to_vec();
    r.extend(key.as_bytes());
    r.push(tag);
    r.extend(value);
    r
}

fn utf(s: &str) -> Vec<u8> {
    let s = cesu8::to_java_cesu8(s);
    let mut v = (s.len() as u16).to_be_bytes().to_vec();
    v.extend(s.as_ref());
    v
}

#[test]
fn binary_preferences_mutf8_conflicts_and_bounds() {
    let mut bytes = record("auth.token", 3, &utf("synthetic-token-😀"));
    bytes.extend(record("device.id", 3, &utf("synthetic-device")));
    bytes.extend(record("digitalid-botid", 2, &42i64.to_be_bytes()));
    let records = prefs::binary(&bytes);
    let s = prefs::session(&records).unwrap();
    assert_eq!(s.access_token, "synthetic-token-😀");
    assert_eq!(s.bot_id, Some(42));
    for len in 0..bytes.len() {
        let _ = prefs::binary(&bytes[..len]);
    }
    bytes.extend(record("auth.token", 3, &utf("different-token")));
    assert!(prefs::session(&prefs::binary(&bytes)).is_err());
    assert!(prefs::binary(&record("auth.token", 16, &utf("must-not-guess"))).is_empty());
    assert!(prefs::binary(&record("auth.token", 3, &utf("nul\0inside"))).is_empty());
}

#[test]
fn xml_values_and_entities() {
    let xml = concat!(
        "<map>",
        r#"<string name="auth.token">synthetic&amp;token</string>"#,
        r#"<string name="device.id">synthetic-device</string>"#,
        r#"<long name="digitalid-botid" value="42"/>"#,
        "</map>"
    );
    let records = prefs::xml(xml.as_bytes()).unwrap();
    let s = prefs::session(&records).unwrap();
    assert_eq!(s.access_token, "synthetic&token");
    assert_eq!(s.bot_id, Some(42));
    assert!(prefs::xml(b"<!DOCTYPE map [<!ENTITY x 'bad'>]><map/>").is_err());
    assert!(prefs::xml(b"<map><string").is_err());
}

fn material(ts: Value) -> Material {
    serde_json::from_value(json!({
        "schema": "did-local-material-v1",
        "origin": "https://digital-id.max.ru",
        "userId": 42,
        "userAgent": "Mozilla/5.0 (Android 14)",
        "biometry": { "deviceId": "did-device" },
        "pinSalt": "synthetic-salt",
        "creationTimestamp": ts,
        "biometricToken": null,
        "photo": "must-disappear",
    }))
    .unwrap()
}

#[test]
fn timestamp_type_whitelist_and_legacy_biometry() {
    let s = Session {
        access_token: "synthetic-token".into(),
        device_id: "synthetic-device".into(),
        bot_id: None,
    };
    let meta = json!({
        "appVersion": "26.28.0",
        "osVersion": "15",
        "deviceName": "Pixel",
        "arch": "arm64-v8a",
        "buildNumber": 123,
    });
    for ts in [json!(12345), json!("12345"), json!(12345.5)] {
        let m = material(ts.clone());
        let a = model::build_account(&s, &m, &meta, false).unwrap();
        assert_eq!(a["did"]["creationTimestamp"], ts);
        assert!(a.get("photo").is_none());
        assert!(a["max"].get("botId").is_none());
        assert_eq!(a["max"]["userAgent"]["osVersion"], "15");
    }
    let mut m = material(json!(12345));
    m.pin_salt = None;
    m.biometric_token = Some("synthetic-biometric-token".into());
    assert!(m.validate(false).is_err());
    assert!(m.validate(true).is_ok());
    m.origin = "https://wrong.invalid".into();
    assert!(m.validate(true).is_err());
}

#[test]
fn output_no_clobber_and_failed_file_does_not_publish() {
    let dir = tempfile::tempdir().unwrap();
    let p = dir.path().join("ссылка с пробелом.txt");
    output::write("didpocket://synthetic", Some(&p), false).unwrap();
    assert_eq!(
        std::fs::read_to_string(&p).unwrap(),
        "didpocket://synthetic\n"
    );
    assert!(output::write("other", Some(&p), false).is_err());
    assert_eq!(
        std::fs::read_to_string(p).unwrap(),
        "didpocket://synthetic\n"
    );
}

#[test]
fn cli_modes() {
    assert!(!Cli::try_parse_from(["app"]).unwrap().verbose);
    assert!(Cli::try_parse_from(["app", "-v"]).unwrap().verbose);
    assert!(Cli::try_parse_from(["app", "--verbose"]).unwrap().verbose);
    assert!(Cli::try_parse_from(["app", "--doctor", "-o", "out"]).is_err());
    assert!(Cli::try_parse_from(["app", "--stop", "--doctor"]).is_err());
    assert!(Cli::try_parse_from(["app", "-o", "out", "--stdout"]).is_ok());
    assert!(Cli::try_parse_from(["app", "-vv"]).is_err());
}
