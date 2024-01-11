const HttpStatusCode = require('http-status-codes');
const { categoryService } = require('../../services');
const {
  getCategory: {
    schemaGetCategories,
    schemaGetCategory,
  },
} = require('../../lib/route-validators');

const getCategories = async (req, res, next) => {
  try {
    const {
      name, sortBy, sortOrder, limit, offset,
    } = req.query;
    const categories = await categoryService.getCategories({
      name,
      sortBy,
      sortOrder,
      limit,
      offset,
    });
    res.status(HttpStatusCode.OK).send(categories);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const [category] = await categoryService.getCategoryById(categoryId);
    if (!category) {
      res.status(HttpStatusCode.NOT_FOUND).send();
    }
    res.status(HttpStatusCode.OK).send(category);
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/',
    method: 'get',
    middlewares: [
      schemaGetCategories,
      getCategories,
    ],
  },
  {
    route: '/:categoryId',
    method: 'get',
    middlewares: [
      schemaGetCategory,
      getCategory,
    ],
  },
];
