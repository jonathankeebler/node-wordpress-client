'use strict';

/**
 * WordPress Client.
 *
 * @todo Add support for 30X redirect.
 *
 * ### Events
 * * ready          - Once client instance created.
 * * connected      - Once client instance created and list of supported methods is returned.
 * * authenticated  - Once client instance created and list of supported methods is returned.
 * * error          - Emitted on any response error.
 *
 * ### Settings
 * * url            - URL to XML-RPC endpoint.
 * * username       - Username to use.
 * * password       - Password to use.
 * * blog           - ID of blog
 * * key            - As an alternative to usrname and password, if WordPress site supports it.
 * * methods        - Set with supported RPC methods once client connection is created.
 *
 * @param settings
 * @param callback
 * @returns {Client}
 * @constructor
 */
function Client(settings, callback) {
  this.debug('new Client', settings.url);

  // Mixing settings and emitter into instance.
  require('object-emitter').mixin(this);
  require('object-settings').mixin(this);

  // Set defaults and instance settings.
  this.set(Client.defaults).set(settings);

  console.log(this.common);

  // Set properties from parsed URL.
  this.set('hostname', this.common.parseURL(this.get('url')).hostname);
  this.set('auth', this.common.parseURL(this.get('url')).auth);

  // Instance Properties.
  Object.defineProperties(this, {
    __client: {
      value: this.common.createClient({
        url: settings.url,
        username: settings.username,
        password: settings.password,
        blogId: settings.blog || settings.blogId
      }),
      enumerable: false,
      configurable: true,
      writable: false
    },
    __queue: {
      value: [],
      enumerable: false,
      configurable: true,
      writable: false
    }
  });

  // Schedule initial RPC call to verify target is valid.
  this.listMethods(this.onceReady.bind(this));

  // Emit ready event on next tick.
  this.nextTick(this.emit, 'ready', null, this);

  // Schedule callback, if provided.
  if ('function' === typeof callback) {
    this.once('connected', callback);
  }

  // @chainable
  return this;
}

/**
 * Instance Properties.
 *
 */
Object.defineProperties(Client.prototype, {
  onceReady: {
    /**
     * Callback for Connection Verification.
     *
     * @todo Does not verify credentials.
     *
     * @param error
     * @param methods
     * @returns {*}
     */
    value: function onceReady(error, methods) {
      this.debug(error ? 'No methods (%d) found, unable to connect to %s.' : 'onceReady: Found %d methods on %s.', ( methods ? methods.length : 0 ), this.get('url'));

      // Set Methods.
      this.set('methods', methods || []);

      if (error) {
        this.emit('error', error, this);
      }

      this.emit('connected', error, this);

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  listMethods: {
    /**
     * Get Client Methods.
     *
     * @param callback
     * @returns {*}
     */
    value: function listMethods(callback) {
      this.debug('listMethods');
      this.__client.listMethods(callback);
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  methodCall: {
    /**
     * Call Method
     *
     * @todo Add __queue use for request batching.
     *
     * @param method
     * @param args
     * @param callback
     * @returns {*}
     */
    value: function methodCall(method, args, callback) {
      this.debug('methodCall', method);

      var self = this;
      var body = [].slice.call(args, 1);

      /**
       * Handle RPC Method Callback.
       *
       * @param error
       * @param response
       * @returns {*}
       */
      function callbackWrapper(error, response) {
        self.debug('methodCall->callbackWrapper', error, response);

        if (error && error.code === "ENOTFOUND" && error.syscall === "getaddrinfo") {
          error.message = "Unable to connect to WordPress.";
          //return fn(error);
          return error;
        }

        // Parse Response.
        if ('string' === typeof response && self.common.is_numeric(response)) {
          response = parseInt(response);
        }
        // TODO: check "strict mode violation"
        /*jshint validthis:true */
        callback.call(this, error, response);
      }

      this.__client.rpc.methodCall(
        method,
        args,
        callbackWrapper
      );

      // @chainable
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  multiCall: {
    /**
     * Multiple RPC Call
     *
     * @param calls
     * @param callback
     * @returns {*}
     */
    value: function multiCall(calls, callback) {
      this.debug('multiCall', calls);
      this.methodCall('system.multicall', calls, callback);
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  uploadFile: {
    /**
     * Get Client Methods.
     *
     * Seems to fail completely when "Name" is nota  valid filename..?
     *
     * ### Notes
     * * Uses "wp.uploadFile" RPC EP.
     *
     * ### Returns
     * * id
     * * file
     * * url
     * * type
     *
     * @param data            {Object}
     * @param data.name       {String}
     * @param data.type       {String}
     * @param data.bits       {String}
     * @param data.overwrite  {Boolean}
     * @param data.post_id    {Integer} Optional ID of parent post.
     * @param callback        {Function}
     * @returns {*}
     */
    value: function uploadFile(data, callback) {
      this.debug('uploadFile', data);

      var self = this;

      /**
       * Handle Upload Callback
       *
       * @param error
       * @param response
       * @returns {*}
       */
      function uploadCallback(error, response) {

        // If the user does not have the uploadFiles cap.
        if (error && error.code === 401) {
          return callback.call(self, null, { ok: false, id: response.id, message: error.faultString, error: error });
        }

        // File upload failure.
        if (error && error.code === 500) {
          return callback.call(self, null, { ok: false, id: response.id, message: error.faultString, error: error });
        }

        if (!error && response) {
          return callback.call(self, null, { ok: true, id: parseInt(response.id), file: response.file, url: response.url, type: response.file });
        }

        // Unhandled.
        callback.call(self, null, { ok: false, id: response.ID, data: data, error: error });

      }

      data.bits = new Buffer(data.bits, 'base64');

      this.methodCall('wp.uploadFile', [ this.get('blog'), this.get('username'), this.get('password'), data ], uploadCallback);

      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  insertPost: {
    /**
     * Insert / Update Post
     *
     * Natively:
     * - Will return "true" if post has been updated.
     * - Will return an error if post has NOT been updated, even if due to "if_not_modified_since".
     * - Will return ID of new post if inserted.
     *
     * @param data            {Object}
     * @param data.ID         {Integer} If set, will attempt to edit.
     * @param data.type       {String}
     * @param data.bits       {String}
     * @param data.bits       {String}
     * @param data.overwrite  {Boolean}
     * @param callback        {Function}
     * @returns {*}
     */
    value: function insertPost(data, callback) {
      this.debug('insertPost', data);

      var self = this;

      /**
       * Handle Insertion Callback
       *
       * @param error
       * @param response
       * @returns {*}
       */
      function insertCallback(error, response) {

        // Not modified since specified date.
        if (data.ID && error && error.code === 409 && error.faultString) {
          return callback.call(self, null, { ok: true, id: data.ID, updated: false, message: error.faultString, error: error });
        }

        // Trying to update a post ID that does not exist.
        if (data.ID && error && error.code === 404 && error.faultString) {
          return callback.call(self, null, { ok: false, id: data.ID, updated: false, message: error.faultString, error: error });
        }

        if ('number' === typeof response) {
          return callback.call(self, null, { ok: true, id: response, updated: false });
        }

        if ('boolean' === typeof response && response === false) {
          return callback.call(self, null, { ok: false, id: data.ID, updated: false, message: error.message });
        }

        if ('boolean' === typeof response && response === true) {
          return callback.call(self, null, { ok: true, id: data.ID, updated: true });
        }

        // Unhandled.
        callback.call(self, null, { ok: false, id: data.ID, data: data, error: error });

      }

      if (data.ID) {
        this.methodCall('wp.editPost', [ this.get('blog'), this.get('username'), this.get('password'), data.ID, data ], insertCallback);
      }

      if (!data.ID) {
        this.methodCall('wp.newPost', [ this.get('blog'), this.get('username'), this.get('password'), data ], insertCallback);
      }

      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  getMediaItem: {
    /**
     * Get Client Methods.
     *
     * @param attachment_id
     * @param callback
     * @returns {*}
     */
    value: function getMediaItem(attachment_id, callback) {
      this.debug('getMediaItem', attachment_id);

      this.methodCall('wp.getMediaItem', [ this.get('blog'), this.get('username'), this.get('password'), attachment_id ], callback);

      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  getPosts: {
    /**
     * Get Client Methods.
     *
     * @param filter
     * @param callback
     * @returns {*}
     */
    value: function getPosts(filter, callback) {
      this.debug('getPosts', filter);
      this.__client.getPosts(filter || { type: 'post' }, callback.bind(this));
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  getPostTypes: {
    /**
     * Get Client Methods.
     *
     * @param callback
     * @returns {*}
     */
    value: function getPostTypes(callback) {
      this.debug('getPostTypes');
      this.__client.getPostTypes(callback);
      return this;
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  nextTick: {
    /**
     * Call Method on Next Tick.
     *
     * @param callback
     * @returns {*}
     */
    value: function nextTick(callback) {

      var context = this;
      var args = Array.prototype.slice.call(arguments, 1);

      // Do not schedule callback if not a valid function.
      if ('function' !== typeof callback) {
        return this;
      }

      // Execute callback on next tick.
      process.nextTick(function nextTickHandler() {
        context.debug('nextTick', callback.name);
        callback.apply(context, args);
      });

      // @chainable
      return this;

    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  debug: {
    value: require('debug')('wordpress-client'),
    enumerable: false,
    configurable: true,
    writable: true
  },
  common: {
    value: require('./common'),
    enumerable: false,
    configurable: true,
    writable: true
  }
});

/**
 * Constructor Properties.
 *
 */
Object.defineProperties(module.exports = Client, {
  version: {
    value: require('../package').version,
    enumerable: true,
    configurable: false,
    writable: false
  },
  common: {
    value: Client.prototype.common,
    enumerable: true,
    configurable: false,
    writable: false
  },
  defaults: {
    value: {
      username: process.env.WORDPRESS_USERNAME || undefined,
      password: process.env.WORDPRESS_PASSWORD || undefined,
      url: process.env.WORDPRESS_URL || undefined,
      methods: [],
      key: null,
      blog: 1
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  create: {
    /**
     * Create Client
     *
     * @param settings
     * @returns {Client}
     */
    value: function create(settings) {
      return new Client(settings);
    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});