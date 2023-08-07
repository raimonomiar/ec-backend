const { mysql, queries } = require('../db');
const logger = require('../lib/logger');

const {
  addUser,
} = queries;

const insertIntoUsersTable = async (queryParams) => {
  const {
    insertIntoUsersCmd,
    insertIntoUsersArgs,
  } = addUser.getQueryParamsForUsers(queryParams);
  await mysql.pool.query(insertIntoUsersCmd, insertIntoUsersArgs);
};

module.exports = {
  insertIntoUsersTable,
};
