const HttpStatusCode = require('http-status-codes');
const { productService } = require('../../services');
const {
  getProduct: {
    schemaGetProducts,
    schemaGetProduct,
  },
} = require('../../lib/route-validators');

const getProducts = async (req, res, next) => {
  try {
    const {
      name, categoryId, sortBy, sortOrder, limit, offset,
    } = req.query;
    const products = await productService.getProducts({
      name, categoryId, sortBy, sortOrder, limit, offset,
    });
    res.status(HttpStatusCode.OK).send(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productService.getProductWithInventories({ productId });
    res.status(HttpStatusCode.OK).send(product);
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/',
    method: 'get',
    middlewares: [
      schemaGetProducts,
      getProducts,
    ],
  },
  {
    route: '/:productId',
    method: 'get',
    middlewares: [
      schemaGetProduct,
      getProduct,
    ],
  },
];
