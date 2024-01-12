const postUser = require('./postUser');
const putUser = require('./putUser');
const auth = require('./auth');
const getProduct = require('./getProduct');
const postCategory = require('./postCategory');
const updateCategory = require('./putCategory');
const getCategory = require('./getCategory');
const postProduct = require('./postProduct');
const updateProduct = require('./putProducts');
const deleteProduct = require('./deleteProduct');
const accessValidator = require('./accessValidator');
const postInventory = require('./postInventory');
const putInventory = require('./putInventory');
const deleteInventory = require('./deleteInventory');

module.exports = {
  postUser,
  putUser,
  auth,
  getProduct,
  postCategory,
  updateCategory,
  getCategory,
  postProduct,
  accessValidator,
  updateProduct,
  deleteProduct,
  postInventory,
  putInventory,
  deleteInventory,
};
