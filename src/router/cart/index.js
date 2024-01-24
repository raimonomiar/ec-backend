const express = require('express');

const router = express.Router();
const postCart = require('./postCart');
const getCart = require('./getCart');
const putCart = require('./putCart');
const deleteCart = require('./deleteCart');

const routesArr = [
  ...postCart, ...getCart, ...putCart, ...deleteCart,
];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
