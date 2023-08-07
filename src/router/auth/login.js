const { userService } = require('../../services');
const HttpStatusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = 'asdasdasdasd';

const responseGenerator = async (req, res, next) => {
  try {
    const { body } = req;
    const { isValid, userId } = await userService.validatePassword(body);
    if (!isValid) {
      res.status(HttpStatusCode.UNAUTHORIZED).send({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid usernname or password.',
        },
      });
    }

    const authKey = jwt.sign({ userId }, TOKEN_SECRET);
    res.status(HttpStatusCode.OK).send({ authKey });
  } catch (error) {
    next(error);
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
