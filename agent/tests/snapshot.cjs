'use strict';

const fs = require('fs');
const vm = require('vm');
const assert = require('assert/strict');
const path = require('path');

const page = fs.readFileSync(path.join(__dirname, '../src/page-snapshot.js'), 'utf8');
const source = fs
  .readFileSync(path.join(__dirname, '../src/capture.js'), 'utf8')
  .replace('export default function setup', 'function setup');
const key = '__test';
let count = 0;

function pageSource(bio) {
  return page
    .replaceAll('__SNAPSHOT_KEY__', JSON.stringify(key))
    .replaceAll('__WITH_BIOMETRY__', String(bio));
}

function env(opts = {}) {
  const calls = { reads: [], bio: 0, network: 0 };
  const ctx = {
    window: {},
    location: { origin: opts.origin || 'https://digital-id.max.ru' },
    navigator: { userAgent: 'Synthetic User Agent' },
    fetch() {
      calls.network++;
      throw Error('network');
    },
    localStorage: {
      getItem() {
        throw Error('localStorage');
      },
    },
  };
  ctx.window.WebApp = {
    initDataUnsafe: { user: { id: 42 } },
    SecureStorage: {
      getItem: async (n) => {
        calls.reads.push(n);
        return {
          value:
            n === 'pin_salt::digitalId' && opts.noSalt
              ? null
              : JSON.stringify({
                  data: n.startsWith('pin_salt')
                    ? 'synthetic-salt'
                    : opts.stringTs
                      ? '12345'
                      : 12345,
                  timestamp: 1,
                }),
        };
      },
    },
    BiometricManager: {
      init: async () => ({
        deviceId: 'synthetic-device',
        available: true,
        accessGranted: true,
        tokenSaved: true,
      }),
      authenticate: async () => {
        calls.bio++;
        return { token: 'synthetic-bio-token' };
      },
    },
  };
  return { ctx, calls };
}

async function test(name, f) {
  await f();
  count++;
  console.log(`ok ${count} - ${name}`);
}

async function snapshot(opts = {}) {
  const e = env(opts);
  await vm.runInNewContext(pageSource(!!opts.bio), e.ctx);
  return { ...e, result: e.ctx.window[key] };
}

async function agent(opts = {}) {
  const e = env(opts);
  const packets = [];
  let receive;
  let callbackSpec;
  const context = vm.createContext(e.ctx);
  const began = Date.now();
  let scans = 0;
  const view = {
    getUrl: () => opts.url || 'https://digital-id.max.ru/#qr',
    isShown: () => !opts.hidden,
  };

  const evalMethod = {
    call(v, s, cb) {
      const out = vm.runInContext(s, context);
      setImmediate(() => cb.onReceiveValue(JSON.stringify(out) ?? 'null'));
    },
  };

  const dummy = { call() {} };
  const WV = {
    evaluateJavascript: { overload: () => evalMethod },
    loadUrl: { overload: () => dummy },
    addJavascriptInterface: { overload: () => dummy },
  };

  const classes = {
    'android.app.ActivityThread': {
      currentApplication: () => ({ getPackageName: () => (opts.wrong ? 'wrong' : 'ru.oneme.app') }),
    },
    'android.os.SystemClock': { elapsedRealtime: () => Date.now() - began },
    'android.os.Process': { myUid: () => 10123 },
    'android.webkit.WebView': WV,
    'java.lang.System': { identityHashCode: () => 1 },
    'android.webkit.ValueCallback': {},
  };

  const Java = {
    perform: (f) => {
      if (opts.performError) throw Error(opts.performError);
      f();
    },
    scheduleOnMainThread: (f) => setImmediate(f),
    retain: (v) => v,
    use: (k) => {
      if (opts.classError) throw Error(opts.classError);
      return classes[k];
    },
    choose: (k, c) => {
      scans++;
      if (!opts.delayed || scans > 1) c.onMatch(view);
      c.onComplete();
    },
    registerClass: (spec) => {
      return {
        $new: () => ({
          callbackId: { value: 0 },
          onReceiveValue(v) {
            spec.methods.onReceiveValue.implementation.call(this, v);
          },
        }),
      };
    },
  };

  const native = {
    Java,
    globalThis: {
      IDPOCKET_CONFIG: { pageSource: pageSource(!!opts.bio), key, captureMs: opts.timeout || 1200 },
    },
    Process: { getCurrentThreadId: () => 1 },
    send: (p) => packets.push(p),
    recv: (type, fn) => {
      receive = fn;
    },
    setTimeout,
    Date,
  };
  vm.runInNewContext(source + ';setup(Java);', native);
  async function wait(kind) {
    for (let n = 0; n < 300; n++) {
      const p = packets.find((p) => p.kind === kind);
      if (p) return p;
      await new Promise((r) => setTimeout(r, 10));
    }
    throw Error('timeout ' + kind);
  }
  return { ...e, native, packets, wait, begin: () => receive({ action: 'capture' }) };
}

(async () => {
  await test('only known keys, no network or PIN', async () => {
    const r = await snapshot();
    assert.deepEqual(r.calls.reads, ['pin_salt::digitalId', 'creation_timestamp::digitalId']);
    assert.equal(r.calls.bio, 0);
    assert.equal(r.calls.network, 0);
  });
  await test('timestamp string preserved', async () => {
    const r = await snapshot({ stringTs: true });
    assert.equal(r.result.material.creationTimestamp, '12345');
  });
  await test('wrong origin ignored', async () => {
    const r = await snapshot({ origin: 'https://wrong.invalid' });
    assert.equal(r.result, undefined);
    assert.equal(r.calls.reads.length, 0);
  });
  await test('legacy biometry once and only without salt', async () => {
    const a = await snapshot({ bio: true });
    assert.equal(a.calls.bio, 0);
    const b = await snapshot({ bio: true, noSalt: true });
    assert.equal(b.calls.bio, 1);
  });
  await test('navigation during async read cannot publish', async () => {
    const e = env();
    let resolve;
    e.ctx.window.WebApp.BiometricManager.init = () => new Promise((r) => (resolve = r));
    const p = vm.runInNewContext(pageSource(false), e.ctx);
    e.ctx.location.origin = 'https://wrong.invalid';
    resolve({ deviceId: 'd' });
    await p;
    assert.equal(e.ctx.window[key].status, 'pending');
    assert.equal(e.calls.reads.length, 0);
  });
  await test('explicit trigger required', async () => {
    const a = await agent();
    await a.wait('ready');
    assert.equal(a.calls.reads.length, 0);
  });
  await test('Java bridge initialization failure preserves its cause and stack', async () => {
    const message = 'Unable to find copied methods in java/lang/Thread';
    const a = await agent({ performError: message });
    const p = await a.wait('error');
    assert.equal(p.code, 'JAVA_SETUP_FAILED');
    assert.equal(p.description, 'Error: ' + message);
    assert.match(p.stack, /Unable to find copied methods/);
    assert.equal(
      a.packets.some((packet) => packet.kind === 'ready'),
      false,
    );
    assert.equal(a.calls.reads.length, 0);
  });
  await test('Java class setup failure preserves its cause and stack', async () => {
    const a = await agent({ classError: 'WebView class is unavailable' });
    const p = await a.wait('error');
    assert.equal(p.code, 'JAVA_SETUP_FAILED');
    assert.equal(p.description, 'Error: WebView class is unavailable');
    assert.match(p.stack, /WebView class is unavailable/);
    assert.equal(
      a.packets.some((packet) => packet.kind === 'ready'),
      false,
    );
    assert.equal(a.calls.reads.length, 0);
  });
  await test('native post/send capture and snapshot cleanup', async () => {
    const a = await agent();
    a.begin();
    const p = await a.wait('material');
    assert.equal(p.material.pinSalt, 'synthetic-salt');
    assert.equal(a.ctx.window[key], undefined);
    assert.equal(a.calls.network, 0);
  });
  await test('late WebView waited for', async () => {
    const a = await agent({ delayed: true });
    a.begin();
    await a.wait('material');
  });
  await test('lookalike origin rejected', async () => {
    const a = await agent({ url: 'https://digital-id.max.ru.evil/', timeout: 300 });
    a.begin();
    assert.equal((await a.wait('error')).code, 'OPEN_DIGITAL_ID_AND_UNLOCK_FIRST');
    assert.equal(a.calls.reads.length, 0);
  });
  await test('hidden view rejected', async () => {
    const a = await agent({ hidden: true, timeout: 300 });
    a.begin();
    await a.wait('error');
    assert.equal(a.calls.reads.length, 0);
  });
  await test('wrong package rejected', async () => {
    const a = await agent({ wrong: true });
    assert.equal((await a.wait('error')).code, 'WRONG_APP_PROCESS');
  });
  console.log(`JS tests: ${count}; Android device not tested`);
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
