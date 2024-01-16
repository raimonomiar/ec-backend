module.exports = {
  table: 'products',
  cols: {
    productId: { name: 'productId', colName: 'product_id' },
    name: { name: 'name', colName: 'name' },
    description: { name: 'description', colName: 'description' },
    price: { name: 'price', colName: 'price' },
    categoryId: { name: 'categoryId', colName: 'category_id' },
    frontImage: { name: 'frontImage', colName: 'front_image' },
    backImage: { name: 'backImage', colName: 'back_image' },
    color: { name: 'color', colName: 'color' },
    createdBy: { name: 'createdBy', colName: 'created_by' },
    updatedBy: { name: 'updatedBy', colName: 'updated_by' },
    createdAt: { name: 'createdAt', colName: 'created_at' },
    updatedAt: { name: 'updatedAt', colName: 'updated_at' },
  },
};
