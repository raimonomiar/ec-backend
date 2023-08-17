module.exports = {
  table: 'tokens',
  cols: {
    token: { name: 'token', colName: 'token' },
    userId: { name: 'userId', colName: 'user_id' },
    createdAt: { name: 'createdAt', colName: 'created_at' },
    tokenType: { name: 'tokenType', colName: 'token_type' },
  },
  constraints: {
    tokenType: [
      'auth',
      'reset',
    ],
  },
};
