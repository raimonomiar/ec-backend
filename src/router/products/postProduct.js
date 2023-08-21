const HttpStatusCode = require('http-status-codes');
const { productService } = require('../../services');
const upload = require('../../lib/multer');

const addProduct = async (req, res, next) => {
  try {
    const {
      name,

    } = req.body;

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
      addProduct,
    ],
  },
];
