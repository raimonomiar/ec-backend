const _ = require('lodash');
const { map, omit } = require('ramda');

const MAP_USER_COLS = ['userId', 'email', 'firstName', 'lastName', 'street', 'zip', 'phone', 'isAdmin', 'city', 'appartment', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy'];

function filterAndMapUsers(rows, keyToFilter) {
  return {
    data: map(omit(keyToFilter), rows),
    total: rows[0] && rows[0].total,
  };
}

function filterAndMapAllUsers(rows) {
  return _.chain(rows)
    .groupBy('userId')
    .values()
    .map((group) => _.pick(_.head(group), MAP_USER_COLS, 'total'))
    .value();
}

module.exports = {
  filterAndMapUsers,
  filterAndMapAllUsers,
};
