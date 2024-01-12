const HttpStatusCode = require('http-status-codes');
const { productService } = require('../../services');
const {
  deleteProduct: {
    schema,
  },
} = require('../../lib/route-validators');

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const result = await productService.deleteProductById(productId);
    if (result.affectedRows === 0) {
      res.status(HttpStatusCode.NOT_FOUND).send();
    }
    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:productId',
    method: 'delete',
    middlewares: [
      schema,
      deleteProduct,
    ],
  },
];
