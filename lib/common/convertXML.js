'use strict';

/**
 *
 * @constructor
 * @source wordpress-rpc/lib/convertXML.js
 * @returns {Convert}
 */
var convert = function () {
  return this;
};
var c = new convert();

convert.prototype.solve = function (data) {

  if (data instanceof Array) {
    return c.array(data);
  }
  if (data instanceof Date) {
    return c.date(data);
  }
  if (typeof c[typeof data] === 'function') {
    return c[typeof data](data);
  }
  return c.value(data);
};

convert.prototype.object = function (data) {
  var ret = "<struct>";
  // TODO: make it with forEach
  for (var name in data) {
    ret += "<member>";
    ret += "<name>" + name + "</name>";
    ret += "<value>" + c.solve(data[name]) + "</value>";
    ret += "</member>";
  }
  return ret + "</struct>";
};

convert.prototype.array = function (data) {
  var ret = "<array><data>";
  for (var i in data) {
    ret += "<value>" + c.solve(data[i]) + "</value>";
  }
  return ret + "</data></array>";
};

convert.prototype.date = function (data) {
};

convert.prototype.string = function (data) {
  return "<string>" + data + "</string>";
};

convert.prototype.number = function (data) {
  return "<int>" + data + "</int>";
};

convert.prototype.boolean = function (data) {
  return "<boolean>" + ((data === true) ? "1" : "0") + "</boolean>";
};

convert.prototype.value = function (data) {
  return "<value>" + data + "</value>";
};

module.exports = convert;
