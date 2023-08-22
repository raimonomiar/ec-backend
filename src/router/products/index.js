const express = require('express');

const router = express.Router();
const getProduct = require('./getProduct');
const addProduct = require('./postProduct');
const updateProduct = require('./updateProduct');
const deleteProduct = require('./deleteProduct');

const routesArr = [...getProduct, ...addProduct, ...updateProduct, ...deleteProduct];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
