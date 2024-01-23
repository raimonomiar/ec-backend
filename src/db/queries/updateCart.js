const { cart } = require('../schema');

const updateCartQuantity = `
  UPDATE ${cart.table}
  SET ${cart.cols.quantity.colName} = ${cart.cols.quantity.colName} + ?
  WHERE BIN_TO_UUID(${cart.cols.cartId.colName}) = ?
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

module.exports = {
  getQueryParamsForUpdateQuantity,
};
