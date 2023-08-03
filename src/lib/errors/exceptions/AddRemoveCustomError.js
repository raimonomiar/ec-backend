const AppError = require('./AppError');
const ADD_REMOVE_CUSTOM_ERROR = 'Error adding or removing item';

module.exports = class AddRemoveCustomError extends AppError {
  constructor(errorArray) {
    super(ADD_REMOVE_CUSTOM_ERROR);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.errorArray = errorArray;
  }
}
