const express = require('express');
const router = express.Router();
const login = require('./login');

const routesArr = [...login];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
