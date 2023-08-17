const express = require('express');
const login = require('./login');
const resetPassword = require('./resetPassword');
const verifyResetToken = require('./verifyResetToken');

const router = express.Router();
const routesArr = [...login, ...resetPassword, ...verifyResetToken];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
