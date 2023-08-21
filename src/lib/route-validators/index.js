const postUser = require('./postUser');
const putUser = require('./putUser');
const auth = require('./auth');
const getProduct = require('./getProduct');
const postCategory = require('./postCategory');
const updateCategory = require('./putCategory');
const postProduct = require('./postProduct');
const accessValidator = require('./accessValidator');

module.exports = {
  postUser,
  putUser,
  auth,
  getProduct,
  postCategory,
  updateCategory,
  postProduct,
  accessValidator,
};
