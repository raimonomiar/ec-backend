/* eslint-disable no-unused-vars */
const _ = require('lodash');
const {
  map,
  omit,
} = require('ramda');

function filterAndMapCategories(rows, keyToFilter) {
  return {
    data: map(omit(keyToFilter), rows),
    total: rows[0] && rows[0].total,
  };
}

module.exports = {
  filterAndMapCategories,
};
