const { products, inventories } = require('../schema');
const {
  constructOrderByClause,
  constructLimitClause,
} = require('../common');

const nameClause = (name) => (name ? `AND ${products.cols.name.colName} LIKE ?` : '');
const categoryIdClause = (categoryId) => (categoryId ? `AND ${products.cols.categoryId.colName} = UUID_TO_BIN(?)` : '');

const selectProductsWIthPagination = (name, categoryId) => `
  SELECT
    BIN_TO_UUID(${products.cols.productId.colName}) as ${products.cols.productId.name},
    ${products.cols.name.colName} as ${products.cols.name.name},
    ${products.cols.description.colName} as ${products.cols.description.name},
    ${products.cols.price.colName} as ${products.cols.price.name},
    ${products.cols.frontImage.colName} as ${products.cols.frontImage.name},
    ${products.cols.backImage.colName} as ${products.cols.backImage.name},
    ${products.cols.color.colName} as ${products.cols.color.name}
  FROM ${products.table}
  WHERE ${products.table}.${products.cols.createdBy.colName} IS NOT NULL
  ${nameClause(name)}
  ${categoryIdClause(categoryId)}`;

const selectProductWithInventory = `
  SELECT
    BIN_TO_UUID(${products.table}.${products.cols.productId.colName}) as ${products.cols.productId.name},
    ${products.cols.name.colName} as ${products.cols.name.name},
    ${products.cols.description.colName} as ${products.cols.description.name},
    ${products.cols.price.colName} as ${products.cols.price.name},
    ${products.cols.frontImage.colName} as ${products.cols.frontImage.name},
    ${products.cols.backImage.colName} as ${products.cols.backImage.name},
    ${products.cols.color.colName} as ${products.cols.color.name},
    BIN_TO_UUID(${products.cols.categoryId.colName}) as ${products.cols.categoryId.name},
    BIN_TO_UUID(${inventories.cols.inventoryId.colName}) as ${inventories.cols.inventoryId.name},
    ${inventories.cols.quantity.colName} as ${inventories.cols.quantity.name},
    ${inventories.cols.size.colName} as ${inventories.cols.size.name},
    ${inventories.cols.sku.colName} as ${inventories.cols.sku.name}
  FROM ${products.table}
  LEFT JOIN ${inventories.table}
  ON ${products.table}.${products.cols.productId.colName} = ${inventories.table}.${inventories.cols.productId.colName}
  WHERE ${products.table}.${products.cols.productId.colName} = UUID_TO_BIN(?)
`;

const selectTotalCount = (name, categoryId) => `
  SELECT COUNT(${products.cols.productId.colName}) as total 
  FROM ${products.table} 
  WHERE ${products.cols.createdBy.colName} IS NOT NULL
  ${nameClause(name)}
  ${categoryIdClause(categoryId)}`;

const getQueryParamsForProducts = ({
  name, categoryId, sortBy, sortOrder, limit, offset,
}) => {
  const queryArgs = [];
  if (name) queryArgs.push(`%${name}%`);
  if (categoryId) queryArgs.push(categoryId);

  queryArgs.push(limit, offset !== 0 ? (offset - 1) * limit : 0);

  return {
    selectProductsWIthPaginationCmd: selectProductsWIthPagination(name, categoryId)
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

const getQueryParamsForProductsTotal = ({
  name, categoryId,
}) => {
  const queryArgs = [];
  if (name) queryArgs.push(`%${name}%`);
  if (categoryId) queryArgs.push(categoryId);

  return {
    selectProductsCountCmd: selectTotalCount(name, categoryId),
    selectProductsCountArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForProducts,
  getQueryParamsForProductWithInventory,
  getQueryParamsForProductsTotal,
};
