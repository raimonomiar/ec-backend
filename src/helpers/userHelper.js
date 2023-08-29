const { map, omit } = require('ramda');

function filterAndMapUsers(rows, keyToFilter) {
  return {
    data: map(omit(keyToFilter), rows),
    total: rows[0] && rows[0].total,
  };
}

module.exports = {
  filterAndMapUsers,
};
