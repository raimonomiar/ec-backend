const _ = require('lodash');

const queryTemplate = `
  SELECT 
    password_hash,
    BIN_TO_UUID(user_id) as userId
  FROM users WHERE email = '<%= email %>'`;

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
