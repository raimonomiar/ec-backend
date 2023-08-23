const joi = require('joi');
const validate = require('express-validation');

const schemaUpdateProduct = {
  params: joi.object({
    productId: joi.string().guid().required(),
  }).required(),
  body: joi.object({
    name: joi.string().required(),
  }).required(),
};

module.exports = {
  schemaUpdateProduct: validate(schemaUpdateProduct),
};
