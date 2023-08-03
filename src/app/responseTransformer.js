const mung = require('express-mung');
const HttpStatusCode = require('http-status-codes');

function handleNoContentResponseStatus(body, req, res) {
  if (req.statusCode === HttpStatusCode.NO_CONTENT) {
    res.status(HttpStatusCode.OK).json({});
  } 
}

module.exports = mung.json(handleNoContentResponseStatus);
