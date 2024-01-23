const _ = require('lodash');

const MAP_INVENTORY_COLS = ['inventoryId', 'quantity', 'size', 'sku'];

function filterAndMapProducts(rows, total) {
  return {
    data: rows,
    total,
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
      categoryId: _.head(group).categoryId,
      inventories: _.map(group, (item) => _.pick(item, MAP_INVENTORY_COLS)),
    }))
    .head()
    .value();
}

module.exports = {
  filterAndMapProducts,
  filterAndMapProductsAndInventory,
};
