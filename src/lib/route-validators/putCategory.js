const joi = require('joi');
const validate = require('express-validation');
// const HttpStatusCode = require('http-status-codes');
// const {
//   minPasswordLength,
// } = require('config').get('constants');
// const {
//   authErrors: {
//     INVALID_TOKEN: {
//       message,
//       code,
//     },
//   },
// } = require('../../../constants/errorMaps');

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
