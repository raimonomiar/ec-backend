const { tokens } = require('../schema');

const selectToken = `
  SELECT 
    COUNT(${tokens.cols.userId.colName}) as count
  FROM ${tokens.table}
  WHERE ${tokens.cols.token.colName} = ?
  AND TIMESTAMPDIFF(SECOND, ${tokens.cols.createdAt.colName}, NOW()) <= ?`;

const getTokenQueryParams = ({ token, tokenExpirationTime }) => {
  const queryArgs = [token, tokenExpirationTime];

  return {
    selectTokenCmd: selectToken,
    selectTokenArgs: queryArgs,
  };
};

module.exports = getTokenQueryParams;
