'use strict';
/**
 * @fileOverview Common Utility Methods
 */

var util = require('util');
var _ = require('lodash');

/**
 * Check if input is Numeric
 *
 * @param {string|number} input
 * @returns {boolean}
 */
exports.is_numeric = function (input) {
  var res = parseFloat(String(input).replace(/\s/g, ""));
  return _.isNumber(res) && !_.isNaN(res);
};

/**
 * @param {{}} obj
 * @param {string} parentKey
 * @returns {string}
 */
exports.flatten = function flatten(obj, parentKey) {
  if (obj == null) {
    return "";
  }

  if (_.isString(obj)) {
    return obj;
  }

  if (_.isNumber(obj)) {
    return String(obj);
  }

  if (_.isDate(obj)) {
    return obj.toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      return flatten(item);
    }).join(",");
  }

  var result = Object.keys(obj).sort().map(function (key) {
    var normalizedKey = key.replace(/\./g, "_"); // replace all dots in keys to prevent collisions
    var prefix = parentKey && parentKey.length ? parentKey + '.' : '';
    var prefixedKey = prefix + normalizedKey;

    if (_.isPlainObject(obj[key]) && _.size(obj[key])) {
      parentKey = prefixedKey;
      return flatten(obj[key], parentKey);
    }

    return prefixedKey + ":" + flatten(obj[key]);
  }).join(";");

  return result.replace(/;+/g, ';');
};

/**
 * @param {{}} obj
 * @returns {*}
 */
exports.createChecksum = function (obj) {
  var crypto = require("crypto");
  var md5 = crypto.createHash("md5");
  md5.update(this.flatten(obj), "utf8");
  return md5.digest("hex");
};

/**
 * @param {string} method
 * @param {[]} parameter
 * @returns {string}
 */
exports.toXML = function (method, parameter) {
  var builder = require('xmlbuilder');
  var solveFn = require('./convertXML');
  var rpc = builder.create('methodCall', {}, {}, {headless: true});
  rpc.ele('methodName', method);

  var params = rpc.ele('params');
  parameter.forEach(function (param) {
    params.raw(solveFn(param));
  });

  return rpc.end();
};

/**
 * @param {string} xml
 * @param {function} callback
 */
exports.fromXML = function (xml, callback) {
  var xml2js = require('xml2js');
  var ConvertJS = require('./convertJS.js');

  function doCallback(json) {
    var c = new ConvertJS();
    json = c.solve(json);
    callback(null, json);
  }

  new xml2js.Parser({explicitArray: false, mergeAttrs: true}).addListener('end', doCallback).parseString(xml);
};

/**
 * Imported from google closure library
 * https://github.com/google/closure-library/blob/master/closure/goog/base.js#L797
 *
 * This is a "fixed" version of the typeof operator.  It differs from the typeof
 * operator in such a way that null returns 'null' and arrays return 'array'.
 * @param {*} value The value to get the type of.
 * @return {string} The name of the type.
 */
exports.typeOf = function (value) {
  var s = typeof value;
  if (s === 'object') {
    if (value) {
      // Check these first, so we can avoid calling Object.prototype.toString if
      // possible.
      //
      // IE improperly marshals tyepof across execution contexts, but a
      // cross-context object will still return false for "instanceof Object".
      if (value instanceof Array) {
        return 'array';
      } else if (value instanceof Object) {
        return s;
      }

      // HACK: In order to use an Object prototype method on the arbitrary
      //   value, the compiler requires the value be cast to type Object,
      //   even though the ECMA spec explicitly allows it.
      var className = Object.prototype.toString.call(
        /** @type {Object} */ (value));
      // In Firefox 3.6, attempting to access iframe window objects' length
      // property throws an NS_ERROR_FAILURE, so we need to special-case it
      // here.
      if (className === '[object Window]') {
        return 'object';
      }

      // We cannot always use constructor == Array or instanceof Array because
      // different frames have different Array objects. In IE6, if the iframe
      // where the array was created is destroyed, the array loses its
      // prototype. Then dereferencing val.splice here throws an exception, so
      // we can't use goog.isFunction. Calling typeof directly returns 'unknown'
      // so that will work. In this case, this function will return false and
      // most array functions will still work because the array is still
      // array-like (supports length and []) even though it has lost its
      // prototype.
      // Mark Miller noticed that Object.prototype.toString
      // allows access to the unforgeable [[Class]] property.
      //  15.2.4.2 Object.prototype.toString ( )
      //  When the toString method is called, the following steps are taken:
      //      1. Get the [[Class]] property of this object.
      //      2. Compute a string value by concatenating the three strings
      //         "[object ", Result(1), and "]".
      //      3. Return Result(2).
      // and this behavior survives the destruction of the execution context.
      if ((className === '[object Array]' ||
        // In IE all non value types are wrapped as objects across window
        // boundaries (not iframe though) so we have to do object detection
        // for this edge case.
        typeof value.length === 'number' &&
          typeof value.splice !== 'undefined' &&
          typeof value.propertyIsEnumerable !== 'undefined' && !value.propertyIsEnumerable('splice')

        )) {
        return 'array';
      }
      // HACK: There is still an array case that fails.
      //     function ArrayImpostor() {}
      //     ArrayImpostor.prototype = [];
      //     var impostor = new ArrayImpostor;
      // this can be fixed by getting rid of the fast path
      // (value instanceof Array) and solely relying on
      // (value && Object.prototype.toString.vall(value) === '[object Array]')
      // but that would require many more function calls and is not warranted
      // unless closure code is receiving objects from untrusted sources.

      // IE in cross-window calls does not correctly marshal the function type
      // (it appears just as an object) so we cannot use just typeof val ==
      // 'function'. However, if the object has a call property, it is a
      // function.
      if ((className === '[object Function]' ||
        typeof value.call !== 'undefined' &&
          typeof value.propertyIsEnumerable !== 'undefined' && !value.propertyIsEnumerable('call'))) {
        return 'function';
      }

    } else {
      return 'null';
    }

  } else if (s === 'function' && typeof value.call === 'undefined') {
    // In Safari typeof nodeList returns 'function', and on Firefox typeof
    // behaves similarly for HTML{Applet,Embed,Object}, Elements and RegExps. We
    // would like to return object for those and we can detect an invalid
    // function by making sure that the function object has a call method.
    return 'object';
  }
  return s;
};

/**
 *
 * @param {[]} data
 */
exports.trim = function(data) {
  if (!_.isArray(data)) {
    return [];
  }
  return data.map(function(element) {
    return String(element).trim();
  });
};

exports.addTrailSlash = function () {

};

exports.parseURL = require('url').parse;
exports.getMime = require('mime').lookup;
exports.createClient = require('wordpress').createClient;

