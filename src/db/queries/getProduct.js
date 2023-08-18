const { products } = require('../schema');
const {
  constructOrderByClause,
  constructLimitClause,
} = require('../common');

const selectProductsWIthPagination = `
  SELECT
    count(${products.cols.productId.colName}) as total,
    BIN_TO_UUID(${products.cols.productId.colName}) as ${products.cols.productId.name},
    ${products.cols.name.colName} as ${products.cols.name.name},
    ${products.cols.description.colName} as ${products.cols.description.name},
    ${products.cols.price.colName} as ${products.cols.price.name},
    ${products.cols.frontImage.colName} as ${products.cols.frontImage.name},
    ${products.cols.backImage.colName} as ${products.cols.backImage.name}
  FROM ${products.table}
  GROUP BY ${products.cols.productId.colName}
  `;

const getQueryParamsForProducts = ({
  name, sortBy, sortOrder, limit, offset,
}) => {
  const queryArgs = [limit, offset];
  return {
    selectProductsWIthPaginationCmd: selectProductsWIthPagination
      + constructOrderByClause(sortBy, sortOrder)
      + constructLimitClause,
    selectProductsWIthPaginationArgs: queryArgs,
  };
};
module.exports = {
  getQueryParamsForProducts,
};
