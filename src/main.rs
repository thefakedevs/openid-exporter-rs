use clap::Parser;
use idpocket_exporter::{cli::Cli, ui::Ui};

#[tokio::main]
async fn main() {
    let cli = Cli::parse();
    let ui = Ui::new(cli.verbose);
    let outcome = idpocket_exporter::export::run(cli, ui.clone()).await;
    if let Some(e) = outcome.error {
        ui.error(&e.to_string());
        ui.debug("export.failed", format!("{e:#}"));
    }
    ui.pause();
    ui.restore_terminal();
    // A cancelled password prompt may still be blocked in the console reader.
    // Explicit exit happens only after remote/native cleanup has completed.
    std::process::exit(outcome.code);
}
