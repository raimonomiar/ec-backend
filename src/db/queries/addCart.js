const { cart } = require('../schema');

const insertIntoCart = `INSERT INTO ${cart.table}(
  ${cart.cols.sessionId.colName},
  ${cart.cols.quantity.colName},
  ${cart.cols.productId.colName},
  ${cart.cols.createdBy.colName}
) VALUES (UUID_TO_BIN(?), ?, UUID_TO_BIN(?), UUID_TO_BIN(?))`;

const getQueryParamsForAddCart = (input) => {
  const {
    sessionId,
    quantity,
    productId,
    userId,
  } = input;
  const queryArgs = [sessionId, quantity, productId, userId];
  return {
    insertIntoCartCmd: insertIntoCart,
    insertIntoCartArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForAddCart,
};
