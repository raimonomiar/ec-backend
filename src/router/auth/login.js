const jwt = require('jsonwebtoken');
const HttpStatusCode = require('http-status-codes');
const {
  secretKey,
  expiresIn,
} = require('config').get('jwt');
const { userService } = require('../../services');
const {
  authErrors: {
    UNAUTHORIZED,
  },
} = require('../../../constants/errorMaps');
const {
  auth: {
    schemaLogin,
  },
} = require('../../lib/route-validators');

const responseGenerator = async (req, res, next) => {
  try {
    const { body } = req;
    const {
      isValid, userId, email, firstName, lastName,
    } = await userService.validatePassword(body);

    if (!isValid) {
      return res.status(HttpStatusCode.UNAUTHORIZED).send({
        error: UNAUTHORIZED,
      });
    }

    const authKey = jwt.sign({
      userId, email, firstName, lastName,
    }, secretKey, { expiresIn });

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
      schemaLogin,
      responseGenerator,
    ],
  },
];
