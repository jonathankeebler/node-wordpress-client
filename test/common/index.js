'use strict';
var utils = require('../../lib/common/index');

describe('Common utils testing', function () {

  describe('is_number testing', function () {
    describe('should be a number', function () {
      it('String with number is number', function () {
        utils.is_numeric("1").should.be.true;
      });

      it('String number with plus sign is a number', function () {
        utils.is_numeric("+1").should.be.true;
      });

      it('String number with minus sign is a number', function () {
        utils.is_numeric("-1").should.be.true;
      });

      it('Zero is number', function () {
        utils.is_numeric(0).should.be.true;
      });

      it('Number written in exponential notation is number', function () {
        utils.is_numeric(12.3e-10).should.be.true;
      });

      it('Float number is a number', function () {
        utils.is_numeric(37.37).should.be.true;
      });

      it('Formatted number string with spaces is number', function () {
        utils.is_numeric("10 000").should.be.true;
      });
    });

    describe('should not be a number', function () {
      it('Empty string is not a number', function () {
        utils.is_numeric("").should.be.false;
      });

      it('NaN is not a number', function () {
        utils.is_numeric(NaN).should.be.false;
      });

      it('Undefined is not a number', function () {
        utils.is_numeric(void 0).should.be.false;
      });

      it('Array is not a number', function () {
        utils.is_numeric([]).should.be.false;
      });

      it('Object is not a number', function () {
        utils.is_numeric({}).should.be.false;
      });

      it('Date is not a number', function () {
        utils.is_numeric(new Date()).should.be.false;
      });

      it('String is not a number', function () {
        utils.is_numeric("Some string").should.be.false;
      });

      it('Infinity is not a number', function () {
        utils.is_numeric(0 / 0).should.be.false;
      });
    });
  });

  describe('Flatten testing', function () {
    it('should return empty string', function () {
      utils.flatten(null).should.be.exactly("");
    });

    it('should return empty string for undefined', function () {
      utils.flatten(void 0).should.be.exactly("");
    });

    it('should return input string', function () {
      utils.flatten("Simple string").should.be.exactly("Simple string");
    });

    it('should return string for number', function () {
      utils.flatten(123).should.be.exactly("123");
    });

    it('should return string for date', function () {
      utils.flatten(new Date(2014, 6, 17)).should.be.exactly("Wed, 16 Jul 2014 21:00:00 GMT");
    });

    it('should return string divided by coma for array', function () {
      utils.flatten(["Val1", 123, "value 2", new Date(2013, 10, 11)]).should.be.exactly("Val1,123,value 2,Sun, 10 Nov 2013 22:00:00 GMT");
    });

    it('should return string divided by semicolon for nested object', function () {
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
      var expect = "key1:string value;key2:1234;key3:;key4:Thu, 31 Jul 2014 21:00:00 GMT;key5.sub5_1:string value;key5.sub5_2:654;key5.sub5_3:;key5.sub5_4:;key5.sub5_5:;key5.sub5_6.subsub5_6_1:string value";
      utils.flatten(input).should.be.exactly(expect);
    });
  });

  describe('TypeOf testing', function () {
    it('should return array', function () {
      utils.typeOf([]).should.be.exactly("array");
    });

    it('should return object', function () {
      utils.typeOf({}).should.be.exactly("object");
    });

    it('should return string', function () {
      utils.typeOf("").should.be.exactly("string");
    });

    it('should return number', function () {
      utils.typeOf(123).should.be.exactly("number");
    });

    it('should return null', function () {
      utils.typeOf(null).should.be.exactly("null");
    });

    it('should return undefined', function () {
      utils.typeOf(void 0).should.be.exactly("undefined");
    });

    it('should return boolean', function () {
      utils.typeOf(true).should.be.exactly("boolean");
    });

    it('should return date', function () {
      utils.typeOf(new Date()).should.be.exactly("object");
    });
  });

  describe('To XML testing', function () {
    it('should return xml string for object', function () {
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
    });
  });

});
