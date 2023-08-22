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

const updateCategoryInTable = async (queryParams) => {
  // eslint-disable-next-line max-len
  const { updateCategoryNameCmd, updateCategoryNameArgs } = updateCategory.getQueryParamsForUpdateCategory(queryParams);
  await mysql.pool.query(updateCategoryNameCmd, updateCategoryNameArgs);
};
const deleteCategoryFromTable = async (queryParams) => {
  // eslint-disable-next-line max-len
  const { deleteCategoryNameCmd, deleteCategoryNameArgs } = deleteCategory.getQueryParamsForDeleteCategory(queryParams);
  await mysql.pool.query(deleteCategoryNameCmd, deleteCategoryNameArgs);
};

const getCategories = async (queryParams) => {
  const {
    selectCategoriesWIthPaginationCmd,
    selectCategoriesWIthPaginationArgs,
  } = getCategory.getQueryParamsForCategories(queryParams);
  return mysql.pool.query(selectCategoriesWIthPaginationCmd, selectCategoriesWIthPaginationArgs);
};

const getCategoryWithProduct = async (queryParams) => {
  const {
    selectCategoryWithInventoryCmd,
    selectCategoryWithInventoryArgs,
  } = getCategory.getQueryParamsForCategoryWithProduct(queryParams);
  return mysql.pool.query(selectCategoryWithInventoryCmd, selectCategoryWithInventoryArgs);
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
    insertIntoTokensCmd, insertIntoTokensArgs,
  } = addToken.getQueryParamsForTokens(queryParams);
  return mysql.pool.query(insertIntoTokensCmd, insertIntoTokensArgs);
};

const getResetPasswordToken = async (queryParams) => {
  const { selectTokenCmd, selectTokenArgs } = getToken(queryParams);
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

const getProductWithInventory = async (queryParams) => {
  const {
    selectProductWithInventoryCmd,
    selectProductWithInventoryArgs,
  } = getProduct.getQueryParamsForProductWithInventory(queryParams);
  return mysql.pool.query(selectProductWithInventoryCmd, selectProductWithInventoryArgs);
};
const updateProductInTable = async (queryParams) => {
  // eslint-disable-next-line max-len
  const { updateProductNameCmd, updateProductNameArgs } = updateProduct.getQueryParamsForUpdateProduct(queryParams);
  await mysql.pool.query(updateProductNameCmd, updateProductNameArgs);
};
const deleteProductFromTable = async (queryParams) => {
  // eslint-disable-next-line max-len
  const {
    deleteProductNameCmd,
    deleteProductNameArgs,
  } = deleteProduct.getQueryParamsForDeleteProduct(queryParams);
  await mysql.pool.query(deleteProductNameCmd, deleteProductNameArgs);
};
const insertIntoInventoryTable = async (queryParams) => {
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
  getCategoryWithProduct,
  getProductWithInventory,
  updateProductInTable,
  deleteProductFromTable,
  insertIntoInventoryTable,
  updateInventoryTable,
};
