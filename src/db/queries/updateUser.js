const { users } = require('../schema');

const updatePassword = `
  UPDATE ${users.table}
  SET ${users.cols.passwordHash.colName} = ?
  WHERE BIN_TO_UUID(${users.cols.userId.colName}) = ?`;

const getQueryParamsForPassword = ({ userId, hashPassword }) => {
  const queryArgs = [hashPassword, userId];
  return {
    updatePasswordCmd: updatePassword,
    updatePasswordArgs: queryArgs,
  };
};
module.exports = {
  getQueryParamsForPassword,
};
