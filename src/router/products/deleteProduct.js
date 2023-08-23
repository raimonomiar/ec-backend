const HttpStatusCode = require('http-status-codes');
const { productService } = require('../../services');

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await productService.deleteProductById(productId);
    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:productId',
    method: 'delete',
    middlewares: [deleteProduct],
  },
];
