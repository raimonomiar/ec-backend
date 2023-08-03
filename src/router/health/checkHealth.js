const HttpStatusCode = require('http-status-codes');

const checkHealth = async (req, res) => {
  res.status(HttpStatusCode.OK).send('Servce is up and running');
}

module.exports = [
  {
    route: '/',
    method: 'get',
    middlewares: [
      checkHealth,
    ],
  }
];
