if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/common/index.js'] === 'undefined'){_$jscoverage['lib/common/index.js']=[];
_$jscoverage['lib/common/index.js'].source=['\'use strict\';',
'var util = require(\'util\');',
'',
'/**',
' * Common Utility Methods',
' *',
' */',
'Object.defineProperties( module.exports, {',
'  is_numeric: {',
'    /**',
'     * Check if Value is Numeric',
'     * @param input',
'     * @returns {boolean}',
'     */',
'    value: function is_numeric( input ) {',
'      return (input - 0) === input && (\'\'+input).replace(/^\\s+|\\s+$/g, "").length > 0;',
'    },',
'    enumerable: true,',
'    configurable: true,',
'    writable: true',
'  },',
'  flatten: {',
'    /**',
'     *',
'     * @source grunt-wordpress',
'     * @param obj',
'     * @returns {*}',
'     */',
'    value: function flatten( obj ) {',
'      if ( obj == null ) {',
'        return "";',
'      }',
'',
'      if ( typeof obj === "string" ) {',
'        return obj;',
'      }',
'',
'      if ( typeof obj === "number" ) {',
'        return String( obj );',
'      }',
'',
'      if ( util.isDate( obj ) ) {',
'        return obj.toGMTString();',
'      }',
'',
'      if ( Array.isArray( obj ) ) {',
'        return obj.map(function( item ) {',
'          return flatten( item );',
'        }).join( "," );',
'      }',
'',
'      return Object.keys( obj ).sort().map(function( prop ) {',
'        return prop + ":" + flatten( obj[ prop ] );',
'      }).join( ";" );',
'',
'    },',
'    enumerable: true,',
'    configurable: true,',
'    writable: true',
'  },',
'  createChecksum: {',
'    /**',
'     *',
'     * @source grunt-wordpress',
'     * @param obj',
'     * @returns {*}',
'     */',
'    value: function createChecksum( obj ) {',
'      var crypto = require( "crypto" );',
'      var md5 = crypto.createHash( "md5" );',
'      md5.update( this.flatten( obj ), "utf8" );',
'      return md5.digest( "hex" );',
'    },',
'    enumerable: true,',
'    configurable: true,',
'    writable: true',
'  },',
'  parseURL: {',
'    value: require( \'url\' ).parse,',
'    enumerable: true,',
'    configurable: true,',
'    writable: true',
'  },',
'  getMime: {',
'    value: require( \'mime\' ).lookup,',
'    enumerable: true,',
'    configurable: true,',
'    writable: true',
'  },',
'  createClient: {',
'    value: require( \'wordpress\' ).createClient,',
'    enumerable: true,',
'    configurable: true,',
'    writable: true',
'  },',
'  toXML: {',
'    /**',
'     * @source wordpress-rpc/xml-rpc.js',
'     *',
'     * @param method',
'     * @param parameter',
'     * @param callback',
'     * @returns {string}',
'     */',
'    value: function toXML( method, parameter, callback ) {',
'',
'      var ConvertXML = require( \'./convertXML\' );',
'      var cXML = new ConvertXML();',
'      var str = "";',
'',
'      function convertParams () {',
'        var str = "<params>";',
'',
'        for (var i in parameter) {',
'          str += cXML.solve(parameter[i]);',
'        }',
'',
'        return str+"</params>";',
'',
'      }',
'',
'      str += \'<methodCall>\';',
'      str += \'<methodName>\' + method + \'</methodName>\';',
'      str += convertParams() + \'</methodCall>\';',
'',
'      return str;',
'    },',
'    enumerable: true,',
'    configurable: true,',
'    writable: true',
'  },',
'  fromXML: {',
'    /**',
'     *',
'     * @source wordpress-rpc/xml-rpc.js',
'     * @param xml',
'     * @param callback',
'     */',
'    value: function fromXML( xml, callback ) {',
'      var xml2js = require(\'xml2js\');',
'      var ConvertJS = require(\'./convertJS.js\');',
'',
'      function doCallback(json){',
'        var c = new ConvertJS();',
'        json = c.solve(json);',
'        callback(null, json);',
'      }',
'',
'      new xml2js.Parser({explicitArray  : false, mergeAttrs : true}).addListener(\'end\', doCallback).parseString(xml);',
'    },',
'    enumerable: true,',
'    configurable: true,',
'    writable: true',
'  }',
'});',
''];
_$jscoverage['lib/common/index.js'][107]=0;
_$jscoverage['lib/common/index.js'][1]=0;
_$jscoverage['lib/common/index.js'][108]=0;
_$jscoverage['lib/common/index.js'][8]=0;
_$jscoverage['lib/common/index.js'][2]=0;
_$jscoverage['lib/common/index.js'][109]=0;
_$jscoverage['lib/common/index.js'][16]=0;
_$jscoverage['lib/common/index.js'][112]=0;
_$jscoverage['lib/common/index.js'][35]=0;
_$jscoverage['lib/common/index.js'][34]=0;
_$jscoverage['lib/common/index.js'][31]=0;
_$jscoverage['lib/common/index.js'][30]=0;
_$jscoverage['lib/common/index.js'][118]=0;
_$jscoverage['lib/common/index.js'][39]=0;
_$jscoverage['lib/common/index.js'][38]=0;
_$jscoverage['lib/common/index.js'][111]=0;
_$jscoverage['lib/common/index.js'][47]=0;
_$jscoverage['lib/common/index.js'][46]=0;
_$jscoverage['lib/common/index.js'][43]=0;
_$jscoverage['lib/common/index.js'][42]=0;
_$jscoverage['lib/common/index.js'][124]=0;
_$jscoverage['lib/common/index.js'][48]=0;
_$jscoverage['lib/common/index.js'][126]=0;
_$jscoverage['lib/common/index.js'][52]=0;
_$jscoverage['lib/common/index.js'][140]=0;
_$jscoverage['lib/common/index.js'][71]=0;
_$jscoverage['lib/common/index.js'][70]=0;
_$jscoverage['lib/common/index.js'][69]=0;
_$jscoverage['lib/common/index.js'][53]=0;
_$jscoverage['lib/common/index.js'][144]=0;
_$jscoverage['lib/common/index.js'][115]=0;
_$jscoverage['lib/common/index.js'][72]=0;
_$jscoverage['lib/common/index.js'][114]=0;
_$jscoverage['lib/common/index.js'][122]=0;
_$jscoverage['lib/common/index.js'][123]=0;
_$jscoverage['lib/common/index.js'][141]=0;
_$jscoverage['lib/common/index.js'][143]=0;
_$jscoverage['lib/common/index.js'][145]=0;
_$jscoverage['lib/common/index.js'][146]=0;
_$jscoverage['lib/common/index.js'][149]=0;
}_$jscoverage['lib/common/index.js'][1]++;
'use strict';
_$jscoverage['lib/common/index.js'][2]++;
var util = require('util');

/**
 * Common Utility Methods
 *
 */
_$jscoverage['lib/common/index.js'][8]++;
Object.defineProperties( module.exports, {
  is_numeric: {
    /**
     * Check if Value is Numeric
     * @param input
     * @returns {boolean}
     */
    value: function is_numeric( input ) {
      _$jscoverage['lib/common/index.js'][16]++;
return (input - 0) === input && (''+input).replace(/^\s+|\s+$/g, "").length > 0;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  flatten: {
    /**
     *
     * @source grunt-wordpress
     * @param obj
     * @returns {*}
     */
    value: function flatten( obj ) {
      _$jscoverage['lib/common/index.js'][30]++;
if ( obj == null ) {
        _$jscoverage['lib/common/index.js'][31]++;
return "";
      }

      _$jscoverage['lib/common/index.js'][34]++;
if ( typeof obj === "string" ) {
        _$jscoverage['lib/common/index.js'][35]++;
return obj;
      }

      _$jscoverage['lib/common/index.js'][38]++;
if ( typeof obj === "number" ) {
        _$jscoverage['lib/common/index.js'][39]++;
return String( obj );
      }

      _$jscoverage['lib/common/index.js'][42]++;
if ( util.isDate( obj ) ) {
        _$jscoverage['lib/common/index.js'][43]++;
return obj.toGMTString();
      }

      _$jscoverage['lib/common/index.js'][46]++;
if ( Array.isArray( obj ) ) {
        _$jscoverage['lib/common/index.js'][47]++;
return obj.map(function( item ) {
          _$jscoverage['lib/common/index.js'][48]++;
return flatten( item );
        }).join( "," );
      }

      _$jscoverage['lib/common/index.js'][52]++;
return Object.keys( obj ).sort().map(function( prop ) {
        _$jscoverage['lib/common/index.js'][53]++;
return prop + ":" + flatten( obj[ prop ] );
      }).join( ";" );

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  createChecksum: {
    /**
     *
     * @source grunt-wordpress
     * @param obj
     * @returns {*}
     */
    value: function createChecksum( obj ) {
      _$jscoverage['lib/common/index.js'][69]++;
var crypto = require( "crypto" );
      _$jscoverage['lib/common/index.js'][70]++;
var md5 = crypto.createHash( "md5" );
      _$jscoverage['lib/common/index.js'][71]++;
md5.update( this.flatten( obj ), "utf8" );
      _$jscoverage['lib/common/index.js'][72]++;
return md5.digest( "hex" );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  parseURL: {
    value: require( 'url' ).parse,
    enumerable: true,
    configurable: true,
    writable: true
  },
  getMime: {
    value: require( 'mime' ).lookup,
    enumerable: true,
    configurable: true,
    writable: true
  },
  createClient: {
    value: require( 'wordpress' ).createClient,
    enumerable: true,
    configurable: true,
    writable: true
  },
  toXML: {
    /**
     * @source wordpress-rpc/xml-rpc.js
     *
     * @param method
     * @param parameter
     * @param callback
     * @returns {string}
     */
    value: function toXML( method, parameter, callback ) {

      _$jscoverage['lib/common/index.js'][107]++;
var ConvertXML = require( './convertXML' );
      _$jscoverage['lib/common/index.js'][108]++;
var cXML = new ConvertXML();
      _$jscoverage['lib/common/index.js'][109]++;
var str = "";

      _$jscoverage['lib/common/index.js'][111]++;
function convertParams () {
        _$jscoverage['lib/common/index.js'][112]++;
var str = "<params>";

        _$jscoverage['lib/common/index.js'][114]++;
for (var i in parameter) {
          _$jscoverage['lib/common/index.js'][115]++;
str += cXML.solve(parameter[i]);
        }

        _$jscoverage['lib/common/index.js'][118]++;
return str+"</params>";

      }

      _$jscoverage['lib/common/index.js'][122]++;
str += '<methodCall>';
      _$jscoverage['lib/common/index.js'][123]++;
str += '<methodName>' + method + '</methodName>';
      _$jscoverage['lib/common/index.js'][124]++;
str += convertParams() + '</methodCall>';

      _$jscoverage['lib/common/index.js'][126]++;
return str;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  fromXML: {
    /**
     *
     * @source wordpress-rpc/xml-rpc.js
     * @param xml
     * @param callback
     */
    value: function fromXML( xml, callback ) {
      _$jscoverage['lib/common/index.js'][140]++;
var xml2js = require('xml2js');
      _$jscoverage['lib/common/index.js'][141]++;
var ConvertJS = require('./convertJS.js');

      _$jscoverage['lib/common/index.js'][143]++;
function doCallback(json){
        _$jscoverage['lib/common/index.js'][144]++;
var c = new ConvertJS();
        _$jscoverage['lib/common/index.js'][145]++;
json = c.solve(json);
        _$jscoverage['lib/common/index.js'][146]++;
callback(null, json);
      }

      _$jscoverage['lib/common/index.js'][149]++;
new xml2js.Parser({explicitArray  : false, mergeAttrs : true}).addListener('end', doCallback).parseString(xml);
    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});
