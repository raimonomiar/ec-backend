const joi = require('joi');
const validate = require('express-validation');

const schemaUpdateProduct = {
  headers: joi.object({
    authorization: joi.string().regex(/Bearer\s[A-Za-z0-9\-._~+/]+=*/).required(),
  }),
  params: joi.object({
    productId: joi.string().guid().required(),
  }).required(),
  body: joi.object({
    categoryId: joi.string().guid(),
    name: joi.string().max(255),
    description: joi.string(),
    price: joi.number(),
    color: joi.string().max(20),
  }).required(),
};

module.exports = {
  schemaUpdateProduct: validate(schemaUpdateProduct),
};
