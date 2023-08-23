/* eslint-disable camelcase */
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
      category_id,
      front_image,
      back_image,
      color,
    } = req.body;

    await productService.updateProduct({
      productId,
      dataParams: {
        name,
        description,
        price,
        category_id,
        front_image,
        back_image,
        color,
      },
    });

    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:categoryId/products/:productId',
    method: 'put',
    middlewares: [
      schemaUpdateProduct,
      responseGenerator,
    ],
  },
];
