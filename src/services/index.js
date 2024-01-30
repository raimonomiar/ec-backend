const userService = require('./users');
const tokenService = require('./tokens');
const productService = require('./products');
const categoryService = require('./categorys');
const inventoryService = require('./inventories');
const sessionService = require('./session');
const cartService = require('./cart');

module.exports = {
  userService,
  tokenService,
  productService,
  categoryService,
  inventoryService,
  sessionService,
  cartService,
};
