const HttpStatusCode = require('http-status-codes');
const { categoryService } = require('../../services');
const {
  getCategory: { schemaGetCategories },
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

module.exports = [
  {
    route: '/',
    method: 'get',
    middlewares: [schemaGetCategories, getCategories],
  },
];
