const joi = require('joi');
const validate = require('express-validation');
const {
  SORT_ASC,
  SORT_DESC,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} = require('config').get('constants');

const sortByFields = [
  'name',
  'price',
];

const schemaGetProducts = {
  query: joi.object({
    name: joi.string().max(255),
    categoryId: joi.string().guid(),
    sortBy: joi.string()
      .valid(sortByFields)
      .insensitive()
      .default(sortByFields[0]),
    sortOrder: joi.string()
      .valid([SORT_ASC, SORT_DESC])
      .insensitive()
      .default(SORT_ASC),
    limit: joi.number().default(DEFAULT_LIMIT),
    offset: joi.number().default(DEFAULT_OFFSET),
  }),
};

const schemaGetProduct = {
  params: joi.object({
    productId: joi.string().guid().required(),
  }).required(),
};

module.exports = {
  schemaGetProducts: validate(schemaGetProducts),
  schemaGetProduct: validate(schemaGetProduct),
};
