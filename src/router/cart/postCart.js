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

const addCart = async (req, res, next) => {
  try {
    const {
      quantity,
      productId,
      inventoryId,
    } = req.body;
    const { userId } = clsSession.get(CLS_KEY_USER);
    const sessionId = await sessionService.getSessionId(userId);
    await cartService.addCart({
      sessionId,
      productId,
      inventoryId,
      quantity,
      userId,
    });
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
