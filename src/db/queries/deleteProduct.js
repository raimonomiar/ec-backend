const { products } = require('../schema');

const deleteProduct = `
DELETE FROM ${products.table}
WHERE BIN_TO_UUID(${products.cols.productId.colName}) = ?`;

const getQueryParamsForDeleteProduct = (productId) => {
  const queryArgs = [productId];
  return {
    deleteProductNameCmd: deleteProduct,
    deleteProductNameArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForDeleteProduct,
};
