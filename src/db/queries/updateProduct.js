const { products } = require('../schema');

const updateProductQuery = (updateVal) => `
  UPDATE ${products.table}
  SET ${updateVal}
  WHERE BIN_TO_UUID(${products.cols.productId.colName}) = ?`;

const updateValue = (updateCol, entry) => (([products.cols.categoryId.name].includes(entry[0]))
  ? `${updateCol + products.cols[entry[0]].colName} = UUID_TO_BIN(?) ,`
  : `${updateCol + products.cols[entry[0]].colName} = ?,`);

const getQueryParamsForUpdateProduct = ({ productId, dataParams }) => {
  const productEntries = Object.entries(dataParams);
  const queryArgs = [];
  let updateVal = '';

  productEntries.forEach((entry) => {
    updateVal = updateValue(updateVal, entry);
    queryArgs.push(entry[1]);
  });

  updateVal = updateVal.substring(0, updateVal.length - 1);
  queryArgs.push(productId);

  return {
    updateProductCmd: updateProductQuery(updateVal),
    updateProductArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForUpdateProduct,
};
