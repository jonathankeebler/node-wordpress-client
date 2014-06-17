if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/common/convertJS.js'] === 'undefined'){_$jscoverage['lib/common/convertJS.js']=[];
_$jscoverage['lib/common/convertJS.js'].source=['\'use strict\';',
'',
'/**',
' * @constructor',
' * @source wordpress-rpc/lib/convertJS.js',
' * @returns {Convert}',
' */',
'var Convert = function () {',
'  return this;',
'};',
'',
'var c = new Convert();',
'',
'Convert.prototype.solve = function (data) {',
'  var self = this;',
'  var result;',
'  data.forEach(function(element) {',
'    if (typeof self[element] !== \'undefined\') {',
'      result = self[element](data);',
'    }',
'  });',
'  return result;',
'};',
'',
'Convert.prototype.methodResponse = function (data) {',
'  var value;',
'',
'  if (typeof data.methodResponse.params !== \'undefined\') {',
'    value = data.methodResponse.params.param.value || [];',
'  }',
'  else if (typeof data.methodResponse.fault !== \'undefined\') {',
'    value = data.methodResponse.fault.value || [];',
'  }',
'  else {',
'    throw JSON.stringify(data);',
'  }',
'',
'  var arr = [];',
'  value = (value instanceof Array) ? value : [value];',
'  value.forEach(function (element) {',
'    arr.push(c.solve(element));',
'  });',
'  // todo: by fault no prams',
'  return {methodResponse: {params: arr}};',
'};',
'',
'Convert.prototype.array = function (data) {',
'  data = data.array.data.value || [];',
'  var arr = [];',
'',
'  if (typeof data !== \'undefined\') {',
'    data = (data instanceof Array) ? data : [data];',
'  }',
'  data.forEach(function (element) {',
'    arr.push(c.solve(element));',
'  });',
'  return arr;',
'};',
'',
'Convert.prototype[\'dateTime.iso8601\'] = function (data) {',
'  // todo: umwandeln in ordentliche DateObject',
'  return data[\'dateTime.iso8601\'];',
'};',
'',
'Convert.prototype.int = function (data) {',
'  return (!isNaN(data.int)) ? Number(data.int) : null;',
'};',
'',
'Convert.prototype.string = function (data) {',
'  return (typeof data.string === \'string\') ? data.string : "";',
'};',
'',
'Convert.prototype.struct = function (data) {',
'  data = data.struct.member || [];',
'  data = (data instanceof Array) ? data : [data];',
'',
'  var struct = {};',
'  data.forEach(function (element) {',
'    struct[element.name] = c.solve(element.value);',
'  });',
'  return struct;',
'};',
'',
'Convert.prototype.boolean = function (data) {',
'  return (data.boolean === \'1\') ? true',
'    : (data.boolean === \'0\') ? false',
'    : data;',
'};',
'',
'module.exports = Convert;',
''];
_$jscoverage['lib/common/convertJS.js'][48]=0;
_$jscoverage['lib/common/convertJS.js'][1]=0;
_$jscoverage['lib/common/convertJS.js'][49]=0;
_$jscoverage['lib/common/convertJS.js'][8]=0;
_$jscoverage['lib/common/convertJS.js'][52]=0;
_$jscoverage['lib/common/convertJS.js'][15]=0;
_$jscoverage['lib/common/convertJS.js'][12]=0;
_$jscoverage['lib/common/convertJS.js'][9]=0;
_$jscoverage['lib/common/convertJS.js'][14]=0;
_$jscoverage['lib/common/convertJS.js'][54]=0;
_$jscoverage['lib/common/convertJS.js'][22]=0;
_$jscoverage['lib/common/convertJS.js'][17]=0;
_$jscoverage['lib/common/convertJS.js'][16]=0;
_$jscoverage['lib/common/convertJS.js'][19]=0;
_$jscoverage['lib/common/convertJS.js'][18]=0;
_$jscoverage['lib/common/convertJS.js'][62]=0;
_$jscoverage['lib/common/convertJS.js'][31]=0;
_$jscoverage['lib/common/convertJS.js'][28]=0;
_$jscoverage['lib/common/convertJS.js'][26]=0;
_$jscoverage['lib/common/convertJS.js'][29]=0;
_$jscoverage['lib/common/convertJS.js'][25]=0;
_$jscoverage['lib/common/convertJS.js'][65]=0;
_$jscoverage['lib/common/convertJS.js'][44]=0;
_$jscoverage['lib/common/convertJS.js'][35]=0;
_$jscoverage['lib/common/convertJS.js'][32]=0;
_$jscoverage['lib/common/convertJS.js'][41]=0;
_$jscoverage['lib/common/convertJS.js'][40]=0;
_$jscoverage['lib/common/convertJS.js'][38]=0;
_$jscoverage['lib/common/convertJS.js'][39]=0;
_$jscoverage['lib/common/convertJS.js'][75]=0;
_$jscoverage['lib/common/convertJS.js'][57]=0;
_$jscoverage['lib/common/convertJS.js'][55]=0;
_$jscoverage['lib/common/convertJS.js'][47]=0;
_$jscoverage['lib/common/convertJS.js'][51]=0;
_$jscoverage['lib/common/convertJS.js'][79]=0;
_$jscoverage['lib/common/convertJS.js'][66]=0;
_$jscoverage['lib/common/convertJS.js'][60]=0;
_$jscoverage['lib/common/convertJS.js'][69]=0;
_$jscoverage['lib/common/convertJS.js'][70]=0;
_$jscoverage['lib/common/convertJS.js'][73]=0;
_$jscoverage['lib/common/convertJS.js'][74]=0;
_$jscoverage['lib/common/convertJS.js'][77]=0;
_$jscoverage['lib/common/convertJS.js'][78]=0;
_$jscoverage['lib/common/convertJS.js'][81]=0;
_$jscoverage['lib/common/convertJS.js'][84]=0;
_$jscoverage['lib/common/convertJS.js'][85]=0;
_$jscoverage['lib/common/convertJS.js'][90]=0;
}_$jscoverage['lib/common/convertJS.js'][1]++;
'use strict';

/**
 * @constructor
 * @source wordpress-rpc/lib/convertJS.js
 * @returns {Convert}
 */
_$jscoverage['lib/common/convertJS.js'][8]++;
var Convert = function () {
  _$jscoverage['lib/common/convertJS.js'][9]++;
return this;
};

_$jscoverage['lib/common/convertJS.js'][12]++;
var c = new Convert();

_$jscoverage['lib/common/convertJS.js'][14]++;
Convert.prototype.solve = function (data) {
  _$jscoverage['lib/common/convertJS.js'][15]++;
var self = this;
  _$jscoverage['lib/common/convertJS.js'][16]++;
var result;
  _$jscoverage['lib/common/convertJS.js'][17]++;
data.forEach(function(element) {
    _$jscoverage['lib/common/convertJS.js'][18]++;
if (typeof self[element] !== 'undefined') {
      _$jscoverage['lib/common/convertJS.js'][19]++;
result = self[element](data);
    }
  });
  _$jscoverage['lib/common/convertJS.js'][22]++;
return result;
};

_$jscoverage['lib/common/convertJS.js'][25]++;
Convert.prototype.methodResponse = function (data) {
  _$jscoverage['lib/common/convertJS.js'][26]++;
var value;

  _$jscoverage['lib/common/convertJS.js'][28]++;
if (typeof data.methodResponse.params !== 'undefined') {
    _$jscoverage['lib/common/convertJS.js'][29]++;
value = data.methodResponse.params.param.value || [];
  }
  else {
_$jscoverage['lib/common/convertJS.js'][31]++;
if (typeof data.methodResponse.fault !== 'undefined') {
    _$jscoverage['lib/common/convertJS.js'][32]++;
value = data.methodResponse.fault.value || [];
  }
  else {
    _$jscoverage['lib/common/convertJS.js'][35]++;
throw JSON.stringify(data);
  }}


  _$jscoverage['lib/common/convertJS.js'][38]++;
var arr = [];
  _$jscoverage['lib/common/convertJS.js'][39]++;
value = (value instanceof Array) ? value : [value];
  _$jscoverage['lib/common/convertJS.js'][40]++;
value.forEach(function (element) {
    _$jscoverage['lib/common/convertJS.js'][41]++;
arr.push(c.solve(element));
  });
  // todo: by fault no prams
  _$jscoverage['lib/common/convertJS.js'][44]++;
return {methodResponse: {params: arr}};
};

_$jscoverage['lib/common/convertJS.js'][47]++;
Convert.prototype.array = function (data) {
  _$jscoverage['lib/common/convertJS.js'][48]++;
data = data.array.data.value || [];
  _$jscoverage['lib/common/convertJS.js'][49]++;
var arr = [];

  _$jscoverage['lib/common/convertJS.js'][51]++;
if (typeof data !== 'undefined') {
    _$jscoverage['lib/common/convertJS.js'][52]++;
data = (data instanceof Array) ? data : [data];
  }
  _$jscoverage['lib/common/convertJS.js'][54]++;
data.forEach(function (element) {
    _$jscoverage['lib/common/convertJS.js'][55]++;
arr.push(c.solve(element));
  });
  _$jscoverage['lib/common/convertJS.js'][57]++;
return arr;
};

_$jscoverage['lib/common/convertJS.js'][60]++;
Convert.prototype['dateTime.iso8601'] = function (data) {
  // todo: umwandeln in ordentliche DateObject
  _$jscoverage['lib/common/convertJS.js'][62]++;
return data['dateTime.iso8601'];
};

_$jscoverage['lib/common/convertJS.js'][65]++;
Convert.prototype.int = function (data) {
  _$jscoverage['lib/common/convertJS.js'][66]++;
return (!isNaN(data.int)) ? Number(data.int) : null;
};

_$jscoverage['lib/common/convertJS.js'][69]++;
Convert.prototype.string = function (data) {
  _$jscoverage['lib/common/convertJS.js'][70]++;
return (typeof data.string === 'string') ? data.string : "";
};

_$jscoverage['lib/common/convertJS.js'][73]++;
Convert.prototype.struct = function (data) {
  _$jscoverage['lib/common/convertJS.js'][74]++;
data = data.struct.member || [];
  _$jscoverage['lib/common/convertJS.js'][75]++;
data = (data instanceof Array) ? data : [data];

  _$jscoverage['lib/common/convertJS.js'][77]++;
var struct = {};
  _$jscoverage['lib/common/convertJS.js'][78]++;
data.forEach(function (element) {
    _$jscoverage['lib/common/convertJS.js'][79]++;
struct[element.name] = c.solve(element.value);
  });
  _$jscoverage['lib/common/convertJS.js'][81]++;
return struct;
};

_$jscoverage['lib/common/convertJS.js'][84]++;
Convert.prototype.boolean = function (data) {
  _$jscoverage['lib/common/convertJS.js'][85]++;
return (data.boolean === '1') ? true
    : (data.boolean === '0') ? false
    : data;
};

_$jscoverage['lib/common/convertJS.js'][90]++;
module.exports = Convert;
