const _ = require('lodash');
const { users } = require('../schema');

const queryTemplate = `
  UPDATE ${users.table}
  SET ${users.cols.passwordHash.colName} = '<%= hashPassword %>'
  WHERE BIN_TO_UUID(${users.cols.userId.colName}) = '<%= userId %>'`;

const queryParamsGenerator = _.template(queryTemplate);

const getQueryParamsForPassword = ({ userId, hashPassword }) => {
  const queryArgs = {};
  const templateParams = { userId, hashPassword };
  const cmd = queryParamsGenerator(templateParams);
  return {
    cmd,
    args: queryArgs,
  };
};
module.exports = {
  getQueryParamsForPassword, 
};
