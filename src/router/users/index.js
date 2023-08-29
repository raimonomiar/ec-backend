const express = require('express');

const router = express.Router();
const postUser = require('./postUser');
const putUser = require('./putUser');
const getUser = require('./getUser');

const routesArr = [...postUser, ...putUser, ...getUser];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
