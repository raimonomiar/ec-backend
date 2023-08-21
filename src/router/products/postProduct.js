const HttpStatusCode = require('http-status-codes');
const { pathOr } = require('ramda');
const {
  CLS_KEY_USER,
} = require('config').get('constants');
const { productService } = require('../../services');
const upload = require('../../lib/multer');
const {
  accessValidator: {
    checkAuthToken,
  },
  postProduct: {
    schema,
  },
} = require('../../lib/route-validators');
const {
  clsSession,
} = require('../../lib/cls');

const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      color,
      categoryId,
    } = req.body;

    const frontImage = pathOr('', ['frontImage', 0, 'filename'], req.files);
    const backImage = pathOr('', ['backImage', 0, 'filename'], req.files);
    await productService.addProduct({
      name,
      description,
      price,
      categoryId,
      frontImage,
      backImage,
      color,
      createdBy: clsSession.get(CLS_KEY_USER).userId,
    });
    res.status(HttpStatusCode.CREATED).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/',
    method: 'post',
    middlewares: [
      upload.fields([
        { name: 'frontImage', maxCount: 1 },
        { name: 'backImage', maxCount: 1 },
      ]),
      schema,
      checkAuthToken,
      addProduct,
    ],
  },
];
