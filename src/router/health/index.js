const express = require('express');
const router = express.Router();
const checkHealth = require('./checkHealth');

const routesArr = [...checkHealth];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
