[![Stories in Ready](https://badge.waffle.io/usabilitydynamics/node-wordpress-client.png?label=ready&title=Ready)](https://waffle.io/usabilitydynamics/node-wordpress-client)
WordPress XML-RPC client.

## Features
* Automated batching of RPC calls.

## Methods
Instance methods resemble WordPress functions used in PHP development.

* client.get_post()
* client.get_option()
* client.insert_post()
* client.upload_file()

## Usage

```javascript

// Load module and create an instance.
var client = require( 'wordpress-client' ).create({
  url: 'http://my-site.com/xmlrpc.php',
  username: 'admin',
  password: 'secret-password'
});

// Uplaod File
client.uploadFile({
  'name': 'My File',
  'bits': require( 'fs' ).readFileSync( './path/to/file.jpeg' )
});

```

## Notes

* All callbacks are called in context of client's instance.
* Authenticated vs non-authenticated calls are automatically selected based on type of endpoint.