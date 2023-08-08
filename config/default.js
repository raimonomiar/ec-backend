const defer = require('config/defer').deferConfig;
const p = require('../package.json');

module.exports = {
  app: {
    name: p.name,
    description: p.description,
    uri: process.env.APP_URI || 'http://localhost:10000',
  },
  api: {
    ROOT_URI: '/api',
    BASE_URI: defer((cfg) => `${cfg.api.ROOT_URI}/`),
  },
  env: {
    mode: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 4200,
    swaggerAPIURL: process.env.SWAGGER_API_URL ? defer((cfg) => `{scheme}://${process.env.SWAGGER_API_URL}${cfg.api.BASE_URI}`)
      : defer((cfg) => `{scheme}://${cfg.env.host}:${cfg.env.port}${cfg.api.BASE_URI}`),
  },
  db: {
    mysql: {
      host: process.env.MYSQL_DB_SERVER || 'localhost',
      port: process.env.MYSQL_DB_PORT || 3306,
      user: process.env.MYSQL_DB_USER || 'ec',
      password: process.env.MYSQL_DB_PASSWORD || 'ec123',
      database: process.env.MYSQL_DB_NAME || 'ec',
      multipleStatements: true,
      waitForConnections: true,
      connectionLimit: 100,
      queueLimit: 0,
      connectTimeout: 60 * 60 * 1000,
      acquireTimeout: 60 * 60 * 1000,
      timeout: 60 * 60 * 1000,
      debug: false,
    },
  },
  constants: {
    enableSwagger: true,
    saltRound: 10,
  },
  logger: {
    APP_LOG_PATH: process.env.APP_LOG_PATH || 'default.log',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    TIME_FORMAT: process.env.TIME_FORMAT || 'YYYY-MM-DD HH:mm:ss',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || '',
    },
    tls: {
      minVersion: 'TLSv1',
      rejectUnauthorized: false,
    },
  },
  jwt: {
    secretKey: process.env.JWT_PRIVATE_KEY || 'yoursecretkey',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
};
