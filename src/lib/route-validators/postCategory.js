const joi = require('joi');
const validate = require('express-validation');

const schema = {
  body: joi
    .object({
      name: joi.string().max(50),
    })
    .required(),
};

module.exports = {
  schema: validate(schema),
};
