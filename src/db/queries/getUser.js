const { users } = require('../schema');

const selectUserByEmail = `
  SELECT 
    BIN_TO_UUID(${users.cols.userId.colName}) as ${users.cols.userId.name},
    ${users.cols.firstName.colName} as ${users.cols.firstName.name},
    ${users.cols.lastName.colName} as ${users.cols.lastName.name},
    ${users.cols.passwordHash.colName} as ${users.cols.passwordHash.name}
  FROM ${users.table} WHERE ${users.cols.email.colName} = ?`;

const getQueryParams = (email) => {
  const queryArgs = [email];

  return {
    selectUserByEmailCmd: selectUserByEmail,
    selectUserByEmailArgs: queryArgs,
  };
};

module.exports = getQueryParams;
