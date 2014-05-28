// Get Posts, Taxonomies and Blogs
var client = require( '../' ).create({
  url: process.env.WORDPRESS_CLIENT_URL,
  username: process.env.WORDPRESS_CLIENT_USERNAME,
  password: process.env.WORDPRESS_CLIENT_PASSWORD
});

// Upload a File.
client.uploadFile({
  name: 'Sample File',
  bits: require( 'fs' ).readFileSync( './path/to/file.jpeg' )
}, fileUploaded );

/**
 * File Uploaded Callback
 *
 * @param error
 * @param response
 */
function fileUploaded( error, response ) {
  this.debug( 'File Uploaded' );
  console.log( require( 'util' ).inspect( response, { showHidden: false, colors: true, depth: 4 } ) );
}

// @export
return module.exports = client;