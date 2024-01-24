const joi = require('joi');
const validate = require('express-validation');

const schema = {
  params: joi.object({
    cartId: joi.string().guid().required(),
  }).required(),
};

module.exports = {
  schema: validate(schema),
};
