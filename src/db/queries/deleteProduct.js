const { products } = require('../schema');

const deleteProduct = `
DELETE products, inventories
FROM ${products.table} AS products
LEFT JOIN inventories ON products.${products.cols.productId.colName} = inventories.product_id
WHERE BIN_TO_UUID(products.${products.cols.productId.colName}) = ?`;

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
