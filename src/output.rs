use anyhow::{Context, Result, ensure};
use std::{io::Write, path::Path};

pub fn preflight(path: Option<&Path>) -> Result<()> {
    if let Some(p) = path {
        ensure!(!p.exists(), "Файл уже существует: {}", p.display());
        ensure!(
            parent(p).is_dir(),
            "Каталог не существует: {}",
            parent(p).display()
        );
    }
    Ok(())
}

fn parent(p: &Path) -> &Path {
    p.parent()
        .filter(|p| !p.as_os_str().is_empty())
        .unwrap_or(Path::new("."))
}

pub fn write(uri: &str, path: Option<&Path>, stdout: bool) -> Result<()> {
    if let Some(p) = path {
        let mut tmp = tempfile::NamedTempFile::new_in(parent(p))
            .context("Не удалось создать файл результата")?;
        writeln!(tmp, "{uri}")?;
        tmp.as_file().sync_all()?;
        tmp.persist_noclobber(p)
            .map_err(|e| anyhow::anyhow!("Не удалось сохранить {}: {}", p.display(), e.error))?;
    }
    if stdout || path.is_none() {
        let mut out = std::io::stdout().lock();
        writeln!(out, "{uri}")
            .and_then(|_| out.flush())
            .with_context(|| match path {
                Some(p) => format!(
                    "Не удалось вывести ссылку; файл уже сохранён: {}",
                    p.display()
                ),
                None => "Не удалось вывести ссылку в stdout".into(),
            })?;
    }
    Ok(())
}
