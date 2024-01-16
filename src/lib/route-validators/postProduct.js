const joi = require('joi');
const validate = require('express-validation');

const schema = {
  headers: joi.object({
    authorization: joi.string().regex(/Bearer\s[A-Za-z0-9\-._~+/]+=*/).required(),
  }),
  body: joi.object({
    categoryId: joi.string().guid().required(),
    name: joi.string().max(255).required(),
    description: joi.string().required(),
    price: joi.number().required(),
    color: joi.string().max(20).required(),
  }).required(),
};

module.exports = {
  schema: validate(schema),
};
