const HttpStatusCode = require('http-status-codes');
const { inventoryService } = require('../../../services');
const {
  accessValidator: {
    checkAuthToken,
  },
  deleteInventory: {
    schema,
  },
} = require('../../../lib/route-validators');

const responseGenerator = async (req, res, next) => {
  try {
    const { inventoryId } = req.params;
    await inventoryService.deleteInventory(inventoryId);
    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:productId/inventory/:inventoryId',
    method: 'delete',
    middlewares: [
      checkAuthToken,
      schema,
      responseGenerator,
    ],
  },
];
