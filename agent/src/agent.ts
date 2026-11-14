import Java from 'frida-java-bridge';
// The implementation is shared with the mock harness; the bundle embeds Java.
// @ts-ignore - capture.js is also exercised directly in the Node mock harness.
import setup from './capture.js';

recv('config', (message) => {
  (globalThis as any).IDPOCKET_CONFIG = message.config;
  setup(Java);
});
