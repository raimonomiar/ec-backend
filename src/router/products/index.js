const express = require('express');

const router = express.Router();
const getProduct = require('./getProduct');
const addProduct = require('./postProduct');
const { postInventory, putInventory } = require('./inventory');

const routesArr = [...getProduct, ...addProduct, ...postInventory, ...putInventory];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
