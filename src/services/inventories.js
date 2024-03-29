const {
  pickBy, times, pipe, join, isNil,
} = require('ramda');
const { SKU_LENGTH } = require('config').get('constants');
const queryExecutor = require('../queryExecutor');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const FISH_INITIAL = 'F';

const getRandomChar = () => characters.charAt(Math.floor(Math.random() * characters.length));

const generateSKU = (size) => `${pipe(
  times(getRandomChar),
  join(''),
)(SKU_LENGTH)}-${isNil(size) ? FISH_INITIAL : size}`;

async function addInventory(input) {
  const {
    productId,
    quantity,
    size,
  } = input;
  const sku = generateSKU(size);
  return queryExecutor.insertIntoInventoryTable({
    productId,
    quantity,
    size,
    sku,
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

async function deleteInventory(inventoryId) {
  return queryExecutor.deleteInventoryTable({
    inventoryId,
  });
}

module.exports = {
  addInventory,
  updateInventory,
  deleteInventory,
};
