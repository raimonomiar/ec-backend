const { category } = require('../schema');

const deleteCategory = `
DELETE FROM ${category.table}
WHERE BIN_TO_UUID(${category.cols.categoryId.colName}) = ?`;

const getQueryParamsForDeleteCategory = (categoryId) => {
  const queryArgs = [categoryId];
  return {
    deleteCategoryNameCmd: deleteCategory,
    deleteCategoryNameArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForDeleteCategory,
};
