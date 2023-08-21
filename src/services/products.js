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
    sortBy,
    sortOrder,
    limit,
    offset,
  } = queryParams;
  const rows = await queryExecutor.getProducts({
    name, sortBy, sortOrder, limit, offset,
  });
  const products = productHelper.filterAndMapProducts(rows, ['total']);
  return products;
}

async function getProductWithInventories(queryParams) {
  const { productId } = queryParams;
  const rows = await queryExecutor.getProductWithInventory(productId);
  const products = productHelper.filterAndMapProductsAndInventory(rows);
  return products;
}

module.exports = {
  addProduct,
  getProducts,
  getProductWithInventories,
};
