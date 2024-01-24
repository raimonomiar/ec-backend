const { session } = require('../schema');
const {
  constructOrderByClause,
  constructLimitClause,
} = require('../common');

const selectSessionByUserId = `
  SELECT
    BIN_TO_UUID(${session.cols.sessionId.colName}) as ${session.cols.sessionId.name}
  FROM ${session.table}
  WHERE BIN_TO_UUID(${session.cols.userId.colName}) = ?
  AND TIMESTAMPDIFF(SECOND, ${session.cols.createdAt.colName}, NOW()) <= ?
  ${constructOrderByClause(session.cols.createdAt.colName, 'DESC')}
  ${constructLimitClause}
`;

const selectSession = `
  SELECT
  BIN_TO_UUID(${session.cols.sessionId.colName}) as ${session.cols.sessionId.name},
  BIN_TO_UUID(${session.cols.userId.colName}) as ${session.cols.userId.name},
  ${session.cols.total.colName} as ${session.cols.total.name}
  FROM ${session.table}
  WHERE BIN_TO_UUID(${session.cols.sessionId.colName}) = ?
`;

const getQueryParamsForSessionByUser = ({
  userId,
  cartSessionExpirationTime,
}) => {
  const limit = 1;
  const offset = 0;
  const queryArgs = [userId, cartSessionExpirationTime, limit, offset];
  return {
    selectSessionCmd: selectSessionByUserId,
    selectSessionArgs: queryArgs,
  };
};

const getQueryParamsForSession = ({
  sessionId,
}) => {
  const queryArgs = [sessionId];
  return {
    selectSessionCmd: selectSession,
    selectSessionArgs: queryArgs,
  };
};

module.exports = {
  getQueryParamsForSessionByUser,
  getQueryParamsForSession,
};
