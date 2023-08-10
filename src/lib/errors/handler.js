const ev = require('express-validation');
const HttpStatusCode = require('http-status-codes');
const logger = require('../logger');
const exceptions = require('./exceptions');

const errorMessageMap = {
  400: 'BAD_REQUEST',
  406: 'NOT_ACCEPTABLE',
};

/**
 * this function transform a JOI error response into API error response
 * @param {Array} fields - Array of keys
 * @param {Object} errorDetail - errorDetail object
 * @param {Array} messages - array of error message string
 * @returns {void} appends field error detail to errorDetail
 */
function addFieldErrorDetail(fields, errorDetail, messages) {
  const errorFieldDetail = errorDetail;
  if (!(fields && fields.length)) {
    return;
  }
  const field = fields.shift();
  if (!errorFieldDetail[field]) errorFieldDetail[field] = {};
  if (!fields.length) {
    errorFieldDetail[field] = messages.join(',');
  }
  addFieldErrorDetail(fields, errorFieldDetail[field], messages);
}

/**
 * this function transform a JOI error response into API error response
 * @param {Error} validationError - JOI error object
 * @returns {Object} error -
 * API error response generated from array of validation errors
 */
function generateErrorResponse(validationError) {
  const error = {};
  error.code = validationError.statusText.replace(/\s/g, '_').toUpperCase();
  error.message = validationError.message;
  error.details = {};
  if (validationError.errors && validationError.errors.length) {
    const errorDetails = error.details;
    validationError.errors.forEach((err) => {
      if (!errorDetails[err.location]) {
        errorDetails[err.location] = {};
      }
      addFieldErrorDetail(
        err.field, errorDetails[err.location], err.messages,
      );
    });
    const headersObj = errorDetails.headers;
    if (headersObj != null) {
      // if error is only due to missing 'userid'
      // response status code should be 400
      if (Object.keys(headersObj).length === 1
       && Object.keys(headersObj).includes('userid')) {
        error.code = HttpStatusCode.BAD_REQUEST;
        error.message = 'BAD_REQUEST';
      } else {
        error.code = HttpStatusCode.NOT_ACCEPTABLE;
        error.message = 'NOT_ACCEPTABLE';
      }
    }
  }
  return error;
}

/**
 * Returns the 404 handler function
 * @returns {Function} express route handler for forwarding error
 */
function notFoundError() {
  return (req, res, next) => {
    const err = new exceptions.AppError(
      'NOT_FOUND',
      HttpStatusCode.NOT_FOUND,
    );
    next(err);
  };
}
/**
 * Return the generic error handler function
 * @returns {Function} express error handler
 */
function httpError() {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    let error = {};
    let statusCode = '';
    if (err instanceof ev.ValidationError) {
      logger.debug(err);
      error = generateErrorResponse(err);
    } else if (err instanceof exceptions.AppError) {
      logger.debug(err);
      error = {
        code: err.status,
        message: err.message,
      };
    } else if (err && err.error && err.error.isJoi) {
      logger.debug(err);
      const code = err.type === 'headers' ? HttpStatusCode.NOT_ACCEPTABLE
        : HttpStatusCode.BAD_REQUEST;
      error = {
        code,
        message: errorMessageMap[code],
      };
      if (err.error.details && err.error.details.length > 0) {
        error.details = {};
        err.error.details.forEach((detail) => {
          error.details[detail.path[0]] = detail.message;
        });
      }
    } else {
      error = {
        code: err.errorCode,
        message: err.message,
      };
    }
    if (err.stack != null && req.app.get('env') === 'development') {
      error.stack = err.stack;
    }
    statusCode = err.status || err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    res.status(statusCode);
    res.json(error);
  };
}

module.exports = {
  notFoundError,
  httpError,
};
