const { mysql, queries } = require('../db');

const {
  addUser,
  getUser,
  updateUser,
} = queries;

const insertIntoUsersTable = (queryParams) => {
  const {
    insertIntoUsersCmd,
    insertIntoUsersArgs,
  } = addUser.getQueryParamsForUsers(queryParams);
  return mysql.pool.query(insertIntoUsersCmd, insertIntoUsersArgs);
};

const getUserByEmail = async (email) => {
  const { selectUserByEmailCmd, selectUserByEmailArgs } = getUser(email);
  return mysql.pool.query(selectUserByEmailCmd, selectUserByEmailArgs);
};

const updatePassword = async (queryParams) => {
  const {
    updatePasswordCmd,
    updatePasswordArgs,
  } = updateUser.getQueryParamsForPassword(queryParams);
  mysql.pool.query(updatePasswordCmd, updatePasswordArgs);
};

module.exports = {
  insertIntoUsersTable,
  getUserByEmail,
  updatePassword,
};
