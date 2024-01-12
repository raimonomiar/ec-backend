const _ = require('lodash');
const {
  map,
  omit,
  isEmpty,
} = require('ramda');

const MAP_INVENTORY_COLS = [
  'inventoryId',
  'quantity',
  'size',
  'sku',
  'color',
  'frontImage',
  'backImage',
];

function filterAndMapProducts(rows, keyToFilter) {
  return {
    data: map(omit(keyToFilter), rows),
    total: rows[0] && rows[0].total,
  };
}

function filterAndMapProductsAndInventory(rows) {
  return isEmpty(rows) ? rows : _.chain(rows)
    .groupBy('productId')
    .values()
    .map((group) => ({
      productId: _.head(group).productId,
      name: _.head(group).name,
      description: _.head(group).description,
      price: _.head(group).price,
      inventories: _.head(group).inventoryId === null
        ? [] : _.map(group, (item) => _.pick(item, MAP_INVENTORY_COLS)),
    }));
}

module.exports = {
  filterAndMapProducts,
  filterAndMapProductsAndInventory,
};
