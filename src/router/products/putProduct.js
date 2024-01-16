const HttpStatusCode = require('http-status-codes');
const { productService } = require('../../services');
const {
  updateProduct: {
    schemaUpdateProduct,
  },
} = require('../../lib/route-validators');

const responseGenerator = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const {
      name,
      description,
      price,
      color,
      categoryId,
    } = req.body;

    const result = await productService.updateProduct({
      productId,
      dataParams: {
        name,
        description,
        price,
        color,
        categoryId,
      },
    });

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
    method: 'put',
    middlewares: [
      schemaUpdateProduct,
      responseGenerator,
    ],
  },
];
