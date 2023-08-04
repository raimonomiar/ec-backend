require('dotenv').config();
const config = require('config');
const dbs = require('./db');
const app = require('./app/app');
const logger = require('./lib/logger');

process.env.ROOTDIR = __dirname;
let serverInstance;

async function closeResource() {
  if (serverInstance) {
    serverInstance.close();
  }
  await dbs.mysql.closeConnection();
}

const terminateServer = async (err) => {
  if (err) {
    logger.error(err);
  }
  await closeResource();
  process.nextTick(() => process.exit(1));
};

const uncaughtExceptionHandler = async (err) => {
  process.removeListener('uncaughtException', uncaughtExceptionHandler);
  logger.error(err);
  terminateServer(err);
};

const unhandledRejectionHandler = async (reason, p) => {
  process.removeListener('unhandledRejection', unhandledRejectionHandler);
  logger.error(err);
  terminateServer();
};

const startServer = async () => {
  logger.debug('Starting Server');
  dbs.mysql.checkConnection();
  logger.debug('DB Connected');
  const appInstance = app.createApp();
  const port = config.get('env.port');
  logger.debug('Listening Now');
  serverInstance = appInstance.listen(port, () => {
    logger.debug(`Server is up and running on port: ${port}`);
  });
};

startServer()
  .then(() => {
    logger.debug('Server up successful');
  })
  .catch((err) => { terminateServer(err); });

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);
process.on('SIGUSR1', terminateServer);
