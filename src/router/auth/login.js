const jwt = require('jsonwebtoken');
const HttpStatusCode = require('http-status-codes');
const { userService } = require('../../services');

const TOKEN_SECRET = 'asdasdasdasd';

const responseGenerator = async (req, res, next) => {
  try {
    const { body } = req;
    const {
      isValid, userId, email, firstName, lastName,
    } = await userService.validatePassword(body);

    if (!isValid) {
      return res.status(HttpStatusCode.UNAUTHORIZED).send({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid usernname or password.',
        },
      });
    }

    const authKey = jwt.sign({
      userId, email, firstName, lastName,
    }, TOKEN_SECRET);

    return res.status(HttpStatusCode.OK).send({ authKey });
  } catch (error) {
    return next(error);
  }
};

module.exports = [
  {
    route: '/login',
    method: 'post',
    middlewares: [
      responseGenerator,
    ],
  },
];
