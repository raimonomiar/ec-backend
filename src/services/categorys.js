const { categoryHelper } = require('../helpers');
const queryExecutor = require('../queryExecutor');

async function addToCategory(input) {
  const { name } = input;

  const result = await queryExecutor.insertIntoCategoryTable({
    name,
  });
  return result;
}

async function updateCategory(input) {
  const { categoryId, name } = input;
  return queryExecutor.updateCategoryInTable({
    categoryId, name,
  });
}

function deleteCategoryById(categoryId) {
  return queryExecutor.deleteCategoryFromTable(categoryId);
}

async function getCategories(queryParams = {}) {
  const {
    name,
    sortBy,
    sortOrder,
    limit,
    offset,
  } = queryParams;
  const rows = await queryExecutor.getCategories({
    name, sortBy, sortOrder, limit, offset,
  });
  const categories = categoryHelper.filterAndMapCategories(rows, ['total']);
  return categories;
}

async function getCategoryById(categoryId) {
  return queryExecutor.getCategoryFromTable(categoryId);
}

module.exports = {
  addToCategory,
  updateCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
};
