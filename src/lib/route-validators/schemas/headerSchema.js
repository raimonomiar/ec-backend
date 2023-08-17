const joi = require('joi');

module.exports = joi.object({
  authkey: joi.string().required(),
});
