const express = require('express');

const router = express.Router();
const postCart = require('./postCart');

const routesArr = [
  ...postCart,
];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
