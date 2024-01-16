module.exports = {
  table: 'products',
  cols: {
    productId: { name: 'productId', colName: 'product_id' },
    name: { name: 'name', colName: 'name' },
    description: { name: 'description', colName: 'description' },
    price: { name: 'price', colName: 'price' },
    color: { name: 'color', colName: 'color' },
    categoryId: { name: 'categoryId', colName: 'category_id' },
    createdBy: { name: 'createdBy', colName: 'created_by' },
    updatedBy: { name: 'updatedBy', colName: 'updated_by' },
    createdAt: { name: 'createdAt', colName: 'created_at' },
    updatedAt: { name: 'updatedAt', colName: 'updated_at' },
  },
};
