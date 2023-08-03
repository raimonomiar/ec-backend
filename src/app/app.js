const express = require('express');
const compression = require('compression');
const config = require('config');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require('../lib/errors').handler;
const router = require('../router');
const swagger = require('../swagger');
const { clsSession } = require('../lib/cls');
const mung = require('./responseTransformer');

const requestIdMiddleware = (req, res, next) => {
  clsSession.run(() => {
    clsSession.bindEmitter(req);
    next();
  });
};

const createApp = () => {
  const expressApp = express();
  expressApp.use(requestIdMiddleware);
  // Todo - add logger
  expressApp.use(express.json({ limit: '50mb' }));
  expressApp.use(express.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000,
  }));
  expressApp.use(compression());
  expressApp.use(mung);
  expressApp.use(config.get('api.BASE_URI'), router);

  if (config.get('constants.enableSwagger')) {
    expressApp.use('/swagger.json', (req, res) => {
      res.send(swagger.load());
    });
    expressApp.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger.load()));
  }

  expressApp.use(errorHandler.notFoundError());
  expressApp.use(errorHandler.httpError());
  expressApp.disable('x-powered-by');
  return expressApp;
};
module.exports = { createApp };
