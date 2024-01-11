const { category } = require('../schema');
const {
  constructOrderByClause,
  constructLimitClause,
} = require('../common');

const whereClause = (name) => (name ? `WHERE ${category.cols.name.colName} LIKE ?` : '');

const selectCategoriesWIthPagination = (name) => `
  SELECT
    count(${category.cols.categoryId.colName}) as total,
    BIN_TO_UUID(${category.cols.categoryId.colName}) as ${category.cols.categoryId.name},
    ${category.cols.name.colName} as ${category.cols.name.name}
  FROM ${category.table}
  ${whereClause(name)}
  GROUP BY ${category.cols.categoryId.colName}
`;

const selectCategoryById = `
  SELECT
    BIN_TO_UUID(${category.cols.categoryId.colName}) as ${category.cols.categoryId.name},
    ${category.cols.name.colName} as ${category.cols.name.name}
  FROM ${category.table}
  WHERE BIN_TO_UUID(${category.cols.categoryId.colName}) = ?
`;

const getQueryParamsForCategories = ({
  name, sortBy, sortOrder, limit, offset,
}) => {
  const queryArgs = [];
  if (name) {
    queryArgs.push(`%${name}%`);
  }
  queryArgs.push(limit, offset !== 0 ? (offset - 1) * limit : 0);

  return {
    selectCategoriesWIthPaginationCmd: selectCategoriesWIthPagination(name)
      + constructOrderByClause(sortBy, sortOrder)
      + constructLimitClause,
    selectCategoriesWIthPaginationArgs: queryArgs,
  };
};

const getQueryParamsForCategory = (
  categoryId,
) => {
  const queryArgs = [categoryId];
  return {
    selectCategoryCmd: selectCategoryById,
    selectCategoryArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForCategories,
  getQueryParamsForCategory,
};
