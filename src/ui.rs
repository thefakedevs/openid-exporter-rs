use anyhow::{Context, Result};
use console::{Term, style};
use dialoguer::{Select, theme::ColorfulTheme};
use indicatif::{ProgressBar, ProgressDrawTarget, ProgressStyle};
use std::{
    sync::Arc,
    time::{Duration, Instant},
};

#[derive(Clone)]
pub struct Ui {
    pub verbose: bool,
    start: Instant,
    bar: Arc<ProgressBar>,
    fancy: bool,
    terminal_mode: Arc<Option<TerminalMode>>,
}

impl Ui {
    pub fn new(verbose: bool) -> Self {
        if std::env::var_os("NO_COLOR").is_some() || std::env::var("TERM").as_deref() == Ok("dumb")
        {
            console::set_colors_enabled_stderr(false);
        }
        let fancy = Term::stderr().is_term() && std::env::var("TERM").as_deref() != Ok("dumb");
        let bar = ProgressBar::with_draw_target(
            None,
            if fancy && !verbose {
                ProgressDrawTarget::stderr()
            } else {
                ProgressDrawTarget::hidden()
            },
        );
        bar.set_style(ProgressStyle::with_template("{spinner:.cyan} {msg}").unwrap());
        Self {
            verbose,
            start: Instant::now(),
            bar: Arc::new(bar),
            fancy,
            terminal_mode: Arc::new(TerminalMode::capture()),
        }
    }

    pub fn title(&self) {
        eprintln!("{}\n", style("ID Pocket Exporter").for_stderr().bold());
    }

    pub fn stage(&self, msg: &str) {
        if self.fancy && !self.verbose {
            self.bar.reset();
            self.bar
                .set_style(ProgressStyle::with_template("{spinner:.cyan} {msg}").unwrap());
            self.bar.set_message(msg.to_owned());
            self.bar.enable_steady_tick(Duration::from_millis(90));
        } else {
            eprintln!("> {msg}");
        }
    }

    pub fn pause(&self) {
        self.bar.disable_steady_tick();
        self.bar.finish_and_clear();
    }

    pub fn restore_terminal(&self) {
        if let Some(mode) = self.terminal_mode.as_ref() {
            mode.restore();
        }
    }

    pub fn download(&self, total: Option<u64>) {
        if self.fancy
            && !self.verbose
            && let Some(total) = total
        {
            self.bar.reset();
            self.bar.set_length(total);
            self.bar.set_style(
                ProgressStyle::with_template(
                    "{spinner:.cyan} Загрузка Frida {bar:24.cyan/blue} {bytes}/{total_bytes}",
                )
                .unwrap(),
            );
            self.bar.enable_steady_tick(Duration::from_millis(90));
        }
    }

    pub fn downloaded(&self, n: u64) {
        self.bar.set_position(n);
    }

    pub fn ok(&self, msg: &str) {
        self.pause();
        eprintln!(
            "{} {msg}",
            style(if self.fancy { "✓" } else { "OK" })
                .for_stderr()
                .green()
        );
    }

    pub fn warn(&self, msg: &str) {
        self.pause();
        eprintln!(
            "{} {msg}",
            style(if self.fancy { "→" } else { "!" })
                .for_stderr()
                .yellow()
        );
    }

    pub fn error(&self, msg: &str) {
        self.pause();
        eprintln!(
            "{} {msg}",
            style(if self.fancy { "✗" } else { "ERROR" })
                .for_stderr()
                .red()
        );
    }

    pub fn debug(&self, stage: &str, msg: impl AsRef<str>) {
        if self.verbose {
            eprintln!(
                "{:08.3} DEBUG {stage} {}",
                self.start.elapsed().as_secs_f64(),
                msg.as_ref()
            );
        }
    }

    pub fn choose(&self, prompt: &str, choices: &[String]) -> Result<usize> {
        self.pause();
        self.interactive()?;
        let terminal = self.prompt_terminal()?;
        if let Some(terminal) = terminal {
            Ok(Select::with_theme(&ColorfulTheme::default())
                .with_prompt(prompt)
                .items(choices)
                .default(0)
                .interact_on(&terminal)?)
        } else {
            loop {
                let text = choices
                    .iter()
                    .enumerate()
                    .map(|(i, s)| format!("{}. {s}", i + 1))
                    .collect::<Vec<_>>()
                    .join("\n");
                let s =
                    rpassword::prompt_password(format!("{prompt}\n{text}\nВведите номер [1]: "))?;
                let n = if s.is_empty() {
                    Some(1)
                } else {
                    s.parse::<usize>().ok()
                };
                if let Some(n) = n.filter(|n| *n >= 1 && *n <= choices.len()) {
                    return Ok(n - 1);
                }
            }
        }
    }

    fn prompt_terminal(&self) -> Result<Option<Term>> {
        if Term::stderr().is_term() {
            return Ok(Some(Term::stderr()));
        }

        #[cfg(unix)]
        {
            let file = std::fs::OpenOptions::new()
                .read(true)
                .write(true)
                .open("/dev/tty")
                .context(concat!(
                    "Нужен интерактивный терминал для ввода пароля. ",
                    "Откройте терминал и запустите экспортёр."
                ))?;
            Ok(Some(Term::read_write_pair(file.try_clone()?, file)))
        }

        #[cfg(windows)]
        {
            std::fs::OpenOptions::new()
                .read(true)
                .open("CONIN$")
                .context(concat!(
                    "Нужен интерактивный терминал для ввода пароля. ",
                    "Откройте терминал и запустите экспортёр."
                ))?;
            std::fs::OpenOptions::new()
                .write(true)
                .open("CONOUT$")
                .context("Нет управляющего терминала")?;
            Ok(None)
        }
    }

    pub fn interactive(&self) -> Result<()> {
        self.prompt_terminal().map(|_| ())
    }

    pub fn password(&self) -> Result<String> {
        self.pause();
        self.interactive()?;
        loop {
            let p = self.hidden_input("Пароль ссылки (12–256 ASCII символов; не PIN DID): ")?;
            if p != self.hidden_input("Повторите пароль: ")? {
                self.warn("Пароли не совпадают");
                continue;
            }
            if crate::import_url::validate_password(&p).is_ok() {
                return Ok(p);
            }
            self.warn("Используйте 12–256 печатных ASCII символов.");
        }
    }

    fn hidden_input(&self, prompt: &str) -> Result<String> {
        if Term::stderr().is_term() {
            use std::io::Write;
            eprint!("{}", style(prompt).for_stderr().cyan());
            std::io::stderr().flush()?;
            Ok(rpassword::read_password()?)
        } else {
            Ok(rpassword::prompt_password(prompt)?)
        }
    }

    pub fn enter(&self, msg: &str) -> Result<()> {
        self.pause();
        self.interactive()?;
        if let Some(terminal) = self.prompt_terminal()? {
            self.warn(msg);
            if !Term::stderr().is_term() {
                terminal.write_line(msg)?;
            }
            terminal.read_line()?;
        } else {
            rpassword::prompt_password(format!("{msg}\n"))?;
        }
        Ok(())
    }
}

// A cancelled blocking prompt can outlive the async export. Restore the original
// terminal mode explicitly before main exits, including after Ctrl+C on Unix.
struct TerminalMode {
    file: std::fs::File,
    #[cfg(unix)]
    mode: libc::termios,
    #[cfg(windows)]
    mode: u32,
}

impl TerminalMode {
    fn capture() -> Option<Self> {
        #[cfg(unix)]
        {
            use std::os::fd::AsRawFd;
            let file = std::fs::OpenOptions::new()
                .read(true)
                .write(true)
                .open("/dev/tty")
                .ok()?;
            let mut mode = std::mem::MaybeUninit::uninit();
            if unsafe { libc::tcgetattr(file.as_raw_fd(), mode.as_mut_ptr()) } != 0 {
                return None;
            }
            Some(Self {
                file,
                mode: unsafe { mode.assume_init() },
            })
        }

        #[cfg(windows)]
        {
            use std::os::windows::io::AsRawHandle;
            let file = std::fs::OpenOptions::new()
                .read(true)
                .write(true)
                .open("CONIN$")
                .ok()?;
            let mut mode = 0;
            if unsafe {
                windows_sys::Win32::System::Console::GetConsoleMode(file.as_raw_handle(), &mut mode)
            } == 0
            {
                return None;
            }
            Some(Self { file, mode })
        }
    }

    fn restore(&self) {
        #[cfg(unix)]
        {
            use std::os::fd::AsRawFd;
            unsafe {
                libc::tcsetattr(self.file.as_raw_fd(), libc::TCSANOW, &self.mode);
            }
        }

        #[cfg(windows)]
        {
            use std::os::windows::io::AsRawHandle;
            unsafe {
                windows_sys::Win32::System::Console::SetConsoleMode(
                    self.file.as_raw_handle(),
                    self.mode,
                );
            }
        }
    }
}
