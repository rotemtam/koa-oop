'use strict'

module.exports = function predicateFactory(compareFn, errorCode, errorMessage) {
  return function(fn) {
    return function *() {
      if (compareFn.apply(this)) {
        yield fn.call(this)
      } else {
        this.body = {msg: errorMessage}
        this.status = errorCode
      }
    }
  }
}
