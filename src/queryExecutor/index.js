const { mysql, queries } = require('../db');

const {
  addUser,
  getUser,
  updateUser,
  addToken,
  getToken,
  addCategory,
  updateCategory,
  deleteCategory,
  addProduct,
  getProduct,
  getCategory,
  updateProduct,
  deleteProduct,
  addInventory,
  updateInventory,
  deleteInventory,
} = queries;

const insertIntoUsersTable = async (queryParams) => {
  const {
    insertIntoUsersCmd,
    insertIntoUsersArgs,
  } = addUser.getQueryParamsForUsers(queryParams);
  return mysql.pool.query(insertIntoUsersCmd, insertIntoUsersArgs);
};

const insertIntoCategoryTable = async (queryParams) => {
  const {
    insertIntoCategoryCmd,
    insertIntoCategoryArgs,
  } = addCategory.getQueryParamsForCategory(queryParams);
  await mysql.pool.query(insertIntoCategoryCmd, insertIntoCategoryArgs);
};

const updateCategoryInTable = (queryParams) => {
  const {
    updateCategoryNameCmd,
    updateCategoryNameArgs,
  } = updateCategory.getQueryParamsForUpdateCategory(queryParams);
  return mysql.pool.query(updateCategoryNameCmd, updateCategoryNameArgs);
};
const deleteCategoryFromTable = (queryParams) => {
  const {
    deleteCategoryNameCmd,
    deleteCategoryNameArgs,
  } = deleteCategory.getQueryParamsForDeleteCategory(queryParams);
  return mysql.pool.query(deleteCategoryNameCmd, deleteCategoryNameArgs);
};

const getCategories = (queryParams) => {
  const {
    selectCategoriesWIthPaginationCmd,
    selectCategoriesWIthPaginationArgs,
  } = getCategory.getQueryParamsForCategories(queryParams);
  return mysql.pool.query(selectCategoriesWIthPaginationCmd, selectCategoriesWIthPaginationArgs);
};

const getCategoryFromTable = (queryParams) => {
  const {
    selectCategoryCmd,
    selectCategoryArgs,
  } = getCategory.getQueryParamsForCategory(queryParams);
  return mysql.pool.query(selectCategoryCmd, selectCategoryArgs);
};

const getUserByEmail = (email) => {
  const { selectUserByEmailCmd, selectUserByEmailArgs } = getUser(email);
  return mysql.pool.query(selectUserByEmailCmd, selectUserByEmailArgs);
};

const updatePassword = (queryParams) => {
  const {
    updatePasswordCmd,
    updatePasswordArgs,
  } = updateUser.getQueryParamsForPassword(queryParams);
  mysql.pool.query(updatePasswordCmd, updatePasswordArgs);
};

const insertIntoTokensTable = (queryParams) => {
  const {
    insertIntoTokensCmd, insertIntoTokensArgs,
  } = addToken.getQueryParamsForTokens(queryParams);
  return mysql.pool.query(insertIntoTokensCmd, insertIntoTokensArgs);
};

const getResetPasswordToken = (queryParams) => {
  const { selectTokenCmd, selectTokenArgs } = getToken(queryParams);
  return mysql.pool.query(selectTokenCmd, selectTokenArgs);
};

const insertIntoProductsTable = (queryParams) => {
  const {
    insertIntoProductsCmd,
    insertIntoProductsArgs,
  } = addProduct.getQueryParamsForProducts(queryParams);
  return mysql.pool.query(insertIntoProductsCmd, insertIntoProductsArgs);
};

const getProducts = (queryParams) => {
  const {
    selectProductsWIthPaginationCmd,
    selectProductsWIthPaginationArgs,
  } = getProduct.getQueryParamsForProducts(queryParams);
  return mysql.pool.query(selectProductsWIthPaginationCmd, selectProductsWIthPaginationArgs);
};

const getProductWithInventory = (queryParams) => {
  const {
    selectProductWithInventoryCmd,
    selectProductWithInventoryArgs,
  } = getProduct.getQueryParamsForProductWithInventory(queryParams);
  return mysql.pool.query(selectProductWithInventoryCmd, selectProductWithInventoryArgs);
};
const updateProductInTable = (queryParams) => {
  const {
    updateProductCmd,
    updateProductArgs,
  } = updateProduct.getQueryParamsForUpdateProduct(queryParams);
  mysql.pool.query(updateProductCmd, updateProductArgs);
};
const deleteProductFromTable = (queryParams) => {
  const {
    deleteProductNameCmd,
    deleteProductNameArgs,
  } = deleteProduct.getQueryParamsForDeleteProduct(queryParams);
  mysql.pool.query(deleteProductNameCmd, deleteProductNameArgs);
};
const insertIntoInventoryTable = (queryParams) => {
  const {
    insertIntoInventoryCmd,
    insertIntoInventoryArgs,
  } = addInventory.getQueryParamsForInventories(queryParams);
  return mysql.pool.query(insertIntoInventoryCmd, insertIntoInventoryArgs);
};

const updateInventoryTable = async (queryParams) => {
  const {
    updateInventoryCmd,
    updateInventoryArgs,
  } = updateInventory.getQueryParamsForInventory(queryParams);
  return mysql.pool.query(updateInventoryCmd, updateInventoryArgs);
};

const deleteInventoryTable = async (queryParams) => {
  const {
    deleteInventoryCmd,
    deleteInventoryArgs,
  } = deleteInventory.getQueryParamsForDeleteInventory(queryParams);
  return mysql.pool.query(deleteInventoryCmd, deleteInventoryArgs);
};

module.exports = {
  insertIntoUsersTable,
  getUserByEmail,
  updatePassword,
  insertIntoTokensTable,
  getResetPasswordToken,
  insertIntoProductsTable,
  getProducts,
  insertIntoCategoryTable,
  updateCategoryInTable,
  deleteCategoryFromTable,
  getCategories,
  getCategoryFromTable,
  getProductWithInventory,
  updateProductInTable,
  deleteProductFromTable,
  insertIntoInventoryTable,
  updateInventoryTable,
  deleteInventoryTable,
};
