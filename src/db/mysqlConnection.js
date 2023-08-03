const util = require('util');
const mysql = require('mysql');
const config = require('config');

const pool = mysql.createPool(config.get('db.mysql'));
pool.query = util.promisify(pool.query);


module.exports = {
  checkConnection: () => {
    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      }
      conn.ping((e) => {
        if (e) {
          throw e;
        }
        return conn.release();
      });
    });
  },
  pool,
  format: (query, inserts) => mysql.format(query, inserts),
  closeConnection: () => pool.end(),
  getConnection: () => new Promise(
    (resolve, reject) => pool.getConnection((err, conn) => {
      if (err) {
        return reject(err);
      }
      return resolve(conn);
    }),
  ),
  beginTransaction: (conn) => new Promise(
    (resolve, reject) => conn.beginTransaction((err) => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    }),
  ),
  commit: (conn) => new Promise(
    (resolve, reject) => conn.commit((err) => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    }),
  ),
  rollback: (conn) => new Promise(
    (resolve, reject) => conn.rollback((err) => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    }),
  ),
  query: (conn, query, inserts) => new Promise(
    (resolve, reject) => conn.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    }),
  ),
  queryWithParams: (conn, query, values) => new Promise(
    (resolve, reject) => conn.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    }),
  ),
};
