const { products } = require('../schema');

const insertIntoProducts = `INSERT INTO ${products.table}(
  ${products.cols.name.colName},
  ${products.cols.description.colName},
  ${products.cols.price.colName},
  ${products.cols.categoryId.colName},
  ${products.cols.frontImage.colName},
  ${products.cols.backImage.colName},
  ${products.cols.createdBy.colName}
  ) VALUES (?, ?, ?, UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?))`;

const getQueryParamsForProducts = (
  input,
) => {
  const {
    name,
    description,
    price,
    categoryId,
    frontImage,
    backImage,
    createdBy,
  } = input;
  const queryArgs = [
    name, description, price, categoryId, frontImage, backImage, createdBy,
  ];
  return {
    insertIntoProductsCmd: insertIntoProducts,
    insertIntoProductsArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForProducts,
};
