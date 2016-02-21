'use strict';

const koa = require('koa')
  , assert = require('assert')
  , mount = require('koa-mount')
  , route = require('koa-route');

class BaseController {

  constructor() {
    this._koaApp = koa();
    // this._controllerClass = controller
  }

  init() {

    // let cc = this._controllerClass;
    // let proto = cc.prototype;
    // let methods = Object.getOwnPropertyNames(proto)
    // let paths  = methods.filter( path => path != 'constructor')

    let routes = this.routes     || [];
    let mw     = this.middleware || [];

    mw.forEach( ( middleware ) => {
      this.app.use(middleware)
    })

    routes.forEach( (route) => {
      let verb = route[0]
      let path = route[1]
      let fn   = route[2]

      if(verb == 'mount') {
        this.app.use(mount(path, fn.app))
      } else {
        this.checkVerb(verb)
        this.registerPath(verb,path,fn);
      }

    })

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
    return this._koaApp.listen(port);
  }

  get app() {
    return this._koaApp;
  }

}

module.exports = BaseController;
