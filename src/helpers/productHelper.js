const _ = require('lodash');
const {
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

function filterAndMapProducts(rows) {
  const groupedProducts = _.groupBy(rows, 'productId');

  const products = _.map(groupedProducts, (group) => ({
    productId: group[0].productId,
    name: group[0].name,
    description: group[0].description,
    price: group[0].price,
    inventories: group.map(({ frontImage, backImage }) => ({ frontImage, backImage })),
  }));

  return {
    data: products,
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
