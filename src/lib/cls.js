const cls = require('cls-hooked');
const config = require('config');

const clsSession = cls.createNamespace(config.get('app.name'));

/**
 * returns value based on key
 */
function get(key) {
  return clsSession.get(key);
}

/**
 * sets value based on key
 */
function set(key, val) {
  clsSession.set(key, val);
}

module.exports = {
  clsSession,
  get,
  set,
};
