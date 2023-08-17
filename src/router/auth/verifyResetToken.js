const HttpStatusCode = require('http-status-codes');
const { tokenService } = require('../../services');
const {
  authErrors: {
    INVALID_TOKEN: {
      code,
      message,
    },
  },
} = require('../../../constants/errorMaps');

const responseGenerator = async (req, res, next) => {
  try {
    const { body } = req;
    if (!await tokenService.validateResetToken(body)) {
      return res.status(HttpStatusCode.UNAUTHORIZED).send({
        error: {
          code,
          message,
        },
      });
    }
    return res.status(HttpStatusCode.OK).send();
  } catch (error) {
    return next(error);
  }
};

module.exports = [
  {
    route: '/verifyResetToken',
    method: 'post',
    middlewares: [
      responseGenerator,
    ],
  },
];
