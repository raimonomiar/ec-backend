const joi = require('joi');
const validate = require('express-validation');
const {
  SORT_ASC,
  SORT_DESC,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} = require('config').get('constants');

const sortByFields = [
  'firstName',
  'lastName',
  'email',
];

const schemaGetUsers = {
  headers: joi.object({
    authorization: joi.string().regex(/Bearer\s[A-Za-z0-9\-._~+/]+=*/).required(),
  }),
  query: joi.object({
    search: joi.string().max(255),
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

const schemaGetUser = {
  params: joi.object({
    userId: joi.string().guid().required(),
  }).required(),
};

module.exports = {
  schemaGetUsers: validate(schemaGetUsers),
  schemaGetUser: validate(schemaGetUser),
};
