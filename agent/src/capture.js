export default function setup(Java) {
  const { pageSource, key, captureMs } = globalThis.IDPOCKET_CONFIG;
  const report = (packet) => send(packet);
  let views = new Map();
  let callbacks = new Map();
  let counter = 1;
  let WV;
  let SYS;
  let CB;
  let current = null;
  let done = false;
  let started = false;
  let deadline = 0;
  const now = () => (Process.getCurrentThreadId && clock ? clock.elapsedRealtime() : Date.now());
  let clock;

  function remember(v) {
    try {
      const id = String(SYS.identityHashCode(v));
      if (!views.has(id)) {
        if (views.size >= 32) {
          const old = views.keys().next().value;
          views.get(old).$dispose?.();
          views.delete(old);
        }
        views.set(id, Java.retain(v));
      }
    } catch (_) {}
  }

  function evaluate(view, script, fn) {
    const id = counter++;
    callbacks.set(id, fn);
    const cb = CB.$new();
    cb.callbackId.value = id;
    try {
      WV.evaluateJavascript
        .overload('java.lang.String', 'android.webkit.ValueCallback')
        .call(view, script, cb);
    } catch (e) {
      callbacks.delete(id);
      throw e;
    }
  }

  function cleanup(fn) {
    if (!current) {
      fn();
      return;
    }
    Java.scheduleOnMainThread(() => {
      let finished = false;
      const finish = () => {
        if (!finished) {
          finished = true;
          fn();
        }
      };

      const s = `
        (function () {
          const k = ${JSON.stringify(key)};
          if (window[k]) window[k].active = false;
          delete window[k];
        })()
      `;
      try {
        evaluate(current, s, finish);
      } catch (_) {
        finish();
      }
      setTimeout(finish, 1500);
    });
  }

  function fail(code) {
    if (done) return;
    done = true;
    cleanup(() => report({ kind: 'error', code }));
  }

  function poll() {
    if (done) return;
    if (now() >= deadline) {
      fail('CAPTURE_TIMEOUT');
      return;
    }
    Java.scheduleOnMainThread(() => {
      try {
        const s = `
          location.origin === 'https://digital-id.max.ru'
            ? JSON.stringify(window[${JSON.stringify(key)}] || null)
            : 'ORIGIN_CHANGED'
        `;
        evaluate(current, s, (encoded) => {
          if (done) return;
          let value;
          try {
            const d = JSON.parse(String(encoded));
            if (d === 'ORIGIN_CHANGED') {
              fail('ORIGIN_CHANGED');
              return;
            }
            value = typeof d === 'string' ? JSON.parse(d) : d;
          } catch (_) {
            fail('CALLBACK_FORMAT_UNKNOWN');
            return;
          }
          if (value?.status === 'error') {
            if (value.code === 'OFFICIAL_BRIDGE_NOT_READY') {
              setTimeout(startSnapshot, 300);
              return;
            }
            fail('OFFICIAL_BRIDGE_READ_FAILED');
            return;
          }
          if (value?.status === 'ready') {
            done = true;
            cleanup(() => report({ kind: 'material', material: value.material }));
          } else setTimeout(poll, 250);
        });
      } catch (_) {
        fail('WEBVIEW_UNAVAILABLE');
      }
    });
  }

  function startSnapshot() {
    if (done) return;
    if (now() >= deadline) {
      fail('CAPTURE_TIMEOUT');
      return;
    }
    Java.scheduleOnMainThread(() => {
      try {
        evaluate(current, pageSource, () => setTimeout(poll, 250));
      } catch (_) {
        fail('SNAPSHOT_START_FAILED');
      }
    });
  }

  function pick() {
    if (done) return;
    if (now() >= deadline) {
      fail('OPEN_DIGITAL_ID_AND_UNLOCK_FIRST');
      return;
    }
    Java.scheduleOnMainThread(() => {
      const eligible = [];
      for (const v of views.values()) {
        try {
          if (
            v.isShown() &&
            /^https:\/\/digital-id\.max\.ru(?:[\/#?]|$)/.test(String(v.getUrl() || ''))
          )
            eligible.push(v);
        } catch (_) {}
      }
      if (eligible.length > 1) {
        fail('MULTIPLE_VISIBLE_DID_VIEWS');
        return;
      }
      if (!eligible.length) {
        setTimeout(scan, 300);
        return;
      }
      current = eligible[0];
      report({ kind: 'capturing' });
      startSnapshot();
    });
  }

  function scan() {
    if (done) return;
    Java.perform(() => {
      try {
        Java.choose('android.webkit.WebView', { onMatch: remember, onComplete: pick });
      } catch (_) {
        pick();
      }
    });
  }

  function begin() {
    if (started) {
      report({ kind: 'error', code: 'ONE_CAPTURE_PER_RUN' });
      return;
    }
    started = true;
    deadline = now() + captureMs;
    scan();
  }

  function receive() {
    recv('control', (msg) => {
      if (msg.action === 'capture') begin();
      else if (msg.action === 'cleanup') {
        done = true;
        cleanup(() => report({ kind: 'cleaned' }));
      }
      receive();
    });
  }
  function setupFailed(error) {
    report({
      kind: 'error',
      code: 'JAVA_SETUP_FAILED',
      description: String(error),
      stack: error?.stack,
    });
  }

  function initialize() {
    try {
      const app = Java.use('android.app.ActivityThread').currentApplication();
      if (!app || String(app.getPackageName()) !== 'ru.oneme.app') {
        report({ kind: 'error', code: 'WRONG_APP_PROCESS' });
        return;
      }
      clock = Java.use('android.os.SystemClock');
      WV = Java.use('android.webkit.WebView');
      SYS = Java.use('java.lang.System');
      CB = Java.registerClass({
        name: 'org.idpocket.export.Callback' + Date.now(),
        implements: [Java.use('android.webkit.ValueCallback')],
        fields: { callbackId: 'int' },
        methods: {
          onReceiveValue: {
            returnType: 'void',
            argumentTypes: ['java.lang.Object'],
            implementation: function (v) {
              const id = this.callbackId.value;
              const fn = callbacks.get(id);
              callbacks.delete(id);
              if (fn) fn(v);
            },
          },
        },
      });
      const ev = WV.evaluateJavascript.overload('java.lang.String', 'android.webkit.ValueCallback');
      ev.implementation = function (s, c) {
        remember(this);
        return ev.call(this, s, c);
      };

      const load = WV.loadUrl.overload('java.lang.String');
      load.implementation = function (u) {
        remember(this);
        return load.call(this, u);
      };

      const add = WV.addJavascriptInterface.overload('java.lang.Object', 'java.lang.String');
      add.implementation = function (o, n) {
        remember(this);
        return add.call(this, o, n);
      };
      receive();
      report({
        kind: 'ready',
        uid: Java.use('android.os.Process').myUid(),
        androidVersion: Java.androidVersion,
      });
    } catch (error) {
      setupFailed(error);
    }
  }

  try {
    Java.perform(initialize);
  } catch (error) {
    setupFailed(error);
  }
}
