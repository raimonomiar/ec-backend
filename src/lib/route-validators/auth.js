const joi = require('joi');
const validate = require('express-validation');

const schemaLogin = {
  body: joi.object({
    email: joi.string().email().required().max(100),
    password: joi.string().required(),
  }).required(),
};

const schemaCheckEmail = {
  body: joi.object({
    email: joi.string().email().required().max(100),
  }).required(),
};

module.exports = {
  schemaLogin: validate(schemaLogin),
  schemaCheckEmail: validate(schemaCheckEmail),
};
