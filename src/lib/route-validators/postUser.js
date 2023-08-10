const joi = require('joi');
const validate = require('express-validation');
const {
  minPasswordLength,
  passwordRegex,
} = require('config').get('constants');

const schema = {
  body: joi.object({
    email: joi.string().email().required().max(100),
    firstName: joi.string().required().max(50),
    lastName: joi.string().required().max(50),
    password: joi.string()
      .min(minPasswordLength)
      .regex(new RegExp(passwordRegex))
      .required(),
    street: joi.string().max(100),
    zip: joi.string().max(20),
    phone: joi.string().max(20),
    isAdmin: joi.boolean(),
    city: joi.string().max(50),
    appartment: joi.string().max(50),
  }).required(),
};

module.exports = {
  schema: validate(schema),
};
