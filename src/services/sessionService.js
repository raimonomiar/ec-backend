const { isEmpty, path } = require('ramda');
const {
  constants: {
    cartSessionExpirationTime,
  },
} = require('config');
const queryExecutor = require('../queryExecutor');

function getCartSession(userId) {
  return queryExecutor.getCartSession({
    userId,
    cartSessionExpirationTime,
  });
}

function addNewSession(userId) {
  const initialTotal = 0;
  return queryExecutor.insertCartSession({
    userId,
    initialTotal,
  });
}

async function getSessionId(userId) {
  const session = await getCartSession(userId);
  if (isEmpty(session)) {
    await addNewSession(userId);
    return getCartSession(userId);
  }
  return path(['0', 'sessionId'], session);
}

module.exports = {
  getSessionId,
};
