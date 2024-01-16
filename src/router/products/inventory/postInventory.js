const HttpStatusCode = require('http-status-codes');
const { pathOr } = require('ramda');
const upload = require('../../../lib/multer');
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
    const {
      quantity,
      size,
    } = req.body;
    const { productId } = req.params;
    const frontImage = pathOr('', ['frontImage', 0, 'filename'], req.files);
    const backImage = pathOr('', ['backImage', 0, 'filename'], req.files);
    await inventoryService.addInventory({
      productId,
      quantity,
      size,
      frontImage,
      backImage,
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
