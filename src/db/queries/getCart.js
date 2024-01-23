const { cart } = require('../schema');

const selectCartItem = `
  SELECT
  BIN_TO_UUID(${cart.cols.cartId.colName}) as ${cart.cols.cartId.name},
  BIN_TO_UUID(${cart.cols.sessionId.colName}) as ${cart.cols.sessionId.name},
  BIN_TO_UUID(${cart.cols.productId.colName}) as ${cart.cols.productId.name},
  ${cart.cols.quantity.colName} as ${cart.cols.quantity.name}
  FROM ${cart.table}
  WHERE BIN_TO_UUID(${cart.cols.sessionId.colName}) = ?
  AND BIN_TO_UUID(${cart.cols.productId.colName}) = ?
`;

const getQueryParamsForCart = ({
  sessionId,
  productId,
}) => {
  const queryArgs = [sessionId, productId];
  return {
    selectCartItemCmd: selectCartItem,
    selectCartItemArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForCart,
};
