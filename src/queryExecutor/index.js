const { mysql, queries } = require('../db');

const {
  addUser, getUser, updateUser, addToken, getToken, addCategory,
} = queries;

const insertIntoUsersTable = (queryParams) => {
  const { insertIntoUsersCmd, insertIntoUsersArgs } = addUser.getQueryParamsForUsers(queryParams);
  return mysql.pool.query(insertIntoUsersCmd, insertIntoUsersArgs);
};

// for category
const insertIntoCategoryTable = async (queryParams) => {
  // eslint-disable-next-line max-len
  const { insertIntoCategoryCmd, insertIntoCategoryArgs } = addCategory.getQueryParamsForCategory(queryParams);
  await mysql.pool.query(insertIntoCategoryCmd, insertIntoCategoryArgs);
};

const getUserByEmail = async (email) => {
  const { selectUserByEmailCmd, selectUserByEmailArgs } = getUser(email);
  return mysql.pool.query(selectUserByEmailCmd, selectUserByEmailArgs);
};

const updatePassword = async (queryParams) => {
  // eslint-disable-next-line max-len
  const { updatePasswordCmd, updatePasswordArgs } = updateUser.getQueryParamsForPassword(queryParams);
  mysql.pool.query(updatePasswordCmd, updatePasswordArgs);
};

const insertIntoTokensTable = (queryParams) => {
  // eslint-disable-next-line max-len
  const { insertIntoTokensCmd, insertIntoTokensArgs } = addToken.getQueryParamsForTokens(queryParams);
  return mysql.pool.query(insertIntoTokensCmd, insertIntoTokensArgs);
};

const getResetPasswordToken = async (queryParams) => {
  const { selectTokenCmd, selectTokenArgs } = getToken(queryParams);
  return mysql.pool.query(selectTokenCmd, selectTokenArgs);
};

module.exports = {
  insertIntoUsersTable,
  getUserByEmail,
  updatePassword,
  insertIntoTokensTable,
  getResetPasswordToken,
  insertIntoCategoryTable,
};
