'use strict';
var wp = require('../lib/wordpress-client');
var nock = require('nock');

describe('Wordpress XMLRPC testing', function () {
  before(function () {

    this.scope = nock('http://test.com')
      .defaultReplyHeaders({
        'Content-Type': 'text/xml'
      })
      .post('/xmlrpc.php', '<?xml version="1.0"?><methodCall><methodName>system.listMethods</methodName><params/></methodCall>')
      .reply(200, 'hello world');

    this.client = wp.create({
      url: 'http://test.com',
      username: 'test',
      password: 'test'
    });
  });

  describe('wordpress client testing', function () {
    it('should ', function () {
      this.client.once(function() {
        console.log(arguments);
      });
    });
  });
});
