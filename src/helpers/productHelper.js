const _ = require('lodash');
const {
  map,
  omit,
} = require('ramda');

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
      inventories: _.map(group, (item) => _.pick(item, ['inventoryId', 'quantity', 'size', 'color'])),
    }));
}

module.exports = {
  filterAndMapProducts,
  filterAndMapProductsAndInventory,
};
