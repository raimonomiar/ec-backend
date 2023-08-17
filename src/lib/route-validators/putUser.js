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
};
