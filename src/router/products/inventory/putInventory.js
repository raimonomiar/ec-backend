const HttpStatusCode = require('http-status-codes');
const { pathOr } = require('ramda');
const upload = require('../../../lib/multer');
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
    const {
      quantity,
      size,
    } = req.body;
    const frontImage = pathOr('', ['frontImage', 0, 'filename'], req.files);
    const backImage = pathOr('', ['backImage', 0, 'filename'], req.files);
    await inventoryService.updateInventory({
      inventoryId,
      dataParams: {
        quantity,
        size,
        frontImage,
        backImage,
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
      upload.fields([
        { name: 'frontImage', maxCount: 1 },
        { name: 'backImage', maxCount: 1 },
      ]),
      schema,
      checkAuthToken,
      responseGenerator,
    ],
  },
];
