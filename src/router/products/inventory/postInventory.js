const HttpStatusCode = require('http-status-codes');
const { inventoryService } = require('../../../services');
const {
  accessValidator: {
    checkAuthToken,
  },
  postInventory: {
    schema,
  },
} = require('../../../lib/route-validators');

const responseGenerator = async (req, res, next) => {
  try {
    const { quantity, size } = req.body;
    const { productId } = req.params;
    await inventoryService.addInventory({
      productId,
      quantity,
      size,
    });
    res.status(HttpStatusCode.CREATED).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:productId/inventory',
    method: 'post',
    middlewares: [
      schema,
      checkAuthToken,
      responseGenerator,
    ],
  },
];
