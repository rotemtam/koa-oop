'use strict';
// var app = require('../app.js')
//   , request = require('co-supertest').agent(app.listen())

//   , sinon = require('sinon')
//   , ClusterStatsCalculator = require('../model/rds/ClusterStatsCalculator')
//   , PlayPauseDB = require('../components/play-pause/db')
//   , co = require('co');
var expect = require('chai').expect,
    BaseController = require('../lib/koa-oop');
require('sinon-as-promised');
require('co-mocha');

describe('Base Controller Class', function() {
  var a;
  before(function() {
    a = new BaseController();
  })

  it('Constructor should init a koa app at .app', () => {
    expect(a.app.constructor.name).to.equal('Application')
  })

  describe('Utilities',()=> {
    it('validate that verb is real http verb', function() {
      let fn_fail = () => { a.checkVerb('eat') };
      let fn_good = () => {a.checkVerb('get')};

      expect(fn_fail).to.throw(/Need real HTTP verb/)
      expect(fn_good).not.to.throw(/Need real HTTP verb/)

    })
  })

  describe('Adding stuff to controller', () => {

    it('add middleware to controller', () => {
      a.addMiddleware(function *(next) { yield next});
      expect(a.app.middleware.length).to.equal(1)
    })

    it('add method to controller', () => {
      a.addMethod('get', '/a', function* () {});
      expect(a.app.middleware.length).to.equal(2)
    })

    it('add child controller to controller', () => {
      class Child extends BaseController {

      }
      a.addController( '/b', new Child());
      expect(a.app.middleware.length).to.equal(3)
    })


  })

})
