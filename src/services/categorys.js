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
  await queryExecutor.updateCategoryInTable({
    categoryId, name,
  });
}

async function deleteCategoryById(categoryId) {
  await queryExecutor.deleteCategoryFromTable(categoryId);
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

module.exports = {
  addToCategory,
  updateCategory,
  deleteCategoryById,
  getCategories,
};
