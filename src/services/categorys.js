const queryExecutor = require('../queryExecutor');

async function addToCategory(input) {
  const { name } = input;

  const result = await queryExecutor.insertIntoCategoryTable({
    name,
  });
  return result;
}
// async function addToCategory(categoryData) {
//   try {
//     await queryExecutor.insertIntoCategoryTable(categoryData);
//   } catch (error) {
//     logger.error(`Error adding to category: ${error}`);
//     throw new AppError("Error adding to category", 500);
//   }
// }

module.exports = {
  addToCategory,
};
