const userService = require('./users');
const tokenService = require('./tokens');
const productService = require('./products');
const categoryService = require('./categorys');
const inventoryService = require('./inventories');
const sessionService = require('./sessionService');
const cartService = require('./cartService');

module.exports = {
  userService,
  tokenService,
  productService,
  categoryService,
  inventoryService,
  sessionService,
  cartService,
};
