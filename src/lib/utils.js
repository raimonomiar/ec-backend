const { MAX_RECURSION_DEPTH } = require('config').get('constants');
const {
  pipe, map, filter, times, join,
} = require('ramda');

function removeArrayElements(arr, indexArr) {
  if (arr instanceof Array && indexArr instanceof Array) {
    for (let i = 0; i < indexArr.length; i += 1) {
      arr.splice(indexArr[i], 1);
    }
  }
  return arr;
}

function filterArrayDepth(arr, depthAllowed, childrenKey = 'children', currDepth = 0) {
  if (arr == null || arr.length === 0) {
    return arr;
  }
  if (currDepth > MAX_RECURSION_DEPTH) {
    throw new Error('Max depth recursion reached');
  }
  for (let i = 0; i < arr.length; i += 1) {
    const ob = arr[i];
    if (ob[childrenKey]) {
      if (currDepth < depthAllowed) {
        filterArrayDepth(ob[childrenKey], depthAllowed, childrenKey, currDepth + 1);
      } else {
        ob[childrenKey] = null;
      }
    }
  }
  return arr;
}

function compareString(a, b) {
  return a > b ? 1 : -1;
}

function sortArrayAlphabeticallyByProp(arr, propName, caseSensitive = false) {
  if (arr == null || arr.length === 0 || propName == null) {
    return arr;
  }
  return arr.sort((a, b) => {
    const x = caseSensitive ? a[propName] : (a[propName] && a[propName].toLowerCase()) || null;
    const y = caseSensitive ? b[propName] : (b[propName] && b[propName].toLowerCase()) || null;
    return compareString(x, y);
  });
}

const filterMap = (filterFn, mapperFn) => pipe(filter(filterFn), map(mapperFn));

const timesFn = (fn, delimiter) => pipe(times(fn), join(delimiter));
const strFn = (input) => () => input;
const serializeDeserialize = pipe(
  JSON.stringify,
  JSON.parse,
);

const splitPipe = (pipeString) => pipeString.split('|').filter((value) => value);

module.exports = {
  removeArrayElements,
  filterArrayDepth,
  sortArrayAlphabeticallyByProp,
  filterMap,
  timesFn,
  strFn,
  serializeDeserialize,
  splitPipe,
};
