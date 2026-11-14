pub mod adb;
pub mod agent;
pub mod cli;
pub mod export;
pub mod frida;
pub mod import_url;
pub mod model;
pub mod output;
pub mod prefs;
pub mod server;
pub mod ui;

// Matches FRIDA_VERSION in the locked frida-sys 0.17.2 devkit.
pub const FRIDA_VERSION: &str = "17.23.3";
