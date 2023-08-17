const { tokens } = require('../schema');

const insertIntoTokens = `INSERT INTO ${tokens.table}(
  ${tokens.cols.token.colName},
  ${tokens.cols.userId.colName},
  ${tokens.cols.tokenType.colName}
  ) VALUES (?, UUID_TO_BIN(?), ?)`;

const getQueryParamsForTokens = (
  input,
) => {
  const {
    token,
    userId,
    tokenType,
  } = input;
  const queryArgs = [
    token, userId, tokenType,
  ];
  return {
    insertIntoTokensCmd: insertIntoTokens,
    insertIntoTokensArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForTokens,
};
