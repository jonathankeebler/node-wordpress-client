// Get Posts, Taxonomies and Blogs
var client = require( '../' ).create({
  url: process.env.WORDPRESS_CLIENT_URL,
  username: process.env.WORDPRESS_CLIENT_USERNAME,
  password: process.env.WORDPRESS_CLIENT_PASSWORD
});

client.uploadFile({
  name: 'sample-cat.jpg',
  type: 'image/jpeg',
  //overwrite: false,
  //post_id: false,
  bits: require( 'fs' ).readFileSync( './fixtures/sample-cat.jpg' )
}, fileUploaded );

/**
 * File Uploaded Callback
 *
 * @param error
 * @param response
 */
function fileUploaded( error, response ) {
  this.debug( 'File Uploaded' );
  console.log( require( 'util' ).inspect( error || response, { showHidden: false, colors: true, depth: 4 } ) );
}

// @export
return module.exports = client;