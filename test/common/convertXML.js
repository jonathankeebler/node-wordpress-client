if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/common/convertXML.js'] === 'undefined'){_$jscoverage['lib/common/convertXML.js']=[];
_$jscoverage['lib/common/convertXML.js'].source=['\'use strict\';',
'',
'/**',
' *',
' * @constructor',
' * @source wordpress-rpc/lib/convertXML.js',
' * @returns {Convert}',
' */',
'var convert = function () {',
'  return this;',
'};',
'var c = new convert();',
'',
'convert.prototype.solve = function (data) {',
'',
'  if (data instanceof Array) {',
'    return c.array(data);',
'  }',
'  if (data instanceof Date) {',
'    return c.date(data);',
'  }',
'  if (typeof c[typeof data] === \'function\') {',
'    return c[typeof data](data);',
'  }',
'  return c.value(data);',
'};',
'',
'convert.prototype.object = function (data) {',
'  var ret = "<struct>";',
'  // TODO: make it with forEach',
'  for (var name in data) {',
'    ret += "<member>";',
'    ret += "<name>" + name + "</name>";',
'    ret += "<value>" + c.solve(data[name]) + "</value>";',
'    ret += "</member>";',
'  }',
'  return ret + "</struct>";',
'};',
'',
'convert.prototype.array = function (data) {',
'  var ret = "<array><data>";',
'  for (var i in data) {',
'    ret += "<value>" + c.solve(data[i]) + "</value>";',
'  }',
'  return ret + "</data></array>";',
'};',
'',
'convert.prototype.date = function (data) {',
'};',
'',
'convert.prototype.string = function (data) {',
'  return "<string>" + data + "</string>";',
'};',
'',
'convert.prototype.number = function (data) {',
'  return "<int>" + data + "</int>";',
'};',
'',
'convert.prototype.boolean = function (data) {',
'  return "<boolean>" + ((data === true) ? "1" : "0") + "</boolean>";',
'};',
'',
'convert.prototype.value = function (data) {',
'  return "<value>" + data + "</value>";',
'};',
'',
'module.exports = convert;',
''];
_$jscoverage['lib/common/convertXML.js'][31]=0;
_$jscoverage['lib/common/convertXML.js'][1]=0;
_$jscoverage['lib/common/convertXML.js'][37]=0;
_$jscoverage['lib/common/convertXML.js'][9]=0;
_$jscoverage['lib/common/convertXML.js'][28]=0;
_$jscoverage['lib/common/convertXML.js'][17]=0;
_$jscoverage['lib/common/convertXML.js'][16]=0;
_$jscoverage['lib/common/convertXML.js'][12]=0;
_$jscoverage['lib/common/convertXML.js'][10]=0;
_$jscoverage['lib/common/convertXML.js'][14]=0;
_$jscoverage['lib/common/convertXML.js'][42]=0;
_$jscoverage['lib/common/convertXML.js'][25]=0;
_$jscoverage['lib/common/convertXML.js'][22]=0;
_$jscoverage['lib/common/convertXML.js'][20]=0;
_$jscoverage['lib/common/convertXML.js'][19]=0;
_$jscoverage['lib/common/convertXML.js'][23]=0;
_$jscoverage['lib/common/convertXML.js'][48]=0;
_$jscoverage['lib/common/convertXML.js'][35]=0;
_$jscoverage['lib/common/convertXML.js'][33]=0;
_$jscoverage['lib/common/convertXML.js'][32]=0;
_$jscoverage['lib/common/convertXML.js'][34]=0;
_$jscoverage['lib/common/convertXML.js'][29]=0;
_$jscoverage['lib/common/convertXML.js'][56]=0;
_$jscoverage['lib/common/convertXML.js'][43]=0;
_$jscoverage['lib/common/convertXML.js'][40]=0;
_$jscoverage['lib/common/convertXML.js'][41]=0;
_$jscoverage['lib/common/convertXML.js'][45]=0;
_$jscoverage['lib/common/convertXML.js'][51]=0;
_$jscoverage['lib/common/convertXML.js'][52]=0;
_$jscoverage['lib/common/convertXML.js'][55]=0;
_$jscoverage['lib/common/convertXML.js'][59]=0;
_$jscoverage['lib/common/convertXML.js'][60]=0;
_$jscoverage['lib/common/convertXML.js'][63]=0;
_$jscoverage['lib/common/convertXML.js'][64]=0;
_$jscoverage['lib/common/convertXML.js'][67]=0;
}_$jscoverage['lib/common/convertXML.js'][1]++;
'use strict';

/**
 *
 * @constructor
 * @source wordpress-rpc/lib/convertXML.js
 * @returns {Convert}
 */
_$jscoverage['lib/common/convertXML.js'][9]++;
var convert = function () {
  _$jscoverage['lib/common/convertXML.js'][10]++;
return this;
};
_$jscoverage['lib/common/convertXML.js'][12]++;
var c = new convert();

_$jscoverage['lib/common/convertXML.js'][14]++;
convert.prototype.solve = function (data) {

  _$jscoverage['lib/common/convertXML.js'][16]++;
if (data instanceof Array) {
    _$jscoverage['lib/common/convertXML.js'][17]++;
return c.array(data);
  }
  _$jscoverage['lib/common/convertXML.js'][19]++;
if (data instanceof Date) {
    _$jscoverage['lib/common/convertXML.js'][20]++;
return c.date(data);
  }
  _$jscoverage['lib/common/convertXML.js'][22]++;
if (typeof c[typeof data] === 'function') {
    _$jscoverage['lib/common/convertXML.js'][23]++;
return c[typeof data](data);
  }
  _$jscoverage['lib/common/convertXML.js'][25]++;
return c.value(data);
};

_$jscoverage['lib/common/convertXML.js'][28]++;
convert.prototype.object = function (data) {
  _$jscoverage['lib/common/convertXML.js'][29]++;
var ret = "<struct>";
  // TODO: make it with forEach
  _$jscoverage['lib/common/convertXML.js'][31]++;
for (var name in data) {
    _$jscoverage['lib/common/convertXML.js'][32]++;
ret += "<member>";
    _$jscoverage['lib/common/convertXML.js'][33]++;
ret += "<name>" + name + "</name>";
    _$jscoverage['lib/common/convertXML.js'][34]++;
ret += "<value>" + c.solve(data[name]) + "</value>";
    _$jscoverage['lib/common/convertXML.js'][35]++;
ret += "</member>";
  }
  _$jscoverage['lib/common/convertXML.js'][37]++;
return ret + "</struct>";
};

_$jscoverage['lib/common/convertXML.js'][40]++;
convert.prototype.array = function (data) {
  _$jscoverage['lib/common/convertXML.js'][41]++;
var ret = "<array><data>";
  _$jscoverage['lib/common/convertXML.js'][42]++;
for (var i in data) {
    _$jscoverage['lib/common/convertXML.js'][43]++;
ret += "<value>" + c.solve(data[i]) + "</value>";
  }
  _$jscoverage['lib/common/convertXML.js'][45]++;
return ret + "</data></array>";
};

_$jscoverage['lib/common/convertXML.js'][48]++;
convert.prototype.date = function (data) {
};

_$jscoverage['lib/common/convertXML.js'][51]++;
convert.prototype.string = function (data) {
  _$jscoverage['lib/common/convertXML.js'][52]++;
return "<string>" + data + "</string>";
};

_$jscoverage['lib/common/convertXML.js'][55]++;
convert.prototype.number = function (data) {
  _$jscoverage['lib/common/convertXML.js'][56]++;
return "<int>" + data + "</int>";
};

_$jscoverage['lib/common/convertXML.js'][59]++;
convert.prototype.boolean = function (data) {
  _$jscoverage['lib/common/convertXML.js'][60]++;
return "<boolean>" + ((data === true) ? "1" : "0") + "</boolean>";
};

_$jscoverage['lib/common/convertXML.js'][63]++;
convert.prototype.value = function (data) {
  _$jscoverage['lib/common/convertXML.js'][64]++;
return "<value>" + data + "</value>";
};

_$jscoverage['lib/common/convertXML.js'][67]++;
module.exports = convert;
