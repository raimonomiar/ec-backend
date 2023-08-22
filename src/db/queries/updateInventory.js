const { inventories } = require('../schema');

const updateInventoryQuery = (updateVal) => `
  UPDATE ${inventories.table}
  SET ${updateVal}
  WHERE BIN_TO_UUID(${inventories.cols.inventoryId.colName}) = ?`;

const updateValue = (updateCol, entry) => `${updateCol + entry[0]} = ?,`;

const getQueryParamsForInventory = ({ inventoryId, dataParams }) => {
  const inventoryEntries = Object.entries(dataParams);
  const queryArgs = [];
  let updateVal = '';
  inventoryEntries.forEach((entry) => {
    updateVal = updateValue(updateVal, entry);
    queryArgs.push(entry[1]);
  });
  updateVal = updateVal.substring(0, updateVal.length - 1);
  queryArgs.push(inventoryId);

  return {
    updateInventoryCmd: updateInventoryQuery(updateVal),
    updateInventoryArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForInventory,
};
