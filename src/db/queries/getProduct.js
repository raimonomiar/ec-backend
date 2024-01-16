const { products, inventories } = require('../schema');
const {
  constructOrderByClause,
  constructLimitClause,
} = require('../common');

const nameClause = (name) => (name ? `AND ${products.cols.name.colName} LIKE ?` : '');
const categoryIdClause = (categoryId) => (categoryId ? `AND ${products.cols.categoryId.colName} = UUID_TO_BIN(?)` : '');

const selectProductsWIthPagination = (name, categoryId) => `
  SELECT
    P.total,
    BIN_TO_UUID(PO.${products.cols.productId.colName}) as ${products.cols.productId.name},
    ${products.cols.name.colName} as ${products.cols.name.name},
    ${products.cols.description.colName} as ${products.cols.description.name},
    ${products.cols.price.colName} as ${products.cols.price.name},
    ${products.cols.color.colName} as ${products.cols.color.name},
    ${inventories.cols.frontImage.colName} as ${inventories.cols.frontImage.name},
    ${inventories.cols.backImage.colName} as ${inventories.cols.backImage.name}
  FROM ${products.table} as PO
  LEFT JOIN ${inventories.table} as I
  ON PO.${products.cols.productId.colName} = I.${inventories.cols.productId.colName},
    (SELECT COUNT(${products.cols.productId.colName}) as total 
    FROM ${products.table} WHERE ${products.cols.createdBy.colName} IS NOT NULL) as P
  WHERE PO.${products.cols.createdBy.colName} IS NOT NULL
  ${nameClause(name)}
  ${categoryIdClause(categoryId)}`;

const selectProductWithInventory = `
  SELECT
    BIN_TO_UUID(${products.table}.${products.cols.productId.colName}) as ${products.cols.productId.name},
    ${products.cols.name.colName} as ${products.cols.name.name},
    ${products.cols.description.colName} as ${products.cols.description.name},
    ${products.cols.price.colName} as ${products.cols.price.name},
    ${products.cols.color.colName} as ${products.cols.color.name},
    BIN_TO_UUID(${inventories.cols.inventoryId.colName}) as ${inventories.cols.inventoryId.name},
    ${inventories.cols.quantity.colName} as ${inventories.cols.quantity.name},
    ${inventories.cols.size.colName} as ${inventories.cols.size.name},
    ${inventories.cols.sku.colName} as ${inventories.cols.sku.name},
    ${inventories.cols.frontImage.colName} as ${inventories.cols.frontImage.name},
    ${inventories.cols.backImage.colName} as ${inventories.cols.backImage.name}
  FROM ${products.table}
  LEFT JOIN ${inventories.table}
  ON ${products.table}.${products.cols.productId.colName} = ${inventories.table}.${inventories.cols.productId.colName}
  WHERE ${products.table}.${products.cols.productId.colName} = UUID_TO_BIN(?)
`;

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

module.exports = {
  getQueryParamsForProducts,
  getQueryParamsForProductWithInventory,
};
