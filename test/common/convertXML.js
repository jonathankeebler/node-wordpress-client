'use strict';

var convertFn = require('../../lib/common/convertXML');

describe('Testing XML string creation', function () {

  it('should return string for string', function () {
    convertFn("string value").should.be.exactly("<string>string value</string>");
  });

  it('should return string for number', function () {
    convertFn(123).should.be.exactly("<int>123</int>");
    convertFn(12.3).should.be.exactly("<double>12.3</double>");
  });

  it('should return string for boolean', function () {
    convertFn(true).should.be.exactly("<boolean>1</boolean>");
    convertFn(false).should.be.exactly("<boolean>0</boolean>");
  });

  it('should return empty string for date', function () {
    var input = new Date();
    var expected = '<dateTime.iso8601>' + input.toISOString() + '</dateTime.iso8601>';
    convertFn(input).should.be.exactly(expected);
  });

//  it('should return string for value', function () {
//    convertFn(new Error("Custom value")).should.be.exactly("<value>Custom value</value>");
//  });

  it('should return string for array', function () {
    var date = new Date();
    var expected = "<array>" +
      "<data>" +
      "<value>" +
      "<string>string value</string>" +
      "</value>" +
      "<value>" +
      "<int>456</int>" +
      "</value>" +
      "<value>" +
      "<dateTime.iso8601>" + date.toISOString() + "</dateTime.iso8601>" +
    "</value>" +
      "<value>" +
      "<boolean>1</boolean>" +
      "</value>" +
      "</data>" +
    "</array>";
    convertFn(["string value", 456, date, true]).should.be.exactly(expected);
  });

  it('should return string for object', function () {
    var input = {
      key1: "string value",
      key2: 123,
      key3: false,
      nestedKey: {
        nested1: "some string"
      },
      key4: ["hello world"]
    };
    var expected =
      "<struct>" +
        "<member>" +
        "<name>key1</name>" +
        "<value>" +
        "<string>string value</string>" +
        "</value>" +
        "</member>" +
        "<member>" +
        "<name>key2</name>" +
        "<value>" +
        "<int>123</int>" +
        "</value>" +
        "</member>" +
        "<member>" +
        "<name>key3</name>" +
        "<value>" +
        "<boolean>0</boolean>" +
        "</value>" +
        "</member>" +
        "<member>" +
        "<name>nestedKey</name>" +
        "<value>" +
        "<struct>" +
        "<member>" +
        "<name>nested1</name>" +
        "<value>" +
        "<string>some string</string>" +
        "</value>" +
        "</member>" +
        "</struct>" +
        "</value>" +
        "</member>" +
        "<member>" +
        "<name>key4</name>" +
        "<value>" +
        "<array>" +
        "<data>" +
        "<value>" +
        "<string>hello world</string>" +
        "</value>" +
        "</data>" +
        "</array>" +
        "</value>" +
        "</member>" +
        "</struct>";
    convertFn(input).should.be.exactly(expected);
  });
});
