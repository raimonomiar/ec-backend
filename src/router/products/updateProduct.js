const HttpStatusCode = require('http-status-codes');
const { productService } = require('../../services');

const updateProduct = async (req, res, next) => {
  try {
    const {
      name, description, price, categoryId, frontImage, backImage, color,
    } = req.body;
    const { productId } = req.params;

    await productService.updateProduct({
      productId,
      name,
      description,
      price,
      categoryId,
      frontImage,
      backImage,
      color,
    });

    res.status(HttpStatusCode.NO_CONTENT).send({
      message: 'Product updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:productId',
    method: 'put',
    middlewares: [updateProduct],
  },
];
