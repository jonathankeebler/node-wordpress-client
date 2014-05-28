// Get Posts, Taxonomies and Blogs
var client = require( '../' ).create({
  url: process.env.WORDPRESS_CLIENT_URL,
  username: process.env.WORDPRESS_CLIENT_USERNAME,
  password: process.env.WORDPRESS_CLIENT_PASSWORD
}).getPosts( { type: 'post' }, havePosts );

/**
 * Post Query Callback
 *
 * @param error
 * @param post
 */
function havePosts( error, post ) {
  this.debug( 'haveSingle' );
  console.log( require( 'util' ).inspect( post, { showHidden: false, colors: true, depth: 4 } ) );
}

// @exports
return module.exports = client;