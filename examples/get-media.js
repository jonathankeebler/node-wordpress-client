// Get Posts, Taxonomies and Blogs
var client = require( '../' ).create({
  url: process.env.WORDPRESS_CLIENT_URL,
  username: process.env.WORDPRESS_CLIENT_USERNAME,
  password: process.env.WORDPRESS_CLIENT_PASSWORD
});

// Get File information by attachment ID.
client.getMediaItem( 236, function haveMediaItem( error, response ) {
  console.log( 'haveMediaItem');
  console.log( require( 'util' ).inspect( error || response, { showHidden: true, colors: true, depth: 2 } ) )
});

// @export
return module.exports = client;