const joi = require('joi');
const validate = require('express-validation');
const {
  SORT_ASC,
  SORT_DESC,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} = require('config').get('constants');

const sortByFields = ['name'];

const schemaGetCategories = {
  query: joi.object({
    name: joi.string().max(255),
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

const schemaGetCategory = {
  params: joi.object({
    categoryId: joi.string().guid().required(),
  }).required(),
};

module.exports = {
  schemaGetCategories: validate(schemaGetCategories),
  schemaGetCategory: validate(schemaGetCategory),
};
