module.exports = {
  table: 'users',
  cols: {
    userId: { name: 'userId', colName: 'user_id' },
    email: { name: 'email', colName: 'email' },
    firstName: { name: 'firstName', colName: 'first_name' },
    lastName: { name: 'lastName', colName: 'last_name' },
    passwordHash: { name: 'passwordHash', colName: 'password_hash' },
    street: { name: 'street', colName: 'street' },
    zip: { name: 'zip', colName: 'zip' },
    phone: { name: 'phone', colName: 'phone' },
    isAdmin: { name: 'isAdmin', colName: 'is_admin' },
    city: { name: 'city', colName: 'city' },
    appartment: { name: 'appartment', colName: 'appartment' },
    createdAt: { name: 'createdAt', colName: 'created_at' },
    createdBy: { name: 'createdBy', colName: 'created_by' },
    updatedAt: { name: 'updatedAt', colName: 'updated_at' },
    updatedBy: { name: 'udpatedBy', colName: 'updated_by' },
  },
  constraints: {
    isAdmin: [
      1,
      0,
    ],
  },
};