const HttpStatusCode = require('http-status-codes');
const {
  CLS_KEY_USER,
} = require('config').get('constants');
const {
  cartService,
  sessionService,
} = require('../../services');
const {
  accessValidator: {
    checkAuthToken,
  },
  getCart: {
    schema,
  },
} = require('../../lib/route-validators');
const {
  clsSession,
} = require('../../lib/cls');

const getCarts = async (req, res, next) => {
  try {
    const { userId } = clsSession.get(CLS_KEY_USER);
    const sessionId = await sessionService.getSessionId(userId);
    const carts = await cartService.getCarts({
      sessionId,
    });
    res.status(HttpStatusCode.OK).send(carts);
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/',
    method: 'get',
    middlewares: [
      schema,
      checkAuthToken,
      getCarts,
    ],
  },
];
