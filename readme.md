[![Stories in Ready](https://badge.waffle.io/usabilitydynamics/node-wordpress-client.png?label=ready&title=Ready)](https://waffle.io/usabilitydynamics/node-wordpress-client)
[![Dependency status](https://david-dm.org/UsabilityDynamics/node-wordpress-client.png)](https://david-dm.org/UsabilityDynamics/node-wordpress-client#info=dependencies&view=table)
[![Dev Dependency Status](https://david-dm.org/UsabilityDynamics/node-wordpress-client/dev-status.png)](https://david-dm.org/UsabilityDynamics/node-wordpress-client#info=devDependencies&view=table)
[![Master status](https://circleci.com/gh/UsabilityDynamics/node-wordpress-client/tree/master.png?circle-token=ad785bf3e72f75e3aae0b2f4897fe100f8538e34)](https://circleci.com/gh/UsabilityDynamics/node-wordpress-client/tree/master.png?circle-token=ad785bf3e72f75e3aae0b2f4897fe100f8538e34)
[![Dev status](https://circleci.com/gh/UsabilityDynamics/node-wordpress-client/tree/dev.png?circle-token=ad785bf3e72f75e3aae0b2f4897fe100f8538e34)](https://circleci.com/gh/UsabilityDynamics/node-wordpress-client/tree/dev.png?circle-token=ad785bf3e72f75e3aae0b2f4897fe100f8538e34)
[![Build Status](https://travis-ci.org/UsabilityDynamics/node-wordpress-client.svg?branch=dev)](https://travis-ci.org/UsabilityDynamics/node-wordpress-client)
[![Code Climate](https://codeclimate.com/github/UsabilityDynamics/node-wordpress-client.png)](https://codeclimate.com/github/UsabilityDynamics/node-wordpress-client)

WordPress XML-RPC client.

## Features
* Automated batching of RPC calls.

## Methods
Instance methods resemble WordPress functions used in PHP development.

* client.insertPost()
* client.uploadFile()

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
  'name': 'my_file.jpg',
  'bits': require( 'fs' ).readFileSync( './path/to/file.jpeg' )
});

```

## Notes

* All callbacks are called in context of client's instance.
* Authenticated vs non-authenticated calls are automatically selected based on type of endpoint.
* BlogID is automatically selected based on url