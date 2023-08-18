const HttpStatusCode = require('http-status-codes');
const { categoryService } = require('../../services');

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await categoryService.deleteCategoryById(categoryId);
    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:categoryId',
    method: 'delete', // Use DELETE method for category deletion
    middlewares: [deleteCategory],
  },
];
