const ev = require('express-validation');
const HttpStatusCode = require('http-status-codes');
const { pathOr } = require('ramda');
const { headers } = require('express-mung');
const exceptions = require('./exceptions');
// TODO - add logger

const errorMessageMap = {
  400: 'Bad Request',
  406: 'Not Acceptable',
};

function addFieldErrorDetail(fields, errorDetail, messages) {
  const errorFieldDetail = errorDetail;
  if (!(fields && fields.length)) {
    return;
  }
  const field = fields.shift();
  if (!errorFieldDetail[field]) { errorFieldDetail[field] = {}; }
  if (!fields.length) {
    errorFieldDetail[field] = messages.join(',');
  }
  addFieldErrorDetail(fields, errorFieldDetail[field], messages);
}

function generateErrorResponse(validationError) {
  const error = {};
  error.errorCode = validationError.status;
  error.message = validationError.statusText.replace(/\s/g, '_').toupperCase();
  error.details = {};
  if (validationError.errors && validationError.errors.length) {
    const errorDetails = error.details;
    validationError.errors.forEach((errorDetail) => {
      if (!errorDetails[errorDetail.location]) {
        errorDetails[errorDetail.location] = {};
      }
      addFieldErrorDetail(
        errorDetail.field, errorDetails[errorDetail.location], errorDetail.messages,
      );
    });
    const headersObj = errorDetails.headers;
    if (headersObj !== null) {
      if (Object.keys(headersObj).length === 1
        && Object.keys(headersObj).includes('userId')) {
        error.errorCode = HttpStatusCode.BAD_REQUEST;
        error.message = 'BAD_REQUEST';
      } else {
        error.errorCode = HttpStatusCode.NOT_ACCEPTABLE;
        error.message = 'NOT_ACCEPTABLE';
      }
    }
  }
  return error;
}

function notFoundError() {
  return (req, res, next) => {
    const err = new exceptions.AppError(
      'NOT_FOUND',
      HttpStatusCode.NOT_FOUND,
    );
    next(err);
  };
}

function httpError() {
  return (err, req, res, next) => {
    let error = {};
    let statusCode = '';
    if (err instanceof ev.ValidationError) {
      // TODO logger
      error = generateErrorResponse(err);
    } else if (err instanceof exceptions.AppError) {
      // TODO logger
      error = {
        errorCode: err.status,
        message: err.message,
      };
    } else if (err && err.error && err.error.isJoi) {
      // TODO logger
      const code = err.type === 'headers' ? HttpStatusCode.NOT_ACCEPTABLE
        : HttpStatusCode.BAD_REQUEST;
      error = {
        errorCode: code,
        message: errorMessageMap[code],
      };
      if (err.error.details && err.error.details.length > 0) {
        error.details = {};
        err.error.details.forEach((detail) => {
          error.details[detail.path[0]] = detail.message;
        });
      }
    } else {
      // TODO logger
      error = {
        errorCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: 'INTERNAL_SERVER_ERROR',
      };
    }
    if (err.stack !== null && req.app.get('env') === 'development') {
      error.stack = err.stack;
    }
    statusCode = error.errorCode
      || error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    res.status(statusCode);
    res.json(error);
  };
}

module.exports = {
  notFoundError,
  httpError,
};
