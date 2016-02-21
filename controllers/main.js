'use strict';

const BaseController = require('../lib/koa-oop')
  , json = require('koa-json');

const requireQueryString = require('../predicates/require-query-string');

class RootCtrl extends BaseController {

  constructor() {

    super();

    this.addMiddleware(json())
        .addMethod('get', '/a/:id', requireQueryString(this.a))
        .addMethod('get', '/b/:id', this.b)
        .addController('/second', require('./second'))
  }

  *a() {
    this.body = {a:1, b:2, c:3}
  }

  *b() {
    this.body = 'b'
  }

}

module.exports = new RootCtrl();
