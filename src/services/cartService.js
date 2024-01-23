const { isEmpty, path } = require('ramda');
const queryExecutor = require('../queryExecutor');

function getCart(productId, sessionId) {
  return queryExecutor.getCartItem({
    productId,
    sessionId,
  });
}

async function addCart(input) {
  const {
    sessionId,
    userId,
    productId,
    quantity,
  } = input;
  const cartItem = await getCart(productId, sessionId);
  if (!isEmpty(cartItem)) {
    const cartId = path(['0', 'cartId'], cartItem);
    await queryExecutor.updateCartQuantity({
      cartId,
      quantity,
    });
  } else {
    await queryExecutor.addCartItem({
      sessionId,
      userId,
      productId,
      quantity,
    });
  }
  return queryExecutor.updateCartSession({
    sessionId,
  });
}

module.exports = {
  addCart,
};
