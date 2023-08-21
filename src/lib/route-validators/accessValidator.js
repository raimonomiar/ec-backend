const jwt = require('jsonwebtoken');
const HttpStatusCode = require('http-status-codes');
const HttpError = require('standard-http-error');
const {
  jwt: {
    secretKey,
  },
  constants: {
    CLS_KEY_USER,
  },
} = require('config');
const {
  clsSession,
} = require('../cls');
const {
  authErrors: {
    INVALID_TOKEN,
    FORBIDDEN,
  },
} = require('../../../constants/errorMaps');

const checkAuthToken = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    authorization = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(authorization, secretKey);
    clsSession.set(CLS_KEY_USER, decoded);
    next();
  } catch (err) {
    const errorObject = new HttpError(HttpStatusCode.UNAUTHORIZED, INVALID_TOKEN.message, {
      errorCode: INVALID_TOKEN.code,
    });
    next(errorObject);
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const { user } = clsSession.get(CLS_KEY_USER);
    if (user.isAdmin === false) {
      const errorObject = new HttpError(HttpStatusCode.FORBIDDEN, FORBIDDEN.message, {
        errorCode: FORBIDDEN.code,
      });
      next(errorObject);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkAuthToken,
  checkAdmin,
};
