'use strict';
var wp = require('../lib/wordpress-client');
var nock = require('nock');
var fs = require('fs');

describe('Wordpress XML-RPC testing', function () {
  describe('wordpress client testing', function () {
    before(function () {
      this.scope = nock('http://test.com')
        .defaultReplyHeaders({
          'Content-Type': 'text/xml'
        })
        .post('/xmlrpc.php', '<?xml version="1.0"?><methodCall><methodName>system.listMethods</methodName><params/></methodCall>')
        .times(10000)
        .reply(200, fs.readFileSync('test/fixtures/listMethods.xml'))
        .post('/xmlrpc.php', '<?xml version="1.0"?><methodCall><methodName>system.fail</methodName><params/></methodCall>')
        .times(10000)
        .reply(404)
        .post('/xmlrpc.php', fs.readFileSync('test/fixtures/newPost.xml'))
        .reply();
    });

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

    it('should pass error if connection failed and methods list should contain no items', function (done) {
      wp.create({
        url: 'http://test2.com',
        username: 'test',
        password: 'test'
      }).once('connected', function (err, that) {
        err.message.should.be.exactly("Unable to connect to WordPress.");
        that.get('methods').should.be.eql([]);
        that.get('blog').should.be.exactly(1);
        done();
      });
    });

    it('should call callback with Client context', function (done) {
      wp.create({
        url: 'http://test.com',
        username: 'test',
        password: 'test'
      }).once('connected', function (err, that) {
        that.methodCall('system.listMethods', [], function (err, response) {
          that.should.be.eql(this);
          done();
        });
      });
    });

    it('should fail to method call after success connection with error message', function (done) {
      wp.create({
        url: 'http://test.com',
        username: 'test',
        password: 'test'
      }).once('connected', function (err, that) {
        that.methodCall('system.fail', [], function (err, response) {
          err.message.should.be.exactly("Unable to connect to WordPress.");
          (response === void 0).should.be.true;
          done();
        });
      });
    });

    it('should insert NEW post', function (done) {
      wp.create({
        url: 'http://test.com',
        username: 'test',
        password: 'test'
      }).once('connected', function (err, that) {
        var input = {
          "post_type": "post",
          "post_status": "draft",
          "post_title": "Test Post",
          "post_author": 1,
          "post_excerpt": "Summary of post",
          "post_content": "<b>Rich-text</b> detail of of post.",
          "post_modified_gmt": "Thu Jun 19 2014 20:39:23 GMT+0300 (Eastern Europe Daylight Time)",
          "post_date": "Thu Jun 19 2014 20:39:23 GMT+0300 (Eastern Europe Daylight Time)",
          "post_format": "standard",
          "comment_status": "closed",
          "ping_status": "closed",
          "sticky": false,
          "custom_fields": [
            {
              "key": "_source",
              "value": "xml-rpc"
            },
            {
              "key": "some-key",
              "value": "some-value"
            }
          ],
          "terms_names": {
            "category": [ "Awesome Category", "Another Category" ],
            "post_tag": [ "Chicago" ]
          }
        };
        that.insertPost(input, function (err, response) {
          done();
        });
      });
    });
  });
});
