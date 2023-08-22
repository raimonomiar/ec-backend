const { inventories } = require('../schema');

const insertIntoInventories = `INSERT INTO ${inventories.table}(
  ${inventories.cols.productId.colName},
  ${inventories.cols.quantity.colName},
  ${inventories.cols.size.colName}
  ) VALUES (UUID_TO_BIN(?), ?, ?)`;

const getQueryParamsForInventories = (
  input,
) => {
  const {
    productId,
    quantity,
    size,
  } = input;
  const queryArgs = [productId, quantity, size];
  return {
    insertIntoInventoryCmd: insertIntoInventories,
    insertIntoInventoryArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForInventories,
};
