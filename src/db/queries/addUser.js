const { users } = require('../schema');

const insertIntoUsers = `INSERT INTO ${users.table}(
  ${users.cols.email.colName},
  ${users.cols.firstName.colName},
  ${users.cols.lastName.colName},
  ${users.cols.passwordHash.colName},
  ${users.cols.street.colName},
  ${users.cols.zip.colName},
  ${users.cols.phone.colName},
  ${users.cols.isAdmin.colName},
  ${users.cols.city.colName},
  ${users.cols.appartment.colName},
  ${users.cols.createdBy.colName},
  ${users.cols.updatedBy.colName}
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const getQueryParamsForUsers = (
  input,
) => {
  const {
    email,
    firstName,
    lastName,
    street,
    zip,
    phone,
    isAdmin,
    city,
    appartment,
    createdBy,
    updatedBy,
  } = input;

  const queryArgs = [
    email, firstName, lastName, street, zip, phone, isAdmin, city, appartment,
    createdBy, updatedBy,
  ];
  return {
    insertIntoUsersCmd: insertIntoUsers,
    insertIntoUsersArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForUsers,
};
