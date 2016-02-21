'use strict';

const factory = require('../lib/predicate-factory')

function hasQString() {
  return Object.keys(this.query).length > 0
}

module.exports =  factory(hasQString, 403, 'Must have query string');
