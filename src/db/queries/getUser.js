const _ = require('lodash');
const { users } = require('../schema');

const queryTemplate = `
  SELECT 
    ${users.cols.email.colName},
    BIN_TO_UUID(${users.cols.userId.colName}) as ${users.cols.userId.name},
    ${users.cols.passwordHash.colName} as ${users.cols.passwordHash.name}
  FROM ${users.table} WHERE ${users.cols.email.colName} = '<%= email %>'`;

const queryParamsGenerator = _.template(queryTemplate);

const getQueryParams = (email) => {
  const queryArgs = {};
  const templatePArams = { email };
  const cmd = queryParamsGenerator(templatePArams);
  return {
    cmd,
    args: queryArgs,
  };
};

module.exports = getQueryParams;
