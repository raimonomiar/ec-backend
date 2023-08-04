const p = require('../package.json');
const defer = require('config/defer').deferConfig;

module.exports = {
  app: {
    name: p.name,
    description: p.description,
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
		},
	},
  constants: {
    enableSwagger: true,
	},
  logger: {
    APP_LOG_PATH: process.env.APP_LOG_PATH || 'default.log',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    TIME_FORMAT: process.env.TIME_FORMAT || 'YYYY-MM-DD HH:mm:ss',
  },
};
