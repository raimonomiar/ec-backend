const express = require('express');

const router = express.Router();
const getProduct = require('./getProduct');

const routesArr = [...getProduct];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
