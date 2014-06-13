// Get Posts, Taxonomies and Blogs
var client = require( '../' ).create({
  url: process.env.WORDPRESS_URL,
  username: process.env.WORDPRESS_USERNAME,
  password: process.env.WORDPRESS_PASSWORD
})
  .getPosts( { type: 'post' }, console.log )
  .once( 'drained', requestsDrained );

function requestsDrained( error, response ) {
  this.debug( 'requestsDrained' );
}

return module.exports = client;