WordPress XML-RPC client.

## Features
* Batching of requests.

## Methods

* getPost
* getPosts
* createPost
* uploadFile
* uploadFile

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

```javascript

## Notes

* All callbacks are called in context of client's instance.
* Authenticated vs non-authenticated calls are automatically selected based on type of endpoint.