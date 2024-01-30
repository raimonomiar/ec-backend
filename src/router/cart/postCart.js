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
  postCart: {
    schema,
  },
} = require('../../lib/route-validators');
const {
  clsSession,
} = require('../../lib/cls');

const {
  cartErrors: {
    LIMIT_EXCEEDED,
  },
} = require('../../../constants/errorMaps');

const addCart = async (req, res, next) => {
  try {
    const {
      quantity,
      productId,
      inventoryId,
    } = req.body;
    const { userId } = clsSession.get(CLS_KEY_USER);
    const sessionId = await sessionService.getSessionId(userId);
    const isCartAdded = await cartService.addCart({
      sessionId,
      productId,
      inventoryId,
      quantity,
      userId,
    });
    if (!isCartAdded) {
      res.status(HttpStatusCode.TOO_MANY_REQUESTS).send(LIMIT_EXCEEDED);
    }
    res.status(HttpStatusCode.CREATED).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/',
    method: 'post',
    middlewares: [
      schema,
      checkAuthToken,
      addCart,
    ],
  },
];
