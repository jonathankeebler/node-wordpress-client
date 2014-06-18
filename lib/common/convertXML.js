'use strict';

var _ = require('lodash');
var utils = require('./index');
var builder = require('xmlbuilder');

var solver = {
  /**
   * @param {*} data
   * @returns {string}
   */
  solve: function(data) {
    if (_.isDate(data)) {
      return this.date(data);
    }
    var solveFn = this[utils.typeOf(data)];
    if (_.isFunction(solveFn)) {
      return solveFn(data);
    }

    return this.value(data);
  },
  /**
   * @param {[]} data
   * @returns {string}
   */
  "array": function(data) {
    if (!_.isArray(data)) {
      throw new Error('Wrong type parameter. Array expected');
    }
    var arr = builder.create('array', {}, {}, {headless: true})
      .ele('data');
    data.forEach(function (element) {
      arr.ele('value')
        .raw(solver.solve(element));
    });
    return arr.end();
  },
  /**
   * @param {string|number} data
   * @returns {string}
   */
  "value": function (data) {
    return builder.create('value', {}, {}, {headless: true}).txt(data).end();
  },
  /**
   * @param {Date} data
   * @returns {string}
   */
  "date": function(data) {
    return "";
  },
  /**
   * @param {{}} data
   * @returns {string}
   */
  "object": function(data) {
    if (!_.isPlainObject(data)) {
      throw new Error('Wrong type parameter. Object expected');
    }
    var ret = builder.create('struct', {}, {}, {headless: true});
    var member;
    _.forEach(data, function(val, key) {
      member = ret.ele('member');
      member.ele('name', key);
      member.ele('value')
        .raw(solver.solve(val));
    });
    return ret.end();
  },
  /**
   * @param {string} data
   * @returns {string}
   */
  "string": function(data) {
    if (!_.isString(data)) {
      throw new Error('Wrong type parameter. String expected');
    }
    return builder.create('string', {}, {}, {headless: true}).txt(data).end();
  },
  /**
   * @param {number} data
   * @returns {string}
   */
  "number": function(data) {
    if (!_.isNumber(data)) {
      throw new Error('Wrong type parameter. Number expected');
    }
    return builder.create('int', {}, {}, {headless: true}).txt(data).end();
  },
  /**
   * @param {boolean} data
   * @returns {string}
   */
  "boolean": function (data) {
    if (!_.isBoolean(data)) {
      throw new Error('Wrong type parameter. Boolean expected');
    }
    return builder.create('boolean', {}, {}, {headless: true}).txt(((data === true) ? "1" : "0")).end();
  }
};

/**
 * @param {*} data
 * @returns {string}
 */
module.exports = function(data) {
  return solver.solve(data);
};
