const { category } = require('../schema');

const updateCategory = `
UPDATE ${category.table}
SET ${category.cols.name.colName} = ?
WHERE BIN_TO_UUID(${category.cols.categoryId.colName}) = ?`;

const getQueryParamsForUpdateCategory = ({ categoryId, name }) => {
  const queryArgs = [name, categoryId];
  return {
    updateCategoryNameCmd: updateCategory,
    updateCategoryNameArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForUpdateCategory,
};
