const { category } = require('../schema');

const insertIntoCategory = `INSERT INTO ${category.table}(
  ${category.cols.name.colName}
) VALUES (?)`;

const getQueryParamsForCategory = (input) => {
  const { name } = input;

  const queryArgs = [name];
  return {
    insertIntoCategoryCmd: insertIntoCategory,
    insertIntoCategoryArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForCategory,
};
