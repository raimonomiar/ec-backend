const { cart } = require('../schema');

const updateCartQuantity = `
  UPDATE ${cart.table}
  SET ${cart.cols.quantity.colName} = ${cart.cols.quantity.colName} + ?
  WHERE BIN_TO_UUID(${cart.cols.cartId.colName}) = ?
`;

const updateCartAndSelectSessionId = `
  UPDATE ${cart.table}
  SET ${cart.cols.quantity.colName} = ?
  WHERE BIN_TO_UUID(${cart.cols.cartId.colName}) = ?;
  SELECT BIN_TO_UUID(${cart.cols.sessionId.colName}) as ${cart.cols.sessionId.name}
  FROM ${cart.table}
  WHERE BIN_TO_UUID(${cart.cols.cartId.colName}) = ?;
`;

const getQueryParamsForUpdateQuantity = ({
  cartId, quantity,
}) => {
  const queryArgs = [quantity, cartId];
  return {
    updateCartQuantityCmd: updateCartQuantity,
    updateInventoryArgs: queryArgs,
  };
};

const getQueryParamsForUpdateCart = ({
  cartId, quantity,
}) => {
  const queryArgs = [quantity, cartId, cartId];
  return {
    updateCartCmd: updateCartAndSelectSessionId,
    updateCartArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForUpdateQuantity,
  getQueryParamsForUpdateCart,
};
