const { cart, products } = require('../schema');

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

const selectCartItems = `
  SELECT
  BIN_TO_UUID(${cart.table}.${cart.cols.cartId.colName}) as ${cart.cols.cartId.name},
  ${products.table}.${products.cols.name.colName} as ${products.cols.name.name},
  ${products.table}.${products.cols.frontImage.colName} as ${products.cols.frontImage.name},
  ${products.table}.${products.cols.price.colName} as ${products.cols.price.name},
  ${cart.table}.${cart.cols.quantity.colName} as ${cart.cols.quantity.name}
  FROM ${cart.table}
  INNER JOIN ${products.table} 
  ON ${products.table}.${products.cols.productId.colName} = ${cart.table}.${cart.cols.productId.colName}
  WHERE BIN_TO_UUID(${cart.table}.${cart.cols.sessionId.colName}) = ?
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

const getQueryParamsForCarts = ({
  sessionId,
}) => {
  const queryArgs = [sessionId];
  return {
    selectCartItemsCmd: selectCartItems,
    selectCartItemsArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForCart,
  getQueryParamsForCarts,
};
