const { session, cart, products } = require('../schema');

const updateSession = `
  UPDATE ${session.table}
  SET ${session.cols.total.colName} =
    (
      SELECT 
        IFNULL(SUM(
             ${cart.table}.${cart.cols.quantity.colName}
             *
             ${products.table}.${products.cols.price.colName}
        ), 0)
      FROM ${cart.table}
      INNER JOIN ${products.table}
      ON ${products.table}.${products.cols.productId.colName}
         =
         ${cart.table}.${cart.cols.productId.colName}
      WHERE BIN_TO_UUID(${cart.table}.${cart.cols.sessionId.colName}) = ?
    )
  WHERE BIN_TO_UUID(${session.cols.sessionId.colName}) = ?
`;

const getQueryParamsForUpdateSession = (input) => {
  const {
    sessionId,
  } = input;
  const queryArgs = [sessionId, sessionId];
  return {
    updateSessionCmd: updateSession,
    updateSessionArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForUpdateSession,
};
