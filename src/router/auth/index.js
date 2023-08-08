const express = require('express');
const login = require('./login');
const resetPassword = require('./resetPassword');

const router = express.Router();
const routesArr = [...login, ...resetPassword];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
