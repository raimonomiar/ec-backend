const { inventories } = require('../schema');

const deleteInventoryQuery = `
  DELETE FROM ${inventories.table}
  WHERE BIN_TO_UUID(${inventories.cols.inventoryId.colName}) = ?
`;

const getQueryParamsForDeleteInventory = ({ inventoryId }) => {
  const queryArgs = [inventoryId];
  return {
    deleteInventoryCmd: deleteInventoryQuery,
    deleteInventoryArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForDeleteInventory,
};
