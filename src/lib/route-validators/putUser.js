const joi = require('joi');
const validate = require('express-validation');
const {
  minPasswordLength,
  passwordRegex,
} = require('config').get('constants');

const schemaUpdatePassword = {
  params: joi.object({
    userId: joi.string().guid().required(),
  }).required(),
  body: joi.object({
    password: joi.string()
      .min(minPasswordLength)
      .regex(new RegExp(passwordRegex))
      .required(),
  }).required(),
};

module.exports = {
  schemaUpdatePassword: validate(schemaUpdatePassword),
};
