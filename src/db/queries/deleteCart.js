const { cart } = require('../schema');

const deleteCartAndReturnSession = `
  SELECT BIN_TO_UUID(${cart.cols.sessionId.colName}) as ${cart.cols.sessionId.name}
  FROM ${cart.table}
  WHERE BIN_TO_UUID(${cart.cols.cartId.colName}) = ?;
  DELETE
  FROM ${cart.table}
  WHERE BIN_TO_UUID(${cart.cols.cartId.colName}) = ?;
`;

const getQueryParamsForDeleteCart = ({
  cartId,
}) => {
  const queryArgs = [cartId, cartId];
  return {
    deleteCartCmd: deleteCartAndReturnSession,
    deleteCartArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForDeleteCart,
};
