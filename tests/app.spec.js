var app = require('../index.js')
  , request = require('co-supertest').agent(app.listen())
  , sinon = require('sinon')
  , expect = require('chai').expect,
    BaseController = require('../lib/koa-oop');

require('sinon-as-promised');
require('co-mocha');

describe('Main Controller', () => {
  it('/a/1 fails with no query string', function *() {
		var res = yield request.get('/a/1').expect(403).end();
		expect(res.body).to.be.ok;
	});

  it('/a/1 succeeds with query string', function *() {
		var res = yield request.get('/a/1?a=1').expect(200).end();
		expect(res.body).to.be.ok;
	});

  it('/b/1 succeeds', function *() {
		var res = yield request.get('/b/1').expect(200).end();
		expect(res.body).to.be.ok;
	})

});

describe('Second Controller', () => {
  it('/second/c/1 succeeds', function *() {
		var res = yield request.get('/second/c/1').expect(200).end();
		expect(res.body).to.be.ok;
	});
});
