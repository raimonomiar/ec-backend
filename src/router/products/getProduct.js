const HttpStatusCode = require('http-status-codes');
const { productService } = require('../../services');
const {
  getProduct: {
    schemaGetProducts,
  },
} = require('../../lib/route-validators');

const getProducts = async (req, res, next) => {
  try {
    const {
      name, sortBy, sortOrder, limit, offset,
    } = req.query;
    const products = await productService.getProducts({
      name, sortBy, sortOrder, limit, offset,
    });
    res.status(HttpStatusCode.OK).send(products);
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
];
