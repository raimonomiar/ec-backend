const { pickBy } = require('ramda');
const queryExecutor = require('../queryExecutor');

async function addInventory(input) {
  const {
    productId,
    quantity,
    size,
  } = input;
  return queryExecutor.insertIntoInventoryTable({
    productId,
    quantity,
    size,
  });
}

async function updateInventory(input) {
  const { inventoryId } = input;
  let {
    dataParams,
  } = input;
  dataParams = pickBy((val) => val !== undefined, dataParams);
  return queryExecutor.updateInventoryTable({
    inventoryId,
    dataParams,
  });
}

module.exports = {
  addInventory,
  updateInventory,
};
