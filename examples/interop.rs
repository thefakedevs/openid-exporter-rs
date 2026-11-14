fn main() {
    let f: serde_json::Value =
        serde_json::from_str(include_str!("../tests/fixtures/python-v1.json")).unwrap();
    println!(
        "{}",
        idpocket_exporter::import_url::encode_fixed(
            &f["account"],
            f["password"].as_str().unwrap(),
            [0x11; 16],
            [0x22; 12]
        )
        .unwrap()
    );
}
