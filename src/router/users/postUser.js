const HttpStatusCode = require('http-status-codes');
const HttpError = require('standard-http-error');
const {
  pathEq,
} = require('ramda');
const {
  ER_DUP_ENTRY,
} = require('config').get('constants');
const { userService } = require('../../services');
const {
  postUser: {
    schema,
  },
} = require('../../lib/route-validators');
const {
  userErrors: {
    CONFLICT: {
      code,
      message,
    },
  },
} = require('../../../constants/errorMaps');

const responseGenerator = async (req, res, next) => {
  try {
    const { body } = req;
    await userService.addUser(body);
    res.status(HttpStatusCode.CREATED).send();
  } catch (error) {
    if (pathEq(['code'], ER_DUP_ENTRY)(error)) {
      const errorObject = new HttpError(HttpStatusCode.CONFLICT, message, {
        errorCode: code,
      });
      next(errorObject);
    } else {
      next(error);
    }
  }
};

module.exports = [
  {
    route: '/',
    method: 'post',
    middlewares: [
      schema,
      responseGenerator,
    ],
  },
];
