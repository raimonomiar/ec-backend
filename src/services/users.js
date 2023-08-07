const logger = require('../lib/logger');
const _ = require('lodash');
const { mysql, queries } = require('../db');
const { AppError } = require('../lib/errors/exceptions');
const bcrypt = require('bcrypt');
const queryExecutor = require('../queryExecutor');

const SALT = 10;

async function addUser(input) {
  const {
    email,
    firstName,
    lastName,
    password,
    street,
    zip,
    phone,
    isAdmin,
    city,
    appartment,
    createdBy,
    updatedBy,
  } = input;

  const passwordHash = await bcrypt.hash(password, SALT);
  const result = await queryExecutor.insertIntoUsersTable({
    email, firstName, lastName, passwordHash, street, zip, phone,
    isAdmin, city, appartment, createdBy, updatedBy,
  });

  return result;
}

async function validatePassword(input) {
  const { email, password } = input;
  const [row] = await queryExecutor.getUserByEmail(email);
  if (!row) {
    return {
      isValid: false,
      userId: null,
    };
  }
  return {
    isValid: await bcrypt.compare(password, row.password_hash),
    userId: row.userId,
  };
}

module.exports = {
 addUser, 
 validatePassword,
};
