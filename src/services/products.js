const { pickBy, path } = require('ramda');
const queryExecutor = require('../queryExecutor');
const {
  productHelper,
} = require('../helpers');

async function addProduct(input) {
  const {
    name,
    description,
    price,
    categoryId,
    frontImage,
    backImage,
    color,
    createdBy,
  } = input;
  return queryExecutor.insertIntoProductsTable({
    name,
    description,
    price,
    categoryId,
    frontImage,
    backImage,
    color,
    createdBy,
  });
}

async function getProducts(queryParams = {}) {
  const {
    name,
    categoryId,
    sortBy,
    sortOrder,
    limit,
    offset,
  } = queryParams;
  const rows = await queryExecutor.getProducts({
    name, categoryId, sortBy, sortOrder, limit, offset,
  });
  const total = await queryExecutor.getProductsCount({
    name, categoryId,
  });
  const products = productHelper.filterAndMapProducts(rows, path([0, 'total'], total));
  return products;
}

async function getProductWithInventories(queryParams) {
  const { productId } = queryParams;
  const rows = await queryExecutor.getProductWithInventory(productId);
  const products = productHelper.filterAndMapProductsAndInventory(rows);
  return products;
}

async function updateProduct(input) {
  const { productId } = input;
  let {
    dataParams,
  } = input;
  dataParams = pickBy((val) => val !== undefined, dataParams);
  return queryExecutor.updateProductInTable({
    productId,
    dataParams,
  });
}

async function deleteProductById(productId) {
  await queryExecutor.deleteProductFromTable(productId);
}

module.exports = {
  addProduct,
  getProducts,
  getProductWithInventories,
  updateProduct,
  deleteProductById,
};
