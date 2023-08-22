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

module.exports = {
  addInventory,
};
