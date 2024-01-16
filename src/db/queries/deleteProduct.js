const { products, inventories } = require('../schema');

const deleteProduct = `
DELETE FROM ${inventories.table} WHERE BIN_TO_UUID(${inventories.cols.productId.colName}) = ?;
DELETE FROM ${products.table} WHERE BIN_TO_UUID(${products.cols.productId.colName}) = ?`;

const getQueryParamsForDeleteProduct = (productId) => {
  const queryArgs = [productId, productId];
  return {
    deleteProductNameCmd: deleteProduct,
    deleteProductNameArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForDeleteProduct,
};
