const joi = require('joi');
const validate = require('express-validation');

const schema = {
  headers: joi.object({
    authorization: joi.string().regex(/Bearer\s[A-Za-z0-9\-._~+/]+=*/).required(),
  }),
};

module.exports = {
  schema: validate(schema),
};
