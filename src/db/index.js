const mysql = require('./mysqlConnection');
const schema = equire('./schema');
const dbs = {
  mysql,
  schema,
};

module.exports = dbs;
