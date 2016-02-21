'use strict';

const BaseController = require('../lib/koa-oop');

class SecondController extends BaseController {

  constructor() {
    super();
    this.addMethod('get', '/c/:id', this.c)
        .addMethod('get', '/d/:id', this.d)
  }

  *c() {
    this.body = {a:1,b:2}
  }

  *d() {
    this.body = 'b'
  }

}

module.exports = new SecondController();
