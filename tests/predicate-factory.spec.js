'use strict';
const expect = require('chai').expect
    , sinon = require('sinon');

const factory = require('../lib/predicate-factory');

require('sinon-as-promised');
require('co-mocha');

describe('Predicate Factory', function() {
  let alwaysSucceed, alwaysFail;
  before(function() {
    alwaysSucceed = factory(() => true, 400, 'Fail');
    alwaysFail    = factory(() => false, 400, 'Fail');
  });

  it('should create a function', function() {
    expect(typeof alwaysSucceed).to.equal('function');
    expect(typeof alwaysFail).to.equal('function');
  })

  describe('Logic', function() {
    let obj;
    before( function() {
      obj = {
       cb: function *() { return }
     }
     sinon.stub(obj, 'cb').resolves({});
    });

    it('should NOT run callback when compareFn equals true', function *() {
      yield alwaysFail(obj.cb)
      expect(obj.cb.calledOnce).to.equal(false)
    })

    it('should RUN callback when compareFn equals true', function *() {
      yield alwaysSucceed(obj.cb)
      expect(obj.cb.calledOnce).to.equal(true)
    })

    after(function() {
      obj.cb.restore();
    })
  })



})
