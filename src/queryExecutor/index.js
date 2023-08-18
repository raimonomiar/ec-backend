const { mysql, queries } = require('../db');

const {
  addUser,
  getUser,
  updateUser,
  addToken,
  getToken,
  addProduct,
  getProduct,
} = queries;

const insertIntoUsersTable = async (queryParams) => {
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

const insertIntoTokensTable = (queryParams) => {
  const {
    insertIntoTokensCmd,
    insertIntoTokensArgs,
  } = addToken.getQueryParamsForTokens(queryParams);
  return mysql.pool.query(insertIntoTokensCmd, insertIntoTokensArgs);
};

const getResetPasswordToken = async (queryParams) => {
  const {
    selectTokenCmd,
    selectTokenArgs,
  } = getToken(queryParams);
  return mysql.pool.query(selectTokenCmd, selectTokenArgs);
};

const insertIntoProductsTable = async (queryParams) => {
  const {
    insertIntoProductsCmd,
    insertIntoProductsArgs,
  } = addProduct.getQueryParamsForProducts(queryParams);
  return mysql.pool.query(insertIntoProductsCmd, insertIntoProductsArgs);
};

const getProducts = async (queryParams) => {
  const {
    selectProductsWIthPaginationCmd,
    selectProductsWIthPaginationArgs,
  } = getProduct.getQueryParamsForProducts(queryParams);
  return mysql.pool.query(selectProductsWIthPaginationCmd, selectProductsWIthPaginationArgs);
};

module.exports = {
  insertIntoUsersTable,
  getUserByEmail,
  updatePassword,
  insertIntoTokensTable,
  getResetPasswordToken,
  insertIntoProductsTable,
  getProducts,
};
