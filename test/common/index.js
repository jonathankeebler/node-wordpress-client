'use strict';
var utils = require('../../lib/common/index');

module.exports = {
  'Common utils testing': {

    'is_number testing': {
      'should be a number': {

        'String with number is number': function () {
          utils.is_numeric("1").should.be.true;
        },

        'String number with plus sign is a number': function () {
          utils.is_numeric("+1").should.be.true;
        },

        'String number with minus sign is a number': function () {
          utils.is_numeric("-1").should.be.true;
        },

        'Zero is number': function () {
          utils.is_numeric(0).should.be.true;
        },

        'Number written in exponential notation is number': function () {
          utils.is_numeric(12.3e-10).should.be.true;
        },

        'Float number is a number': function () {
          utils.is_numeric(37.37).should.be.true;
        },

        'Formatted number string with spaces is number': function () {
          utils.is_numeric("10 000").should.be.true;
        }
      },

      'should not be a number': {
        'Empty string is not a number': function () {
          utils.is_numeric("").should.be.false;
        },

        'NaN is not a number': function () {
          utils.is_numeric(NaN).should.be.false;
        },

        'Undefined is not a number': function () {
          utils.is_numeric(void 0).should.be.false;
        },

        'Array is not a number': function () {
          utils.is_numeric([]).should.be.false;
        },

        'Object is not a number': function () {
          utils.is_numeric({}).should.be.false;
        },

        'Date is not a number': function () {
          utils.is_numeric(new Date()).should.be.false;
        },

        'String is not a number': function () {
          utils.is_numeric("Some string").should.be.false;
        },

        'Infinity is not a number': function () {
          utils.is_numeric(0 / 0).should.be.false;
        }
      }
    },

    'Flatten testing': {
      'should return empty string': function () {
        utils.flatten(null).should.be.exactly("");
      },

      'should return empty string for undefined': function () {
        utils.flatten(void 0).should.be.exactly("");
      },

      'should return input string': function () {
        utils.flatten("Simple string").should.be.exactly("Simple string");
      },

      'should return string for number': function () {
        utils.flatten(123).should.be.exactly("123");
      },

      'should return string for date': function () {
        utils.flatten(new Date(2014, 6, 17)).should.be.exactly("2014-07-16T21:00:00.000Z");
      },

      'should return string divided by coma for array': function () {
        utils.flatten(["Val1", 123, "value 2", new Date(2013, 10, 11)]).should.be.exactly("Val1,123,value 2,2013-11-10T22:00:00.000Z");
      },

      'should return string divided by semicolon for nested object': function () {
        var input = {
          "key1": "string value",
          "key2": 1234,
          "key3": null,
          "key4": new Date(2014, 7, 1),
          "key5": {
            "sub5.1": "string value",
            "sub5.2": 654,
            "sub5.3": {},
            "sub5.4": [],
            "sub5.5": null,
            "sub5.6": {
              "subsub5.6.1": "string value"
            }
          }
        };
        var expect = "key1:string value;key2:1234;key3:;key4:2014-07-31T21:00:00.000Z;key5.sub5_1:string value;key5.sub5_2:654;key5.sub5_3:;key5.sub5_4:;key5.sub5_5:;key5.sub5_6.subsub5_6_1:string value";
        utils.flatten(input).should.be.exactly(expect);
      }
    },

    'TypeOf testing': {
      'should return array': function () {
        utils.typeOf([]).should.be.exactly("array");
      },

      'should return object': function () {
        utils.typeOf({}).should.be.exactly("object");
      },

      'should return string': function () {
        utils.typeOf("").should.be.exactly("string");
      },

      'should return number': function () {
        utils.typeOf(123).should.be.exactly("number");
      },

      'should return null': function () {
        utils.typeOf(null).should.be.exactly("null");
      },

      'should return undefined': function () {
        utils.typeOf(void 0).should.be.exactly("undefined");
      },

      'should return boolean': function () {
        utils.typeOf(true).should.be.exactly("boolean");
      },

      'should return date': function () {
        utils.typeOf(new Date()).should.be.exactly("object");
      }
    },

    'To XML testing': {
      'should return xml string for object': function () {
        var expected =
          "<methodCall>" +
            "<methodName>method</methodName>" +
            "<params>" +
            "<string>string</string>" +
            "<int>456</int>" +
            "<struct>" +
            "<member>" +
            "<name>key1</name>" +
            "<value>" +
            "<string>string2</string>" +
            "</value>" +
            "</member>" +
            "</struct>" +
            "</params>" +
            "</methodCall>";
        utils.toXML('method', ['string', 456, { key1: "string2" }]).should.be.exactly(expected);
      }
    },

    'Trim testing': {
      'should trim array items': function () {
        var input = [
          '    Hello World',
          'World   ',
          '  testing   '
        ];
        utils.trim(input).should.be.eql(['Hello World', 'World', 'testing']);
      },

      'should return empty array if no input passed': function () {
        utils.trim(void 0).should.be.eql([]);
        utils.trim(null).should.be.eql([]);
        utils.trim(true).should.be.eql([]);
        utils.trim("Hello World").should.be.eql([]);
      }
    }
  }
};
