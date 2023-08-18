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
    sortBy: joi.string()
      .valid(sortByFields)
      .insensitive(),
    sortOrder: joi.string()
      .valid([SORT_ASC, SORT_DESC])
      .insensitive()
      .default(SORT_ASC),
    limit: joi.number().default(DEFAULT_LIMIT),
    offset: joi.number().default(DEFAULT_OFFSET),
  }),
};

module.exports = {
  schemaGetProducts: validate(schemaGetProducts),
};
