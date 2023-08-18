const express = require('express');

const router = express.Router();
const postCategory = require('./postCategory');

const routesArr = [...postCategory];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
