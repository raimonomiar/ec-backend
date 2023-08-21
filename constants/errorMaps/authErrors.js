module.exports = {
  UNAUTHORIZED: {
    code: 'INVALID_CREDENTIALS',
    message: 'メールアドレスまたはパスワードが間違っています',
  },
  INVALID_PASSWORD: {
    code: 'INVALID_PASSWORD',
    message: 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number',
  },
  INVALID_TOKEN: {
    code: 'INVALID_TOKEN',
    message: 'トークンが無効です',
  },
  FORBIDDEN: {
    code: 'INSUFFICIENT_PERMISSIONS',
    message: '権限がありません',
  },
};
