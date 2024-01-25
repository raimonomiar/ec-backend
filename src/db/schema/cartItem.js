module.exports = {
  table: 'cart_item',
  cols: {
    cartId: { name: 'cartId', colName: 'cart_id' },
    sessionId: { name: 'sessionId', colName: 'session_id' },
    productId: { name: 'productId', colName: 'product_id' },
    inventoryId: { name: 'inventoryId', colName: 'inventory_id' },
    quantity: { name: 'quantity', colName: 'quantity' },
    createdBy: { name: 'createdBy', colName: 'created_by' },
    createdAt: { name: 'createdAt', colName: 'created_at' },
    updatedBy: { name: 'updatedBy', colName: 'updated_by' },
    updatedAt: { name: 'updatedAt', colName: 'updated_at' },
  },
};
