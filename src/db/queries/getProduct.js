const { products, inventories } = require('../schema');
const {
  constructOrderByClause,
  constructLimitClause,
} = require('../common');

const whereClause = (name) => (name ? `WHERE ${products.cols.name.colName} LIKE ?` : '');

const selectProductsWIthPagination = (name) => `
  SELECT
    count(${products.cols.productId.colName}) as total,
    BIN_TO_UUID(${products.cols.productId.colName}) as ${products.cols.productId.name},
    ${products.cols.name.colName} as ${products.cols.name.name},
    ${products.cols.description.colName} as ${products.cols.description.name},
    ${products.cols.price.colName} as ${products.cols.price.name},
    ${products.cols.frontImage.colName} as ${products.cols.frontImage.name},
    ${products.cols.backImage.colName} as ${products.cols.backImage.name}
  FROM ${products.table}
  ${whereClause(name)}
  GROUP BY ${products.cols.productId.colName}
  `;

const selectProductWithInventory = `
  SELECT
    BIN_TO_UUID(${products.table}.${products.cols.productId.colName}) as ${products.cols.productId.name},
    ${products.cols.name.colName} as ${products.cols.name.name},
    ${products.cols.description.colName} as ${products.cols.description.name},
    ${products.cols.price.colName} as ${products.cols.price.name},
    ${products.cols.frontImage.colName} as ${products.cols.frontImage.name},
    ${products.cols.backImage.colName} as ${products.cols.backImage.name},
    BIN_TO_UUID(${inventories.cols.inventoryId.colName}) as ${inventories.cols.inventoryId.name},
    ${inventories.cols.quantity.colName} as ${inventories.cols.quantity.name},
    ${inventories.cols.size.colName} as ${inventories.cols.size.name},
    ${inventories.cols.color.colName} as ${inventories.cols.color.name}
  FROM ${products.table}
  INNER JOIN ${inventories.table}
  ON ${products.table}.${products.cols.productId.colName} = ${inventories.table}.${inventories.cols.productId.colName}
  WHERE ${products.table}.${products.cols.productId.colName} = UUID_TO_BIN(?)
`;

const getQueryParamsForProducts = ({
  name, sortBy, sortOrder, limit, offset,
}) => {
  const queryArgs = [];
  if (name) {
    queryArgs.push(`%${name}%`);
  }
  queryArgs.push(limit, (offset - 1) * limit);

  return {
    selectProductsWIthPaginationCmd: selectProductsWIthPagination(name)
      + constructOrderByClause(sortBy, sortOrder)
      + constructLimitClause,
    selectProductsWIthPaginationArgs: queryArgs,
  };
};

const getQueryParamsForProductWithInventory = (productId) => {
  const queryArgs = [productId];
  return {
    selectProductWithInventoryCmd: selectProductWithInventory,
    selectProductWithInventoryArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForProducts,
  getQueryParamsForProductWithInventory,
};
