const { users } = require('../schema');

const selectUserByEmail = `
  SELECT 
    BIN_TO_UUID(${users.cols.userId.colName}) as ${users.cols.userId.name},
    ${users.cols.firstName.colName} as ${users.cols.firstName.name},
    ${users.cols.lastName.colName} as ${users.cols.lastName.name},
    ${users.cols.passwordHash.colName} as ${users.cols.passwordHash.name}
  FROM ${users.table} WHERE ${users.cols.email.colName} = ?`;

const {
  constructOrderByClause,
  constructLimitClause,
} = require('../common');

const whereClause = (lastName) => (lastName ? `WHERE ${users.cols.lastName.colName} LIKE ?` : '');
const userIdClause = (userId) => (userId ? `AND ${users.cols.userId.colName} = UUID_TO_BIN(?)` : '');

const selectUsersWithPagination = (lastName, userId) => `
  SELECT
    U.total,
    BIN_TO_UUID(${users.cols.userId.colName}) as ${users.cols.userId.name},
          ${users.cols.firstName.colName} as ${users.cols.firstName.name},
          ${users.cols.lastName.colName} as ${users.cols.lastName.name},
          ${users.cols.street.colName} as ${users.cols.street.name},
          ${users.cols.zip.colName} as ${users.cols.zip.name},
          ${users.cols.phone.colName} as ${users.cols.phone.name},
          ${users.cols.city.colName} as ${users.cols.city.name},
          ${users.cols.appartment.colName} as ${users.cols.appartment.name},
          ${users.cols.createdAt.colName} as ${users.cols.createdAt.name},
          ${users.cols.createdBy.colName} as ${users.cols.createdBy.name},
          ${users.cols.updatedAt.colName} as ${users.cols.updatedAt.name},
          ${users.cols.updatedBy.colName} as ${users.cols.updatedBy.name}
  FROM ${users.table},
    (SELECT COUNT(${users.cols.userId.colName}) as total 
    FROM ${users.table} WHERE ${users.cols.createdBy.colName} IS NOT NULL) as U
  WHERE ${users.table}.${users.cols.createdBy.colName} IS NOT NULL
  ${whereClause(lastName)}
  ${userIdClause(userId)}`;

const selectUserWithId = `
  SELECT
    BIN_TO_UUID(${users.table}.${users.cols.userId.colName}) as ${users.cols.userId.name},
          ${users.cols.firstName.colName} as ${users.cols.firstName.name},
          ${users.cols.lastName.colName} as ${users.cols.lastName.name},
          ${users.cols.street.colName} as ${users.cols.street.name},
          ${users.cols.zip.colName} as ${users.cols.zip.name},
          ${users.cols.phone.colName} as ${users.cols.phone.name},
          ${users.cols.city.colName} as ${users.cols.city.name},
          ${users.cols.appartment.colName} as ${users.cols.appartment.name},
          ${users.cols.createdAt.colName} as ${users.cols.createdAt.name},
          ${users.cols.createdBy.colName} as ${users.cols.createdBy.name},
          ${users.cols.updatedAt.colName} as ${users.cols.updatedAt.name},
          ${users.cols.updatedBy.colName} as ${users.cols.updatedBy.name}
  FROM ${users.table}
  WHERE ${users.table}.${users.cols.userId.colName} = UUID_TO_BIN(?)
`;

const getQueryParamsForUsers = ({
  lastName, userId, sortBy, sortOrder, limit, offset,
}) => {
  const queryArgs = [];
  if (lastName) {
    queryArgs.push(`%${lastName}%`);
  }
  if (userId) {
    queryArgs.push(userId);
  }
  queryArgs.push(limit, offset !== 0 ? (offset - 1) * limit : 0);

  return {
    selectUsersWithPaginationCmd: selectUsersWithPagination(lastName, userId)
        + constructOrderByClause(sortBy, sortOrder)
        + constructLimitClause,
    selectUsersWithPaginationArgs: queryArgs,
  };
};

const getAllUser = (userId) => {
  const queryArgs = [userId];
  return {
    selectUserCmd: selectUserWithId,
    selectUserArgs: queryArgs,
  };
};

const getQueryParams = (email) => {
  const queryArgs = [email];

  return {
    selectUserByEmailCmd: selectUserByEmail,
    selectUserByEmailArgs: queryArgs,
  };
};

module.exports = { getQueryParams, getQueryParamsForUsers, getAllUser };
