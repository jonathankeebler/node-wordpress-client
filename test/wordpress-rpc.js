module.exports = {

  before: function() {

    var wordpress = require( 'wordpress' );

    this.client = new wordpress.Client({
      url: 'http://imperialrealestategroup.dev/vendor/wordpress/core/xmlrpc.php',
      username: 'andy.potanin@usabilitydynamics.com',
      password: 'ISM0Rules',
      blogId: 10
    });

  },

  'WordPress RPC imperialrealestategroup.dev/vendor/wordpress/core/xmlrpc.php': {

    'unauthenticated: listMethods': function( done ) {

      this.client.listMethods( function( error, data ) {

        data.should.be.an.Array;

        data.should.match( /system.listMethods/ );
        data.should.match( /system.getCapabilities/ );

        data.should.match( /wp.getMediaItem/ );
        data.should.match( /wp.uploadFile/ );

        data.should.match( /wpp.pushListing/ );
        data.should.match( /wpp.pushMessage/ );
        data.should.match( /wpp.updateImport/ );

        done();

      });

    },

    'unauthenticated: wpp.pushListing': function( done ) {

      var _data = {
        post_title: 'My Title',
        post_content: 'My Title',
        post_excerpt: 'My Title'
      }

      this.client.call( 'wpp.pushListing', 'fake-token', 100, _data, function( error, data ) {

        // console.log( require( 'util' ).inspect( data, { showHidden: false, colors: true, depth: 2 } ) )

        done();

      });

    },

    'authenticated: wpp.pushListing': function( done ) {

      var _data = {
        post_title: 'My Title',
        post_content: 'My Title',
        post_excerpt: 'My Title'
      };

      this.client.authenticatedCall( 'wpp.pushListing', _data, function( error, data ) {

        console.log( require( 'util' ).inspect( data, { showHidden: false, colors: true, depth: 2 } ) )

        done();

      });

    }

  }

}