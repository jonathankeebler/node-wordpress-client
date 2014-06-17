'use strict';
var wp = require('../lib/wordpress-client');

describe('Wordpress XMLRPC testing', function () {
  before(function () {
    this.client = wp.create({
      url: 'http://test.com/xmlrpc.php',
      username: 'test',
      password: 'test'
    });
  });

  describe('wordpress client testing', function () {
    it('should ', function () {

    });
  });
});
