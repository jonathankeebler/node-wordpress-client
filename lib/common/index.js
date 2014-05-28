/**
 * Common Utility Methods
 *
 */
Object.defineProperties( module.exports, {
  flatten: {
    /**
     *
     * @source grunt-wordpress
     * @param obj
     * @returns {*}
     */
    value: function flatten( obj ) {
      if ( obj == null ) {
        return "";
      }

      if ( typeof obj === "string" ) {
        return obj;
      }

      if ( typeof obj === "number" ) {
        return String( obj );
      }

      if ( util.isDate( obj ) ) {
        return obj.toGMTString();
      }

      if ( util.isArray( obj ) ) {
        return obj.map(function( item ) {
          return flatten( item );
        }).join( "," );
      }

      return Object.keys( obj ).sort().map(function( prop ) {
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
      var crypto = require( "crypto" );
      var md5 = crypto.createHash( "md5" );
      md5.update( flatten( obj ), "utf8" );
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

      var convertXML = require( './convertXML' );
      var cXML = new convertXML();
      var str = "";

      function convertParams () {
        var str = "<params>";

        for (var i in parameter) {
          str += cXML.solve(parameter[i]);
        }

        return str+"</params>"

      }

      str += '<methodCall>';
      str += '<methodName>' + method + '</methodName>';
      str += convertParams() + '</methodCall>';

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

      var xml2js = require('xml2js');
      var convertJS = require('./convertJS.js');

      function doCallback(json){
        var c = new convertJS();
        json = c.solve(json);
        callback(null, json);
      }

      new xml2js.Parser({explicitArray  : false, mergeAttrs : true}).addListener('end', doCallback).parseString(xml);

    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});