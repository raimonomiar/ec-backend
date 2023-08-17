const crypto = require('crypto');
const {
  tokenLength,
  tokenExpirationTime,
} = require('config').get('constants');
const queryExecutor = require('../queryExecutor');

const generateUniqueToken = () => crypto.randomBytes(tokenLength).toString('hex');

async function getResetPasswordToken(input) {
  const { userId, tokenType } = input;
  const token = generateUniqueToken();
  await queryExecutor.insertIntoTokensTable({
    token,
    userId,
    tokenType,
  });
  return token;
}

async function validateResetToken(input) {
  const { token } = input;
  const [row] = await queryExecutor.getResetPasswordToken({ token, tokenExpirationTime });
  return row.count > 0;
}

module.exports = {
  getResetPasswordToken,
  validateResetToken,
};
