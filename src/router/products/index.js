const express = require('express');

const router = express.Router();
const getProduct = require('./getProduct');
const addProduct = require('./postProduct');
const updateProduct = require('./putProduct');
const deleteProduct = require('./deleteProduct');
const { postInventory, putInventory, deleteInventory } = require('./inventory');

const routesArr = [
  ...getProduct, ...addProduct, ...updateProduct, ...deleteProduct, ...postInventory,
  ...putInventory, ...deleteInventory,
];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
