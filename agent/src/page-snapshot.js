/* Read-only snapshot of the already unlocked official Digital ID WebView.
   Does not read PIN, localStorage/photo/documents, or invoke fetch/XHR.
   An optional normal biometric prompt is only used for a legacy no-salt profile.
   The host replaces __SNAPSHOT_KEY__ and __WITH_BIOMETRY__ with constants. */
(async function () {
  const key = __SNAPSHOT_KEY__;
  if (location.origin !== 'https://digital-id.max.ru') return;
  const box = { active: true, status: 'pending' };
  window[key] = box;
  const active = () =>
    location.origin === 'https://digital-id.max.ru' && window[key] === box && box.active;
  const publish = (v) => {
    if (active()) Object.assign(box, v);
  };

  const errors = [];

  function unwrap(value) {
    if (value == null || value === '') return null;
    if (typeof value !== 'string') throw Error('shape');
    const obj = JSON.parse(value);
    if (!obj || typeof obj !== 'object' || Array.isArray(obj) || !Object.hasOwn(obj, 'data'))
      throw Error('shape');
    if (obj.ttl && Date.now() - obj.timestamp > obj.ttl) return null;
    return obj.data;
  }

  async function read(name, label) {
    try {
      if (!active()) return null;
      const value = await window.WebApp.SecureStorage.getItem(name);
      return unwrap(value.value);
    } catch (_) {
      errors.push(label + '_unavailable');
      return null;
    }
  }
  try {
    const app = window.WebApp;
    if (!app || !app.SecureStorage || !app.BiometricManager) {
      publish({ status: 'error', code: 'OFFICIAL_BRIDGE_NOT_READY' });
      return;
    }

    const bio = await app.BiometricManager.init();
    const pinSalt = await read('pin_salt::digitalId', 'pin_salt');
    const creationTimestamp = await read('creation_timestamp::digitalId', 'creation_timestamp');
    let biometricToken = null;
    if (__WITH_BIOMETRY__ && !pinSalt && active()) {
      if (bio.available && bio.accessGranted && bio.tokenSaved) {
        try {
          const auth = await app.BiometricManager.authenticate(
            'Экспорт моего Digital ID в ID Pocket',
          );
          if (typeof auth.token === 'string' && auth.token) biometricToken = auth.token;
          else errors.push('biometric_token_missing');
        } catch (_) {
          errors.push('biometric_auth_not_completed');
        }
      } else errors.push('biometric_token_not_available');
    }

    const user = (app.initDataUnsafe || {}).user || {};
    publish({
      status: 'ready',
      material: {
        schema: 'did-local-material-v1',
        origin: location.origin,
        capturedAt: Date.now(),
        userId: Number.isSafeInteger(user.id) && user.id > 0 ? user.id : null,
        userAgent: navigator.userAgent,
        biometry: {
          deviceId: bio.deviceId ?? null,
          available: bio.available === true,
          accessGranted: bio.accessGranted === true,
          tokenSaved: bio.tokenSaved === true,
        },
        pinSalt,
        creationTimestamp,
        biometricToken,
        captureErrors: errors,
        containsSecrets: true,
      },
    });
  } catch (_) {
    publish({ status: 'error', code: 'OFFICIAL_BRIDGE_READ_FAILED' });
  }
})();
