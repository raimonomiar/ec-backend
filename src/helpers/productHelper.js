const _ = require('lodash');
const {
  map,
  omit,
} = require('ramda');

const MAP_INVENTORY_COLS = ['inventoryId', 'quantity', 'size'];

function filterAndMapProducts(rows, keyToFilter) {
  return {
    data: map(omit(keyToFilter), rows),
    total: rows[0] && rows[0].total,
  };
}

function filterAndMapProductsAndInventory(rows) {
  return _.chain(rows)
    .groupBy('productId')
    .values()
    .map((group) => ({
      productId: _.head(group).productId,
      name: _.head(group).name,
      description: _.head(group).description,
      price: _.head(group).price,
      frontImage: _.head(group).frontImage,
      backImage: _.head(group).backImage,
      color: _.head(group).color,
      inventories: _.map(group, (item) => _.pick(item, MAP_INVENTORY_COLS)),
    }));
}

module.exports = {
  filterAndMapProducts,
  filterAndMapProductsAndInventory,
};
