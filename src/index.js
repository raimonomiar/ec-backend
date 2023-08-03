require('dotenv').config();
const config = require('config');
const dbs = require('./db');
const app = require('./app/app');
// TODO - add logger

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
    // TODO - add logger
    console.log(err);
  }
  await closeResource();
  process.nextTick(() => process.exit(1));
};

const uncaughtExceptionHandler = async (err) => {
  process.removeListener('uncaughtException', uncaughtExceptionHandler);
  // TODO - add logger
  terminateServer(err);
};

const unhandledRejectionHandler = async (reason, p) => {
  process.removeListener('unhandledRejection', unhandledRejectionHandler);
  // TODO - add logger
  terminateServer();
};

const startServer = async () => {
  // TODO - add logger
  dbs.mysql.checkConnection();
  // TODO - add logger
  const appInstance = app.createApp();
  const port = config.get('env.port');
  // TODO - add logger
  serverInstance = appInstance.listen(port, () => {
    // TODO - add logger
    console.log(`Server started on port ${port}`);
  });
};

startServer()
  .then(() => {
    // TODO - add logger
  })
  .catch((err) => { terminateServer(err); });

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);
process.on('SIGUSR1', terminateServer);
