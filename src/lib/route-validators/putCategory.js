const joi = require('joi');
const validate = require('express-validation');

const schemaUpdateCategory = {
  params: joi.object({
    categoryId: joi.string().guid().required(),
  }).required(),
  body: joi.object({
    name: joi.string().required(),
  }).required(),
};

module.exports = {
  schemaUpdateCategory: validate(schemaUpdateCategory),
};
