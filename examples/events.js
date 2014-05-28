var client = require( '../' ).create({
  url:      process.env.WORDPRESS_CLIENT_URL,
  username: process.env.WORDPRESS_CLIENT_USERNAME,
  password: process.env.WORDPRESS_CLIENT_PASSWORD
});

return module.exports = client;

function debugEvent( error, data ) {
  console.log( "=====event:" + this.event + "=====\n", error || data );
}

// client.on( 'wp.**.success', debugEvent );
// client.on( 'wp.**.error', debugEvent );

// Post
client.newPost();
client.getPost();
client.editPost();
client.deletePost();

// Options
client.getOptions();
client.getOptions();

// Utility
client.connect();

// Media
client.uploadFile();

