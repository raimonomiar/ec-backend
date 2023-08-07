const { mysql, queries } = require('../db');
const logger = require('../lib/logger');

const {
  addUser,
  getUser,
  updateUser,
} = queries;

const insertIntoUsersTable = async (queryParams) => {
  const {
    insertIntoUsersCmd,
    insertIntoUsersArgs,
  } = addUser.getQueryParamsForUsers(queryParams);
  mysql.pool.query(insertIntoUsersCmd, insertIntoUsersArgs);
};

const getUserByEmail = async (email) => {
  const { cmd, args } = getUser(email);
  return mysql.pool.query(cmd, args);
};

const updatePassword = async (queryParams) => {
  const {
    cmd,
    args,
  } = updateUser.getQueryParamsForPassword(queryParams);
  mysql.pool.query(cmd, args);
};

module.exports = {
  insertIntoUsersTable,
  getUserByEmail,
  updatePassword,
};
