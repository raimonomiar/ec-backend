const { products } = require('../schema');

const updateProduct = `
UPDATE ${products.table}
SET
    ${products.cols.name.colName} = ?,
    ${products.cols.description.colName} = ?,
    ${products.cols.price.colName} = ?,
    ${products.cols.categoryId.colName} = UUID_TO_BIN(?),
    ${products.cols.frontImage.colName} = ?,
    ${products.cols.backImage.colName} = ?,
    ${products.cols.color.colName} = ?
  WHERE ${products.cols.productId.colName} = UUID_TO_BIN(?)`;

const getQueryParamsForUpdateProduct = ({
  productId,
  name,
  description,
  price,
  categoryId,
  frontImage,
  backImage,
  color,
}) => {
  const queryArgs = [
    name,
    description,
    price,
    categoryId,
    frontImage,
    backImage,
    color,
    productId,
  ];
  return {
    updateProductNameCmd: updateProduct,
    updateProductNameArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForUpdateProduct,
};
