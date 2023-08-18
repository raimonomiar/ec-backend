const HttpStatusCode = require('http-status-codes');
const { categoryService } = require('../../services');

const updateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    await categoryService.updateCategory({ categoryId, name });
    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:categoryId',
    method: 'put',
    middlewares: [updateCategory,
    ],
  },
];
