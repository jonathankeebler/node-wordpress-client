'use strict';
var wp = require('../lib/wordpress-client');
var nock = require('nock');
var fs = require('fs');

describe('Wordpress XML-RPC testing', function () {
  before(function () {
    this.scope = nock('http://test.com')
      .defaultReplyHeaders({
        'Content-Type': 'text/xml'
      })
      .post('/xmlrpc.php', '<?xml version="1.0"?><methodCall><methodName>system.listMethods</methodName><params/></methodCall>')
      .reply(200, fs.readFileSync('test/fixtures/listMethods.xml'));
  });

  describe('wordpress client testing', function () {
    it('should connect and return list of methods', function (done) {
      wp.create({
        url: 'http://test.com',
        username: 'test',
        password: 'test'
      }).once('connected', function (err, that) {
        var methods = JSON.parse(fs.readFileSync('test/fixtures/listMethods.json'));
        that.get('methods').should.be.eql(methods);
        done();
      });
    });
  });
});
