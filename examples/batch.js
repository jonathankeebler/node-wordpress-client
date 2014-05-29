var client = module.exports = require( '../' ).create({
  url: process.env.WORDPRESS_CLIENT_URL,
  username: process.env.WORDPRESS_CLIENT_USERNAME,
  password: process.env.WORDPRESS_CLIENT_PASSWORD
});


var _items = [
  { methodName: 'wp.getMediaItem', params: [ client.get( 'blog' ), client.get( "username" ), client.get( "password" ), 251 ] },
  { methodName: 'wp.getMediaItem', params: [ client.get( 'blog' ), client.get( "username" ), client.get( "password" ), 250 ] }
];

client.multiCall( _items, function(err, results) {
  console.log( require( 'util' ).inspect( results, { showHidden: false, colors: true, depth: 1 } ) )
});
