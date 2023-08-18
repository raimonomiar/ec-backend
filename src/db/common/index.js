const { length } = require('ramda');
const { timesFn, strFn } = require('../../lib/utils');

const constructOrderByClause = (sortFieldName, sortingOrder) => ` ORDER BY ${sortFieldName} ${sortingOrder} `;

const constructLimitClause = ' LIMIT ? OFFSET ? ';

const constructInFilterClause = ({ columnName, tableAlias, filter }) => (filter ? ` AND ${tableAlias}.${columnName} IN (${timesFn(strFn('?'), ',')(length(filter))}) ` : '');

const constructIsEqualFilterClause = ({ columnName, tableAlias }) => ` AND ${tableAlias}.${columnName} = ? `;

module.exports = {
  constructOrderByClause,
  constructLimitClause,
  constructInFilterClause,
  constructIsEqualFilterClause,
};
