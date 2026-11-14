use clap::Parser;
use std::path::PathBuf;

#[derive(Parser, Debug)]
#[command(version, about = "Перенос Digital ID из MAX в ID Pocket")]
pub struct Cli {
    /// Подробная диагностика в stderr
    #[arg(short, long)]
    pub verbose: bool,

    /// Сохранить ссылку в новый файл
    #[arg(short, long, conflicts_with_all = ["doctor", "stop"])]
    pub output: Option<PathBuf>,

    /// Также вывести ссылку при сохранении в файл
    #[arg(long, conflicts_with_all = ["doctor", "stop"])]
    pub stdout: bool,

    /// Серийный номер устройства ADB
    #[arg(long)]
    pub serial: Option<String>,

    /// Android user/profile MAX
    #[arg(long, value_parser = clap::value_parser!(u32).range(0..=99999))]
    pub android_user: Option<u32>,

    /// Путь к установленному adb
    #[arg(long, default_value = "adb")]
    pub adb: PathBuf,

    /// Разрешить штатный запрос биометрии, если нет PIN-соли
    #[arg(long, conflicts_with_all = ["doctor", "stop"])]
    pub with_biometry: bool,

    /// Локальный frida-server для работы без скачивания
    #[arg(long, conflicts_with_all = ["doctor", "stop"])]
    pub frida_server: Option<PathBuf>,

    /// Проверить окружение и телефон без экспорта
    #[arg(long, conflicts_with = "stop")]
    pub doctor: bool,

    /// Удалить собственный сервер после прерванного запуска
    #[arg(long)]
    pub stop: bool,
}
