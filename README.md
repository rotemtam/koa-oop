# koa-oop

An example as how one might build a koajs app made of ES6 classes, hopefully
resulting in clean and readable code.  Not much other than syntactic sugar over
koa, but hope you find it sweet.

## features

* keep api routes and project structure in sync
* use predicates to decorate paths/methods with additional functionality such as permission checking


## get started

```
npm install
node index.js
```

## test

```
mocha tests/
```

## use predicate factory to create logic decorators

```js
'use strict';

const factory = require('../lib/predicate-factory')

function hasQString() {
  return Object.keys(this.query).length > 0
}

module.exports =  factory(hasQString, 403, 'Must have query string');

```

## example controller

```js
'use strict';

const BaseController = require('../lib/koa-oop')
  , json = require('koa-json');

const predicates = require('../lib/predicates');

class RootCtrl extends BaseController {

  constructor() {

    super();

    this.addMiddleware(json())
        .addMethod('get', '/a/:id', predicates.requireQueryString(this.a))
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

```
