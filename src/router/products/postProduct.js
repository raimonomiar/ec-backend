const HttpStatusCode = require('http-status-codes');
const {
  CLS_KEY_USER,
} = require('config').get('constants');
const { productService } = require('../../services');
const {
  accessValidator: {
    checkAuthToken,
  },
  postProduct: {
    schema,
  },
} = require('../../lib/route-validators');
const {
  clsSession,
} = require('../../lib/cls');

const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      categoryId,
    } = req.body;

    await productService.addProduct({
      name,
      description,
      price,
      categoryId,
      createdBy: clsSession.get(CLS_KEY_USER).userId,
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
      addProduct,
    ],
  },
];
