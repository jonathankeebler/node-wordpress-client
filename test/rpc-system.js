module.exports = {

  before: function() {

    var client = this.client = require( 'xmlrpc' ).createClient({
      host: 'localhost',
      port: 8080,
      path: '/rpc'
    });

    this.call = function( method, data, callback ) {

      if( callback ) {
        client.methodCall( method, [ data ], callback );
      } else {
        client.methodCall( arguments[0], [], arguments[1] );

      }
    }

  },

  'System RPC Call': {

    'system.listMethods': function( done ) {

      this.call( 'system.listMethods', function( error, data ) {
        data.should.have.properties( 'ok', 'message', 'data' );
        done();
      });

    },

    'system.getCapabilities': function( done ) {

      this.call( 'system.getCapabilities', function( error, data ) {
        data.should.have.properties( 'ok', 'message', 'data' );
        done();
      });

    },

    'system.verifyAccessToken': function( done ) {

      this.call( 'system.verifyAccessToken', {
        token: "abcd-efgh-ijkl-mnop-qrst-uvwx",
        client: "wordpress"
      }, function( error, data ) {
        data.should.have.properties( 'ok', 'message', 'data' );
        done();
      });

    }

  }

};