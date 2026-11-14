pub fn source() -> String {
    include_str!("../agent/dist/agent.bundle.js").to_owned()
}

pub fn configuration(biometry: bool, key: &str) -> anyhow::Result<serde_json::Value> {
    let snapshot = include_str!("../agent/src/page-snapshot.js")
        .replace("__SNAPSHOT_KEY__", &serde_json::to_string(key)?)
        .replace("__WITH_BIOMETRY__", if biometry { "true" } else { "false" });
    Ok(serde_json::json!({
        "type": "config",
        "config": {
            "pageSource": snapshot,
            "key": key,
            "captureMs": if biometry { 130000 } else { 55000 },
        },
    }))
}
