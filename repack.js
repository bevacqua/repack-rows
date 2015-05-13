'use strict';

var _ = require('lodash');
var fs = require('fs');
var tmp = require('tmp');
var proxyquire = require('proxyquire');

function repack (rows, mocks) {
  var entry = _.find(rows, 'entry');
  var mockups = _.keys(mocks || {}).reduce(noCall, {});
  return depTree(entry, mockups);

  function noCall (accumulator, key) {
    accumulator[key] = mocks[key];
    accumulator[key]['@noCallThru'] = true;
    return accumulator;
  }

  function dep (accumulator, key) {
    if (key in accumulator) {
      return accumulator;
    }
    var dependency = _.find(rows, { id: entry.deps[key] });
    accumulator[key] = depTree(dependency, {});
    accumulator[key]['@noCallThru'] = true;
    return accumulator;
  }

  function depTree (row, dependencies) {
    var map = _.keys(row.deps).reduce(dep, dependencies);
    var file = tmp.tmpNameSync({ postfix: '.js' });
    fs.writeFileSync(file, entry.source, 'utf8');
    return proxyquire(file, map);
  }
}

module.exports = repack;
