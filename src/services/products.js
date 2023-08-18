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
    createdBy,
  } = input;
  return queryExecutor.insertIntoProductsTable({
    name,
    description,
    price,
    categoryId,
    frontImage,
    backImage,
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
    name, sortBy, sortOrder, limit: parseInt(limit, 10), offset: parseInt(offset, 10),
  });
  const products = productHelper.filterAndMapProducts(rows, ['total']);
  return products;
}

module.exports = {
  addProduct,
  getProducts,
};
