const HttpStatusCode = require('http-status-codes');
const {
  cartService,
} = require('../../services');
const {
  accessValidator: {
    checkAuthToken,
  },
  putCart: {
    schema,
  },
} = require('../../lib/route-validators');

const updateCart = async (req, res, next) => {
  try {
    const {
      quantity,
    } = req.body;
    const { cartId } = req.params;
    await cartService.updateCart({
      cartId,
      quantity,
    });
    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:cartId',
    method: 'put',
    middlewares: [
      schema,
      checkAuthToken,
      updateCart,
    ],
  },
];
