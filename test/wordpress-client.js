'use strict';
var wp = require('../lib/wordpress-client');
var nock = require('nock');
var fs = require('fs');
var path = require('path');

module.exports = {
  'Wordpress XML-RPC testing': {
    'wordpress client testing': {
      'before': function () {
        process.env.WORDPRESS_CLIENT_TEST_SERVER = process.env.WORDPRESS_CLIENT_TEST_SERVER || 'http://test.com';
        process.env.WORDPRESS_CLIENT_ERROR_SERVER = process.env.WORDPRESS_CLIENT_ERROR_SERVER || 'http://errors.com';
        process.env.WORDPRESS_CLIENT_404_SERVER = process.env.WORDPRESS_CLIENT_404_SERVER || 'http://test.com';
        process.env.WORDPRESS_CLIENT_UNREACHABLE_SERVER = process.env.WORDPRESS_CLIENT_UNREACHABLE_SERVER || 'http://test2.com';
        process.env.WORDPRESS_CLIENT_TEST_SERVER_USER = process.env.WORDPRESS_CLIENT_TEST_SERVER_USER || 'test';
        process.env.WORDPRESS_CLIENT_TEST_SERVER_PASSWORD = process.env.WORDPRESS_CLIENT_TEST_SERVER_PASSWORD || 'test';
        process.env.WORDPRESS_CLIENT_TEST_SERVER_BLOGNAME = process.env.WORDPRESS_CLIENT_TEST_SERVER_BLOGNAME || 'test';

        nock('http://test.com')
          .defaultReplyHeaders({
            'Content-Type': 'text/xml'
          })
          .post('/xmlrpc.php', '<?xml version="1.0"?><methodCall><methodName>system.listMethods</methodName><params/></methodCall>')
          .times(10000)
          .reply(200, fs.readFileSync(path.join(__dirname, 'fixtures', 'listMethods.xml'), { encoding: 'utf8' }))
          .post('/xmlrpc.php', '<?xml version="1.0"?><methodCall><methodName>system.fail</methodName><params/></methodCall>')
          .times(10000)
          .reply(404)
          .post('/xmlrpc.php', fs.readFileSync('test/fixtures/newPost.xml', { encoding: 'utf8' }))
          .times(10000)
          .reply(200, '<?xml version="1.0" encoding="UTF-8"?><methodResponse><params><param><value><string>28</string></value></param></params></methodResponse>')
          .post('/xmlrpc.php', fs.readFileSync('test/fixtures/uploadFile.xml', { encoding: 'utf8' }))
          .times(10000)
          .reply(200, '<?xml version="1.0" encoding="UTF-8"?><methodResponse><params><param><value><struct><member><name>id</name><value><string>62</string></value></member><member><name>file</name><value><string>image.jpg</string></value></member><member><name>url</name><value><string>http://test.com/wp-content/uploads/image.jpg</string></value></member><member><name>type</name><value><string>image/jpeg</string></value></member></struct></value></param></params></methodResponse>')
          .post('/xmlrpc.php', '<?xml version="1.0"?><methodCall><methodName>wp.getUsersBlogs</methodName><params><param><value><string>test</string></value></param><param><value><string>test</string></value></param></params></methodCall>')
          .times(10000)
          .reply(200, '<?xml version="1.0" encoding="UTF-8"?><methodResponse><params><param><value><array><data><value><struct><member><name>isAdmin</name><value><boolean>1</boolean></value></member><member><name>url</name><value><string>http://test.com/</string></value></member><member><name>blogid</name><value><string>1</string></value></member><member><name>blogName</name><value><string>test</string></value></member><member><name>xmlrpc</name><value><string>http://test.com//xmlrpc.php</string></value></member></struct></value></data></array></value></param></params></methodResponse>');

        nock('http://errors.com')
          .defaultReplyHeaders({
            'Content-Type': 'text/xml'
          })
          .post('/xmlrpc.php', '<?xml version="1.0"?><methodCall><methodName>wp.getUsersBlogs</methodName><params><param><value><string>test</string></value></param><param><value><string>test</string></value></param></params></methodCall>')
          .times(10000)
          .reply(200, '<?xml version="1.0" encoding="UTF-8"?><methodResponse><fault><value><struct><member><name>faultCode</name><value><int>403</int></value></member><member><name>faultString</name><value><string>Incorrect username or password.</string></value></member></struct></value></fault></methodResponse>');

      },

      'should connect and return list of methods': function (done) {
        wp.create({
          url: process.env.WORDPRESS_CLIENT_TEST_SERVER,
          username: process.env.WORDPRESS_CLIENT_TEST_SERVER_USER,
          password: process.env.WORDPRESS_CLIENT_TEST_SERVER_PASSWORD
        }).once('connected', function (err, that) {
          var methods = JSON.parse(fs.readFileSync('test/fixtures/listMethods.json', { encoding: 'utf8' }));
          if (!process.env.WORDPRESS_CLIENT_USE_REAL_SERVER) {
            that.get('methods').should.be.eql(methods);
          } else {
            that.get('methods').length.should.be.above(0);
          }
          done();
        });
      },

      'should pass error if connection failed and methods list should contain no items': function (done) {
        wp.create({
          url: process.env.WORDPRESS_CLIENT_UNREACHABLE_SERVER,
          username: process.env.WORDPRESS_CLIENT_TEST_SERVER_USER,
          password: process.env.WORDPRESS_CLIENT_TEST_SERVER_PASSWORD
        }).once('connected', function (err, that) {
          err.message.should.be.exactly("Unable to connect to WordPress.");
          that.get('methods').should.be.eql([]);
          that.get('blog').should.be.exactly(1);
          done();
        });
      },

      'should call callback with Client context': function (done) {
        wp.create({
          url: process.env.WORDPRESS_CLIENT_TEST_SERVER,
          username: process.env.WORDPRESS_CLIENT_TEST_SERVER_USER,
          password: process.env.WORDPRESS_CLIENT_TEST_SERVER_PASSWORD
        }).once('connected', function (err, that) {
          that.methodCall('system.listMethods', [], function (err, response) {
            that.should.be.eql(this);
            done();
          });
        });
      },

      'should fail to method call after success connection with error message': function (done) {
        wp.create({
          url: process.env.WORDPRESS_CLIENT_404_SERVER,
          username: process.env.WORDPRESS_CLIENT_TEST_SERVER_USER,
          password: process.env.WORDPRESS_CLIENT_TEST_SERVER_PASSWORD
        }).once('connected', function (err, that) {
          that.methodCall('system.fail', [], function (err, response) {
            err.message.should.be.exactly("Unable to connect to WordPress.");
            (response === void 0).should.be.true;
            done();
          });
        });
      },

      'should insert NEW post': function (done) {
        wp.create({
          url: process.env.WORDPRESS_CLIENT_TEST_SERVER,
          username: process.env.WORDPRESS_CLIENT_TEST_SERVER_USER,
          password: process.env.WORDPRESS_CLIENT_TEST_SERVER_PASSWORD
        }).once('connected', function (err, that) {
          var input = {
            "post_type": "post",
            "post_status": "publish",
            "post_title": "Test Post",
            "post_author": 1,
            "post_excerpt": "Summary of post",
            "post_content": "<b>Rich-text</b> detail of of post.",
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
              "category": ["Cat"],
              "post_tag": ["Chicago", "New Jersey"]
            }
          };
          that.insertPost(input, function (err, response) {
            if (!process.env.WORDPRESS_CLIENT_USE_REAL_SERVER) {
              response.should.have.properties({ ok: true, id: 28, updated: false });
            } else {
              response.should.have.properties({ ok: true, updated: false });
              response.should.have.keys('id');
              response.id.should.be.type('number');
              response.id.should.be.above(0);
            }
            done();
          });
        });
      },

      'should upload new file': function (done) {
        wp.create({
          url: 'http://test.com',
          username: 'test',
          password: 'test'
        }).once('connected', function (err, that) {
          var input = {
            "name": "image.jpg",
            "type": "image/jpeg",
            "bits": fs.readFileSync(path.join(__dirname, 'fixtures', 'test.jpg')),
            "override": true
          };
          that.uploadFile(input, function (err, response) {
            (err === null).should.be.true;
            (response.id === 62).should.be.true;
            (response.url === "http://test.com/wp-content/uploads/image.jpg").should.be.true;
            (response.type === "image/jpeg").should.be.true;
            done();
          });
        });
      },

      'blog detection when it has not been passed with arguments': function (done) {
        wp.create({
          url: 'http://test.com',
          username: 'test',
          password: 'test'
        }).once('connected', function (err, that) {
          that.get('blog').should.be.exactly(1);
          that.get('blogId').should.be.exactly(1);
          that.__client.blogId.should.be.exactly(1);

          that.detectBlog(function (err, blog, response) {
            blog.blogid.should.be.exactly("1");
            blog.blogName.should.be.exactly('test');
            blog.url.should.be.exactly('http://test.com/');
            //blog.xmlrpc.should.be.exactly("http://test.com/xmlrpc.php");

            done();
          }, true);
        });
      },

      'should fail with invalid credentials': function (done) {
        wp.create({
          url: process.env.WORDPRESS_CLIENT_ERROR_SERVER,
          username: 'test',
          password: 'test'
        }).once('connected', function (err, that) {
          err.faultString.should.be.exactly("Incorrect username or password.");
          err.code.should.be.exactly(403);
          err.faultCode.should.be.exactly(403);
          done();
        });
      }
    }
  }
};
