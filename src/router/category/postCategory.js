const HttpStatusCode = require('http-status-codes');
const HttpError = require('standard-http-error');
const { pathEq } = require('ramda');
const { ER_DUP_ENTRY } = require('config').get('constants');
const { categoryService } = require('../../services');
const {
  postCategory: { schema },
} = require('../../lib/route-validators');
// const {userErrors: {CONFLICT: {code, message,},},} = require('../../../constants/errorMaps');

const resposneEntity = async (req, res, next) => {
  try {
    const { body } = req;
    await categoryService.addToCategory(body);
    res.status(HttpStatusCode.CREATED).send();
  } catch (error) {
    if (pathEq(['code'], ER_DUP_ENTRY)(error)) {
      // eslint-disable-next-line no-undef
      const errorObject = new HttpError(HttpStatusCode.CONFLICT, message, {
        // eslint-disable-next-line no-undef
        errorCode: code,
      });
      next(errorObject);
    } else {
      next(error);
    }
  }
};

module.exports = [
  {
    route: '/',
    method: 'post',
    middlewares: [schema, resposneEntity],
  },
];