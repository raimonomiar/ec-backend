const express = require('express');

const router = express.Router();
const postCategory = require('./postCategory');
const updateCategory = require('./putCategory');
const deleteCategory = require('./deleteCategory');

const routesArr = [...postCategory, ...updateCategory, ...deleteCategory];

routesArr.forEach((routeConfig) => {
  router[routeConfig.method](routeConfig.route, ...routeConfig.middlewares);
});

module.exports = router;
