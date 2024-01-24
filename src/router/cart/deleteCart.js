const HttpStatusCode = require('http-status-codes');
const {
  cartService,
} = require('../../services');
const {
  accessValidator: {
    checkAuthToken,
  },
  deleteCart: {
    schema,
  },
} = require('../../lib/route-validators');

const deleteCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    await cartService.deleteCart({
      cartId,
    });
    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:cartId',
    method: 'delete',
    middlewares: [
      schema,
      checkAuthToken,
      deleteCart,
    ],
  },
];
