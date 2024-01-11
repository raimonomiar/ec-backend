const HttpStatusCode = require('http-status-codes');
const { categoryService } = require('../../services');

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { affectedRows } = await categoryService.deleteCategoryById(categoryId);
    if (affectedRows === 0) {
      res.status(HttpStatusCode.NOT_FOUND).send();
    }
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
