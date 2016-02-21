'use strict';

function requireQueryString(fn) {
  return function *() {
    let keys = Object.keys(this.query);
    if(keys.length > 0) {
      yield fn.apply(this)
    } else {
      this.status = 403;
      this.body = {msg: 'Must have query string present'}
    }
  }
}

module.exports = {
  requireQueryString: requireQueryString
}
