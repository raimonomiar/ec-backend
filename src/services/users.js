/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const {
  saltRound,
} = require('config').get('constants');
const queryExecutor = require('../queryExecutor');
const { userHelper } = require('../helpers');

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
async function getAllUsers(queryParams = {}) {
  const {
    searchParam,
    sortBy,
    sortOrder,
    limit,
    offset,
  } = queryParams;
  const rows = await queryExecutor.getAllUsers({
    searchParam, sortBy, sortOrder, limit, offset,
  });
  const users = userHelper.filterAndMapUsers(rows, ['total']);
  return users;
}

async function getUsersById(queryParams) {
  const { userId } = queryParams;
  const [row] = await queryExecutor.getUserById(userId);
  return row;
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

module.exports = {
  addUser,
  validatePassword,
  getUserByEmail,
  getAllUsers,
  getUsersById,
  updatePassword,
};
