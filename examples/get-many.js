// Get Posts, Taxonomies and Blogs
var client = require( '../' ).create({
  url: process.env.WORDPRESS_CLIENT_URL,
  username: process.env.WORDPRESS_CLIENT_USERNAME,
  password: process.env.WORDPRESS_CLIENT_PASSWORD
})
  .getPosts( { type: 'post' }, console.log )
  .once( 'drained', requestsDrained );

function requestsDrained( error, response ) {
  this.debug( 'requestsDrained' );
}

return module.exports = client;