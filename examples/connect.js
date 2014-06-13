return module.exports = require( '../' ).create({
  url: process.env.WORDPRESS_URL,
  username: process.env.WORDPRESS_USERNAME,
  password: process.env.WORDPRESS_PASSWORD
}).once( 'connected', onceConnected );

/**
 * Callback to Trigger Once Connected.
 *
 * @param error
 * @param methods
 */
function onceConnected( error, methods ) {

  if( !error ) {
    console.log( 'Connected to %s. There are %d methods available.', this.get( 'url' ), this.get( 'methods' ).length );
  }

  if( error ) {
    console.error( error.message );
  }

}
