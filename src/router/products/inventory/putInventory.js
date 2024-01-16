const HttpStatusCode = require('http-status-codes');
const { inventoryService } = require('../../../services');
const {
  accessValidator: {
    checkAuthToken,
  },
  putInventory: {
    schema,
  },
} = require('../../../lib/route-validators');

const responseGenerator = async (req, res, next) => {
  try {
    const { inventoryId } = req.params;
    const { quantity, size } = req.body;
    await inventoryService.updateInventory({
      inventoryId,
      dataParams: {
        quantity,
        size,
      },
    });
    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:productId/inventory/:inventoryId',
    method: 'put',
    middlewares: [
      checkAuthToken,
      schema,
      responseGenerator,
    ],
  },
];
