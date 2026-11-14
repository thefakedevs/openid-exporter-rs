use crate::model::Session;
use anyhow::{Result, bail};
use quick_xml::{Reader, events::Event};
use serde_json::Value;

const KEYS: [(&str, &str); 3] = [
    ("auth.token", "accessToken"),
    ("device.id", "deviceId"),
    ("digitalid-botid", "botId"),
];
pub fn binary(raw: &[u8]) -> Vec<(&'static str, Value)> {
    let mut records = Vec::new();
    for (key, field) in KEYS {
        let mut prefix = (key.len() as u16).to_be_bytes().to_vec();
        prefix.extend(key.as_bytes());
        for pos in 0..raw.len().saturating_sub(prefix.len()) {
            if !raw[pos..].starts_with(&prefix) {
                continue;
            }
            let p = pos + prefix.len();
            let tag = raw[p];
            let p = p + 1;
            let value = match tag {
                3 => {
                    let Some(len) = raw.get(p..p + 2) else {
                        continue;
                    };
                    let len = u16::from_be_bytes(len.try_into().unwrap()) as usize;
                    let Some(bytes) = raw.get(p + 2..p + 2 + len) else {
                        continue;
                    };
                    let Ok(s) = cesu8::from_java_cesu8(bytes) else {
                        continue;
                    };
                    if s.is_empty() || s.contains('\0') {
                        continue;
                    }
                    Value::String(s.into_owned())
                }
                0 if field == "botId" => {
                    let Some(b) = raw.get(p..p + 4) else {
                        continue;
                    };
                    Value::from(i32::from_be_bytes(b.try_into().unwrap()))
                }
                2 if field == "botId" => {
                    let Some(b) = raw.get(p..p + 8) else {
                        continue;
                    };
                    Value::from(i64::from_be_bytes(b.try_into().unwrap()))
                }
                _ => continue,
            };
            if field == "botId" {
                if let Some(n) = value
                    .as_u64()
                    .or_else(|| value.as_str()?.parse().ok())
                    .filter(|n| *n > 0)
                {
                    records.push((field, Value::from(n)));
                }
            } else {
                records.push((field, value));
            }
        }
    }
    records
}

pub fn xml(raw: &[u8]) -> Result<Vec<(&'static str, Value)>> {
    let mut r = Reader::from_reader(raw);
    r.config_mut().trim_text(false);
    let mut records = Vec::new();
    let mut depth: usize = 0;
    let mut field = None;
    let mut text = String::new();
    loop {
        match r.read_event()? {
            Event::DocType(_) => bail!("DTD в preferences не поддерживается"),
            Event::Start(e) => {
                depth += 1;
                if depth == 1 && e.name().as_ref() != b"map" {
                    return Ok(Vec::new());
                }
                if depth == 2 {
                    text.clear();
                    field = None;
                    for a in e.attributes() {
                        let a = a?;
                        if a.key.as_ref() == b"name" {
                            let name = a.decode_and_unescape_value(r.decoder())?;
                            field = KEYS.iter().find(|(k, _)| *k == name).map(|(_, f)| *f);
                        }
                    }
                    if e.name().as_ref() != b"string" {
                        field = None;
                    }
                }
            }
            Event::Empty(e) if depth == 1 => {
                if e.name().as_ref() != b"int" && e.name().as_ref() != b"long" {
                    continue;
                }
                let mut name = String::new();
                let mut val = String::new();
                for a in e.attributes() {
                    let a = a?;
                    let v = a.decode_and_unescape_value(r.decoder())?.into_owned();
                    match a.key.as_ref() {
                        b"name" => name = v,
                        b"value" => val = v,
                        _ => {}
                    }
                }
                if name == "digitalid-botid"
                    && let Ok(n) = val.parse::<u64>()
                    && n > 0
                {
                    records.push(("botId", Value::from(n)));
                }
            }
            Event::Text(e) if depth == 2 => text.push_str(&e.decode()?),
            Event::CData(e) if depth == 2 => text.push_str(&e.decode()?),
            Event::GeneralRef(e) if depth == 2 => {
                let name = e.decode()?;
                if let Some(c) = e.resolve_char_ref()? {
                    text.push(c);
                } else {
                    match name.as_ref() {
                        "amp" => text.push('&'),
                        "lt" => text.push('<'),
                        "gt" => text.push('>'),
                        "quot" => text.push('"'),
                        "apos" => text.push('\''),
                        _ => bail!("Неизвестная XML entity"),
                    }
                }
            }
            Event::End(_) => {
                if depth == 2
                    && let Some(f) = field.take()
                    && !text.is_empty()
                {
                    if f == "botId" {
                        if let Ok(n) = text.parse::<u64>()
                            && n > 0
                        {
                            records.push((f, Value::from(n)));
                        }
                    } else {
                        records.push((f, Value::String(text.clone())));
                    }
                }
                depth = depth.saturating_sub(1);
            }
            Event::Eof => break,
            _ => {}
        }
    }
    Ok(records)
}

pub fn session(records: &[(&str, Value)]) -> Result<Session> {
    fn unique(records: &[(&str, Value)], field: &str) -> Result<Option<Value>> {
        let mut vals = Vec::new();
        for (f, v) in records {
            if *f == field && !vals.contains(v) {
                vals.push(v.clone());
            }
        }
        if vals.len() > 1 {
            bail!("Несколько различных {field} в preferences; аккаунт не выбран однозначно");
        }
        Ok(vals.pop())
    }
    Ok(Session {
        access_token: unique(records, "accessToken")?
            .and_then(|v| v.as_str().map(str::to_owned))
            .ok_or_else(|| {
                anyhow::anyhow!(
                    "Не найден auth.token: профиль или формат preferences не поддерживается"
                )
            })?,
        device_id: unique(records, "deviceId")?
            .and_then(|v| v.as_str().map(str::to_owned))
            .ok_or_else(|| anyhow::anyhow!("Не найден device.id MAX"))?,
        bot_id: unique(records, "botId")?.and_then(|v| v.as_u64()),
    })
}
