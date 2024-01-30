const { isEmpty, path } = require('ramda');
const queryExecutor = require('../queryExecutor');

function getCart(productId, sessionId, inventoryId) {
  return queryExecutor.getCartItem({
    productId,
    sessionId,
    inventoryId,
  });
}

async function isWithinStockLimit(cartQuantity, quantity, inventoryId) {
  const inventory = await queryExecutor.getInventoryFromTable({ inventoryId });
  return cartQuantity + quantity <= path(['0', 'quantity'], inventory);
}

async function addCart(input) {
  const {
    sessionId,
    userId,
    productId,
    inventoryId,
    quantity,
  } = input;
  const cartItem = await getCart(productId, sessionId, inventoryId);
  if (!isEmpty(cartItem)) {
    if (await isWithinStockLimit(path(['0', 'quantity'], cartItem), quantity, inventoryId)) {
      const cartId = path(['0', 'cartId'], cartItem);
      await queryExecutor.updateCartQuantity({
        cartId,
        quantity,
      });
    } else {
      return false;
    }
  } else {
    await queryExecutor.addCartItem({
      sessionId,
      userId,
      productId,
      inventoryId,
      quantity,
    });
  }
  await queryExecutor.updateCartSession({
    sessionId,
  });
  return true;
}

async function getCarts(input) {
  const { sessionId } = input;
  const cartItems = await queryExecutor.getCartItems({ sessionId });
  const cartSession = await queryExecutor.getCartSession({ sessionId });

  return {
    data: cartItems,
    total: path(['0', 'total'], cartSession),
  };
}

async function updateCart(input) {
  const {
    cartId,
    quantity,
  } = input;

  const session = await queryExecutor.updateCartItem({
    cartId,
    quantity,
  });

  return queryExecutor.updateCartSession({
    sessionId: path(['1', '0', 'sessionId'], session),
  });
}

async function deleteCart(input) {
  const {
    cartId,
  } = input;
  const session = await queryExecutor.deleteCartItem({
    cartId,
  });
  return queryExecutor.updateCartSession({
    sessionId: path(['0', '0', 'sessionId'], session),
  });
}

module.exports = {
  addCart,
  getCarts,
  updateCart,
  deleteCart,
};
