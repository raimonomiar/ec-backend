const { session } = require('../schema');

const insertSession = `
  INSERT INTO ${session.table}(
  ${session.cols.userId.colName},
  ${session.cols.total.colName}
  )
  VALUES(UUID_TO_BIN(?), ?)
`;

const getQueryParamsForAddSession = (input) => {
  const { userId, initialTotal } = input;
  const queryArgs = [userId, initialTotal];
  return {
    insertSessionCmd: insertSession,
    insertSessionArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForAddSession,
};
