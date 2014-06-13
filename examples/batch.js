/**
 * Get Post Types, Options and Taxonomies in one call.
 *
 * @type {*|Suite}
 */
var client = module.exports = require( '../' ).create({
  url: process.env.WORDPRESS_URL,
  username: process.env.WORDPRESS_USERNAME,
  password: process.env.WORDPRESS_PASSWORD
});

var _items = [
  {
    methodName: 'wp.getPostTypes',
    params: [ client.get( 'blog' ), client.get( "username" ), client.get( "password" ) ]
  },
  {
    methodName: 'wp.getOptions',
    params: [ client.get( 'blog' ), client.get( "username" ), client.get( "password" ), [ 'large_size_w', 'large_size_h' ]  ]
  },
  {
    methodName: 'wp.getTaxonomies',
    params: [ client.get( 'blog' ), client.get( "username" ), client.get( "password" ) ]
  }
];

client.multiCall( _items, function(err, results) {
  console.log( require( 'util' ).inspect( results, { showHidden: false, colors: true, depth: 3 } ) )
});
