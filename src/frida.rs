//! Narrow Frida Core adapter. Native objects live on one thread. GLib owns each
//! callback's boxed channel until the signal closure is destroyed.
use anyhow::{Context, Result, bail, ensure};
use frida_sys as sys;
use serde_json::{Value, json};
use std::{
    ffi::{CStr, CString, c_void},
    ptr,
    sync::{
        Arc, Mutex, Once,
        atomic::{AtomicBool, Ordering},
        mpsc,
    },
    thread,
    time::Duration,
};
use tokio::sync::mpsc::{UnboundedReceiver, UnboundedSender, unbounded_channel};

type NativeResult = Result<()>;

enum Command {
    Post(String),
    Close(mpsc::Sender<NativeResult>),
}

#[derive(Default)]
struct Cancellation {
    current: Mutex<Option<usize>>,
    requested: AtomicBool,
}

impl Cancellation {
    fn cancel(&self) {
        self.requested.store(true, Ordering::SeqCst);
        let lock = self.current.lock().unwrap();
        if let Some(p) = *lock {
            unsafe { sys::g_cancellable_cancel(p as *mut sys::GCancellable) }
        }
    }
}

// No raw handle crosses into Rust async orchestration. The cancellable is shared
// only under the lock; GLib documents cancel as thread-safe.
pub struct Frida {
    commands: mpsc::Sender<Command>,
    pub events: UnboundedReceiver<Value>,
    cancel: Arc<Cancellation>,
    thread: Option<thread::JoinHandle<NativeResult>>,
}

struct Object(*mut c_void);

impl Drop for Object {
    fn drop(&mut self) {
        if !self.0.is_null() {
            unsafe { sys::frida_unref(self.0) }
        }
    }
}

fn check(error: *mut sys::GError) -> Result<()> {
    if error.is_null() {
        return Ok(());
    }
    unsafe {
        let message = CStr::from_ptr((*error).message)
            .to_string_lossy()
            .into_owned();
        sys::g_error_free(error);
        bail!("Frida: {message}");
    }
}

fn bounded<T>(
    cancel: &Arc<Cancellation>,
    seconds: u64,
    op: impl FnOnce(*mut sys::GCancellable, *mut *mut sys::GError) -> T,
) -> Result<T> {
    let p = unsafe { sys::g_cancellable_new() };
    let object = Object(p.cast());
    {
        let mut lock = cancel.current.lock().unwrap();
        *lock = Some(p as usize);
        if cancel.requested.load(Ordering::SeqCst) {
            unsafe {
                sys::g_cancellable_cancel(p);
            }
        }
    }
    let (tx, rx) = mpsc::channel();
    let cancellation = cancel.clone();
    let watchdog = thread::spawn(move || {
        if rx.recv_timeout(Duration::from_secs(seconds)).is_err() {
            cancellation.cancel();
        }
    });
    let mut error = ptr::null_mut();
    let result = op(p, &mut error);
    let _ = tx.send(());
    let _ = watchdog.join();
    {
        let mut lock = cancel.current.lock().unwrap();
        *lock = None;
    }
    drop(object);
    check(error)?;
    Ok(result)
}
unsafe extern "C" fn message(
    _script: *mut sys::FridaScript,
    msg: *const std::ffi::c_char,
    _data: *mut sys::GBytes,
    context: *mut c_void,
) {
    let _ = std::panic::catch_unwind(|| unsafe {
        if msg.is_null() || context.is_null() {
            return;
        }
        let tx = &*(context as *const UnboundedSender<Value>);
        let bytes = CStr::from_ptr(msg).to_bytes();
        if bytes.len() > 256 * 1024 {
            let _ = tx.send(json!({
                "kind": "error",
                "code": "NATIVE_MESSAGE_TOO_LARGE",
            }));
            return;
        }
        if let Ok(packet) = serde_json::from_slice::<Value>(bytes) {
            if packet["type"] == "send" {
                let _ = tx.send(packet["payload"].clone());
            } else if packet["type"] == "error" {
                let _ = tx.send(json!({
                    "kind": "error",
                    "code": "AGENT_EXCEPTION",
                    "description": packet["description"],
                    "stack": packet["stack"],
                }));
            }
        }
    });
}
unsafe extern "C" fn destroy(context: *mut c_void, _closure: *mut sys::GClosure) {
    let _ = std::panic::catch_unwind(|| unsafe {
        drop(Box::from_raw(context as *mut UnboundedSender<Value>));
    });
}
unsafe extern "C" fn detached(
    _session: *mut sys::FridaSession,
    reason: sys::FridaSessionDetachReason,
    _crash: *mut sys::FridaCrash,
    context: *mut c_void,
) {
    let _ = std::panic::catch_unwind(|| unsafe {
        let tx = &*(context as *const UnboundedSender<Value>);
        let _ = tx.send(json!({
            "kind": "error",
            "code": "SESSION_DETACHED",
            "reason": reason,
        }));
    });
}

fn connect_signal(
    object: *mut c_void,
    name: &CStr,
    callback: unsafe extern "C" fn(),
    events: &UnboundedSender<Value>,
) {
    let context = Box::into_raw(Box::new(events.clone())).cast();
    unsafe {
        sys::g_signal_connect_data(
            object,
            name.as_ptr(),
            Some(callback),
            context,
            Some(destroy),
            0,
        );
    }
}

pub fn core_version() -> String {
    static INIT: Once = Once::new();
    INIT.call_once(|| unsafe { sys::frida_init() });
    unsafe {
        CStr::from_ptr(sys::frida_version_string())
            .to_string_lossy()
            .into_owned()
    }
}

impl Frida {
    pub fn start(endpoint: String, token: String, pid: u32, source: String) -> Result<Self> {
        ensure!(
            core_version() == crate::FRIDA_VERSION,
            "Core/server версии не совпадают"
        );
        let (commands, rx) = mpsc::channel();
        let (events, receiver) = unbounded_channel();
        let cancel = Arc::new(Cancellation::default());
        let c = cancel.clone();
        let thread = thread::Builder::new()
            .name("frida-core".into())
            .spawn(move || {
                let result = worker(&endpoint, &token, pid, &source, &events, &rx, &c);
                if let Err(e) = &result {
                    let _ = events.send(json!({
                        "kind": "error",
                        "code": "NATIVE_SETUP_FAILED",
                        "description": format!("{e:#}"),
                    }));
                }
                result
            })?;
        Ok(Self {
            commands,
            events: receiver,
            cancel,
            thread: Some(thread),
        })
    }

    pub fn post(&self, action: &str) -> Result<()> {
        self.commands
            .send(Command::Post(
                json!({ "type": "control", "action": action }).to_string(),
            ))
            .context("Frida worker остановлен")
    }

    pub fn configure(&self, value: Value) -> Result<()> {
        self.commands
            .send(Command::Post(value.to_string()))
            .context("Frida worker остановлен")
    }

    pub fn cancel(&self) {
        self.cancel.cancel();
    }

    pub async fn close(&mut self) -> Result<()> {
        self.cancel();
        let (tx, rx) = mpsc::channel();
        let sent = self.commands.send(Command::Close(tx)).is_ok();
        let handle = self.thread.take();
        tokio::task::spawn_blocking(move || {
            let close = if sent {
                rx.recv().context("Frida cleanup не ответил")?
            } else {
                Ok(())
            };
            let worker = if let Some(h) = handle {
                h.join()
                    .map_err(|_| anyhow::anyhow!("Frida worker panic"))?
            } else {
                Ok(())
            };
            close.and(worker)
        })
        .await?
    }
}

impl Drop for Frida {
    fn drop(&mut self) {
        self.cancel();
        let (tx, _) = mpsc::channel();
        let _ = self.commands.send(Command::Close(tx));
    }
}

fn worker(
    endpoint: &str,
    token: &str,
    pid: u32,
    source: &str,
    events: &UnboundedSender<Value>,
    commands: &mpsc::Receiver<Command>,
    cancel: &Arc<Cancellation>,
) -> Result<()> {
    let address = CString::new(endpoint)?;
    let token = CString::new(token)?;
    let source = CString::new(source)?;
    let manager = Object(unsafe { sys::frida_device_manager_new() }.cast());
    let result = (|| -> Result<()> {
        let options = Object(unsafe { sys::frida_remote_device_options_new() }.cast());
        unsafe {
            sys::frida_remote_device_options_set_token(options.0.cast(), token.as_ptr());
        }
        let device = Object(
            bounded(cancel, 45, |c, e| unsafe {
                sys::frida_device_manager_add_remote_device_sync(
                    manager.0.cast(),
                    address.as_ptr(),
                    options.0.cast(),
                    c,
                    e,
                )
            })?
            .cast(),
        );
        ensure!(!device.0.is_null(), "Frida remote device пустой");
        let params = bounded(cancel, 25, |c, e| unsafe {
            sys::frida_device_query_system_parameters_sync(device.0.cast(), c, e)
        })?;
        if !params.is_null() {
            unsafe { sys::g_hash_table_unref(params) }
        }
        let session = Object(
            bounded(cancel, 45, |c, e| unsafe {
                sys::frida_device_attach_sync(device.0.cast(), pid, ptr::null_mut(), c, e)
            })?
            .cast(),
        );
        ensure!(!session.0.is_null(), "Frida session пустая");
        connect_signal(
            session.0,
            c"detached",
            unsafe {
                std::mem::transmute::<
                    unsafe extern "C" fn(
                        *mut sys::FridaSession,
                        sys::FridaSessionDetachReason,
                        *mut sys::FridaCrash,
                        *mut c_void,
                    ),
                    unsafe extern "C" fn(),
                >(detached)
            },
            events,
        );
        let script_result = (|| -> Result<()> {
            let script = Object(
                bounded(cancel, 45, |c, e| unsafe {
                    sys::frida_session_create_script_sync(
                        session.0.cast(),
                        source.as_ptr(),
                        ptr::null_mut(),
                        c,
                        e,
                    )
                })?
                .cast(),
            );
            ensure!(!script.0.is_null(), "Frida script пустой");
            connect_signal(
                script.0,
                c"message",
                unsafe {
                    std::mem::transmute::<
                        unsafe extern "C" fn(
                            *mut sys::FridaScript,
                            *const std::ffi::c_char,
                            *mut sys::GBytes,
                            *mut c_void,
                        ),
                        unsafe extern "C" fn(),
                    >(message)
                },
                events,
            );
            bounded(cancel, 45, |c, e| unsafe {
                sys::frida_script_load_sync(script.0.cast(), c, e)
            })?;
            let mut operation = Ok(());
            for command in commands {
                match command {
                    Command::Post(s) => {
                        let s = CString::new(s)?;
                        unsafe {
                            sys::frida_script_post(script.0.cast(), s.as_ptr(), ptr::null_mut());
                        }
                    }
                    Command::Close(reply) => {
                        cancel.requested.store(false, Ordering::SeqCst);
                        unsafe {
                            sys::frida_script_post(
                                script.0.cast(),
                                c"{\"type\":\"control\",\"action\":\"cleanup\"}".as_ptr(),
                                ptr::null_mut(),
                            );
                        }
                        // The injected snapshot has an active guard; unloading also removes hooks.
                        thread::sleep(Duration::from_millis(1600));
                        operation = bounded(cancel, 10, |c, e| unsafe {
                            sys::frida_script_unload_sync(script.0.cast(), c, e)
                        });
                        let _ = reply.send(
                            operation
                                .as_ref()
                                .map(|_| ())
                                .map_err(|e| anyhow::anyhow!("{e:#}")),
                        );
                        break;
                    }
                }
            }
            operation
        })();
        cancel.requested.store(false, Ordering::SeqCst);
        let detach = bounded(cancel, 10, |c, e| unsafe {
            sys::frida_session_detach_sync(session.0.cast(), c, e)
        });
        script_result.and(detach)
    })();
    cancel.requested.store(false, Ordering::SeqCst);
    let closed = bounded(cancel, 10, |c, e| unsafe {
        sys::frida_device_manager_close_sync(manager.0.cast(), c, e)
    });
    result.and(closed)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn callback_uses_the_boxed_channel_and_preserves_payload() {
        let (tx, mut rx) = unbounded_channel::<Value>();
        let context = Box::into_raw(Box::new(tx)).cast();
        let packet = CString::new(concat!(
            r#"{"type":"send","payload":{"kind":"material","material":{"#,
            r#""creationTimestamp":"123"}}}"#
        ))
        .unwrap();
        unsafe {
            message(ptr::null_mut(), packet.as_ptr(), ptr::null_mut(), context);
        }
        assert_eq!(
            rx.try_recv().unwrap()["material"]["creationTimestamp"],
            "123"
        );
        unsafe {
            destroy(context, ptr::null_mut());
        }
        assert!(rx.is_closed());
    }
}
