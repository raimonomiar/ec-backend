module.exports = {
  table: 'inventories',
  cols: {
    inventoryId: { name: 'inventoryId', colName: 'inventory_id' },
    productId: { name: 'productId', colName: 'product_id' },
    quantity: { name: 'quantity', colName: 'quantity' },
    size: { name: 'size', colName: 'size' },
    sku: { name: 'sku', colName: 'sku' },
    frontImage: { name: 'frontImage', colName: 'front_image' },
    backImage: { name: 'backImage', colName: 'back_image' },
    color: { name: 'color', colName: 'color' },
    createdAt: { name: 'createdAt', colName: 'created_at' },
    updatedAt: { name: 'updatedAt', colName: 'updated_at' },
  },
};
