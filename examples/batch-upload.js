var client = module.exports = require( '../' ).create({
  url: process.env.WORDPRESS_CLIENT_URL,
  username: process.env.WORDPRESS_CLIENT_USERNAME,
  password: process.env.WORDPRESS_CLIENT_PASSWORD
});

client.multiCall([
  {
    methodName: 'wp.uploadFile',
    params: [
      client.get( 'blog' ), client.get( "username" ), client.get( "password" ), {
        name: 'sample-cat.jpg',
        type: 'image/jpeg',
        bits: require( 'fs' ).readFileSync( './fixtures/sample-cat.jpg' )
      }
    ]
  },
  {
    methodName: 'wp.uploadFile',
    params: [
      client.get( 'blog' ), client.get( "username" ), client.get( "password" ), {
        name: 'another-sample-cat.jpg',
        type: 'image/jpeg',
        bits: require( 'fs' ).readFileSync( './fixtures/another-sample-cat.jpg' )
      }
    ]
  }
], console.log );
