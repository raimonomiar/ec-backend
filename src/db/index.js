const mysql = require('./mysqlConnection');
const schema = require('./schema');
const queries = require('./queries');

const dbs = {
  mysql,
  schema,
  queries,
};

module.exports = dbs;
