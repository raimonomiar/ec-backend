/* eslint-disable no-unused-vars */
const { products } = require('../schema');

const updateProductQuery = (updateVal) => `
  UPDATE ${products.table}
  SET ${updateVal}
  WHERE BIN_TO_UUID(${products.cols.productId.colName}) = ?`;

const updateValue = (updateCol, entry) => `${updateCol}${entry[0]} = ?,`;

const getQueryParamsForUpdateProduct = ({ productId, dataParams }) => {
  const productEntries = Object.entries(dataParams);
  const queryArgs = [];
  let updateVal = '';

  productEntries.forEach((entry) => {
    updateVal = updateValue(updateVal, entry);
    queryArgs.push(entry[1]);
  });

  // Check if updateVal is empty after processing dataParams
  if (updateVal === '') {
    throw new Error('No update values provided');
  }

  // Remove the trailing comma from updateVal
  updateVal = updateVal.substring(0, updateVal.length - 1);

  // Add the productId as the last query parameter
  queryArgs.push(productId);

  return {
    updateProductCmd: updateProductQuery(updateVal),
    updateProductArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForUpdateProduct,
};

// const { products } = require('../schema');

// const updateProduct = `
// UPDATE ${products.table}
// SET
//     ${products.cols.name.colName} = ?,
//     ${products.cols.description.colName} = ?,
//     ${products.cols.price.colName} = ?,
//     ${products.cols.categoryId.colName} = UUID_TO_BIN(?),
//     ${products.cols.frontImage.colName} = ?,
//     ${products.cols.backImage.colName} = ?,
//     ${products.cols.color.colName} = ?
//   WHERE ${products.cols.productId.colName} = UUID_TO_BIN(?)`;

// const getQueryParamsForUpdateProduct = ({
//   productId,
//   name,
//   description,
//   price,
//   categoryId,
//   frontImage,
//   backImage,
//   color,
// }) => {
//   const queryArgs = [
//     name,
//     description,
//     price,
//     categoryId,
//     frontImage,
//     backImage,
//     color,
//     productId,
//   ];
//   return {
//     updateProductNameCmd: updateProduct,
//     updateProductNameArgs: queryArgs,
//   };
// };

// module.exports = {
//   getQueryParamsForUpdateProduct,
// };
