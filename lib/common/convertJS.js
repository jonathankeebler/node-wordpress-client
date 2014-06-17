'use strict';

/**
 * @constructor
 * @source wordpress-rpc/lib/convertJS.js
 * @returns {Convert}
 */
var Convert = function () {
  return this;
};

var c = new Convert();

Convert.prototype.solve = function (data) {
  var self = this;
  var result;
  data.forEach(function(element) {
    if (typeof self[element] !== 'undefined') {
      result = self[element](data);
    }
  });
  return result;
};

Convert.prototype.methodResponse = function (data) {
  var value;

  if (typeof data.methodResponse.params !== 'undefined') {
    value = data.methodResponse.params.param.value || [];
  }
  else if (typeof data.methodResponse.fault !== 'undefined') {
    value = data.methodResponse.fault.value || [];
  }
  else {
    throw JSON.stringify(data);
  }

  var arr = [];
  value = (value instanceof Array) ? value : [value];
  value.forEach(function (element) {
    arr.push(c.solve(element));
  });
  // todo: by fault no prams
  return {methodResponse: {params: arr}};
};

Convert.prototype.array = function (data) {
  data = data.array.data.value || [];
  var arr = [];

  if (typeof data !== 'undefined') {
    data = (data instanceof Array) ? data : [data];
  }
  data.forEach(function (element) {
    arr.push(c.solve(element));
  });
  return arr;
};

Convert.prototype['dateTime.iso8601'] = function (data) {
  // todo: umwandeln in ordentliche DateObject
  return data['dateTime.iso8601'];
};

Convert.prototype.int = function (data) {
  return (!isNaN(data.int)) ? Number(data.int) : null;
};

Convert.prototype.string = function (data) {
  return (typeof data.string === 'string') ? data.string : "";
};

Convert.prototype.struct = function (data) {
  data = data.struct.member || [];
  data = (data instanceof Array) ? data : [data];

  var struct = {};
  data.forEach(function (element) {
    struct[element.name] = c.solve(element.value);
  });
  return struct;
};

Convert.prototype.boolean = function (data) {
  return (data.boolean === '1') ? true
    : (data.boolean === '0') ? false
    : data;
};

module.exports = Convert;
