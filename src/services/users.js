const bcrypt = require('bcrypt');
const {
  saltRound,
} = require('config').get('constants');
const { pickBy } = require('ramda');
const queryExecutor = require('../queryExecutor');

async function addUser(input) {
  const {
    email,
    firstName,
    lastName,
    password,
    street,
    zip,
    phone,
    isAdmin,
    city,
    appartment,
    createdBy,
    updatedBy,
  } = input;

  const passwordHash = await bcrypt.hash(password, saltRound);
  const result = await queryExecutor.insertIntoUsersTable({
    email,
    firstName,
    lastName,
    passwordHash,
    street,
    zip,
    phone,
    isAdmin,
    city,
    appartment,
    createdBy,
    updatedBy,
  });
  return result;
}

async function updatePassword(input) {
  const { userId, password } = input;
  const hashPassword = await bcrypt.hash(password, saltRound);
  await queryExecutor.updatePassword({
    userId, hashPassword,
  });
}

async function getUserByEmail(email) {
  return queryExecutor.getUserByEmail(email);
}

async function validatePassword(input) {
  const { email, password } = input;
  const [row] = await getUserByEmail(email);
  if (!row) {
    return {
      isValid: false,
      userId: null,
    };
  }
  const { userId, firstName, lastName } = row;
  return {
    isValid: await bcrypt.compare(password, row.passwordHash),
    userId,
    firstName,
    lastName,
    email,
  };
}

async function updateUser(input) {
  const {
    userId,
  } = input;
  let { dataParams } = input;
  dataParams = pickBy((val) => val !== undefined, dataParams);
  return queryExecutor.updateUserTable({
    userId,
    dataParams,
  });
}

module.exports = {
  addUser,
  validatePassword,
  getUserByEmail,
  updatePassword,
  updateUser,
};
