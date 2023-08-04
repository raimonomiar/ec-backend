const {
  createLogger,
  transports,
  format: {
    timestamp: time,
    combine,
    printf,
  },
} = require('winston');

const appLogConfig = require('config').get('logger');

const {
  TIME_FORMAT, APP_LOG_PATH, LOG_LEVEL,
} = appLogConfig;

const customFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const logger = createLogger({
  level: LOG_LEVEL,
  format: combine(
    time({
      format: TIME_FORMAT,
    }),
    customFormat,
  ),
  transports: [
    new transports.File({
      filename: APP_LOG_PATH,
    }),
  ],
});

const info = (message) => {
  logger.info(message);
};

const debug = (message) => {
  logger.debug(message);
};

const error = (message, stack) => {
  logger.error(`${message}\n${stack}`);
};

module.exports = {
  info,
  debug,
  error,
};
