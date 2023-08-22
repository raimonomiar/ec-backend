const express = require('express');

const router = express.Router();
const getProduct = require('./getProduct');
const addProduct = require('./postProduct');
const { postInventory, putInventory, deleteInventory } = require('./inventory');

const routesArr = [
  ...getProduct, ...addProduct, ...postInventory, ...putInventory, ...deleteInventory,
];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
