'use strict';

const koa = require('koa')
  , assert = require('assert')
  , mount = require('koa-mount')
  , route = require('koa-route');

class BaseController {

  constructor() {
    this.app = koa();
  }

  addMiddleware(mw) {
    this.app.use(mw)
    return this
  }

  addMethod(verb, path, fn) {
    this.app.use(route[verb](path, fn))
    return this
  }

  addController(path, ctrl) {
    this.app.use(mount(path, ctrl.app))
    return this
  }

  checkVerb(v) {
    assert(['get','post','put','delete'].indexOf(v) > -1, 'Need real HTTP verb')
  }

  listen(port) {
    return this.app.listen(port);
  }

}

module.exports = BaseController;
