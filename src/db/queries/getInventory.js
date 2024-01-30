const { inventories } = require('../schema');

const selectInvetoryById = `
  SELECT
    BIN_TO_UUID(${inventories.cols.inventoryId.colName}) as ${inventories.cols.inventoryId.name},
    ${inventories.cols.quantity.colName} as ${inventories.cols.quantity.name},
    ${inventories.cols.size.colName} as ${inventories.cols.size.name},
    ${inventories.cols.sku.colName} as ${inventories.cols.sku.name}
   FROM ${inventories.table}
  WHERE BIN_TO_UUID(${inventories.cols.inventoryId.colName}) = ?
`;

const getQueryParamsForInventory = ({
  inventoryId,
}) => {
  const queryArgs = [inventoryId];

  return {
    selectInvetoryByIdCmd: selectInvetoryById,
    selectInvetoryByIdArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForInventory,
};
