const joi = require('joi');
const validate = require('express-validation');
const HttpStatusCode = require('http-status-codes');
const {
  minPasswordLength,
} = require('config').get('constants');
const { tokenService } = require('../../services');
const {
  authErrors: {
    INVALID_TOKEN: {
      message,
      code,
    },
  },
} = require('../../../constants/errorMaps');

const schemaUpdatePassword = {
  headers: joi.object({
    token: joi.string().required(),
  }),
  params: joi.object({
    userId: joi.string().guid().required(),
  }).required(),
  body: joi.object({
    password: joi.string()
      .min(minPasswordLength)
      .required(),
  }).required(),
};

const schemaUpdateUser = {
  headers: joi.object({
    authorization: joi.string().regex(/Bearer\s[A-Za-z0-9\-._~+/]+=*/).required(),
  }),
  params: joi.object({
    userId: joi.string().guid().required(),
  }).required(),
  body: joi.object({
    firstName: joi.string().max(50),
    lastName: joi.string().max(50),
    street: joi.string().max(100),
    zip: joi.string().max(20),
    phone: joi.string().max(20),
    city: joi.string().max(50),
    appartment: joi.string().max(50),
  }).required(),
};

const validateResetToken = async (req, res, next) => {
  const { headers } = req;
  if (!await tokenService.validateResetToken(headers)) {
    return res.status(HttpStatusCode.UNAUTHORIZED).send({
      error: {
        code,
        message,
      },
    });
  }
  return next();
};

module.exports = {
  schemaUpdatePassword: validate(schemaUpdatePassword),
  validateResetToken,
  schemaUpdateUser: validate(schemaUpdateUser),
};
