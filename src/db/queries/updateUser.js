const { users } = require('../schema');

const updatePassword = `
  UPDATE ${users.table}
  SET ${users.cols.passwordHash.colName} = ?
  WHERE BIN_TO_UUID(${users.cols.userId.colName}) = ?
`;

const updateUser = (updateVal) => `
  UPDATE ${users.table}
  SET ${updateVal}
  WHERE BIN_TO_UUID(${users.cols.userId.colName}) = ?
`;

const updateValue = (updateCol, entry) => `${updateCol + users.cols[entry[0]].colName} = ?,`;

const getQueryParamsForUpdateUser = ({ userId, dataParams }) => {
  const userEntries = Object.entries(dataParams);
  const queryArgs = [];
  let updateVal = '';

  userEntries.forEach((entry) => {
    updateVal = updateValue(updateVal, entry);
    queryArgs.push(entry[1]);
  });

  updateVal = updateVal.substring(0, updateVal.length - 1);
  queryArgs.push(userId);

  return {
    updateUserCmd: updateUser(updateVal),
    updateUserArgs: queryArgs,
  };
};

const getQueryParamsForPassword = ({ userId, hashPassword }) => {
  const queryArgs = [hashPassword, userId];
  return {
    updatePasswordCmd: updatePassword,
    updatePasswordArgs: queryArgs,
  };
};
module.exports = {
  getQueryParamsForPassword,
  getQueryParamsForUpdateUser,
};
