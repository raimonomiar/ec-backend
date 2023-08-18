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

module.exports = {
  addToCategory,
  updateCategory,
  deleteCategoryById,
};
