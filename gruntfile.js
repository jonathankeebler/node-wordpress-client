/**
 * Standard Module Build
 *
 * @version 1.0.0
 * @author potanin@UD
 * @param grunt
 */
module.exports = function( grunt ) {

  var joinPath  = require( 'path' ).join;
  var findup    = require( 'findup-sync' );

  // Automatically Load Tasks.
  require( 'load-grunt-tasks' )( grunt, {
    config: './package.json',
    scope: 'devDependencies'
  });

  // Project configuration.
  grunt.initConfig( {

    package: grunt.file.readJSON( 'package.json' ),

    // Codex.
    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'readme.md',
            dest: 'static',
            ext: '.html'
          }
        ]
      }
    },

    // Tests.
    mochaTest: {
      options: {
        timeout: 10000,
        log: true,
        require: [ 'should' ],
        reporter: 'list',
        ui: 'exports'
      },
      basic: {
        src: [ 'test/basic-*.js' ]
      },
      advanced: {
        src: [ 'test/advanced-*.js' ]
      }
    },

    // Documentation.
    yuidoc: {
      compile: {
        name: '<%= package.name %>',
        description: '<%= package.description %>',
        version: '<%= package.version %>',
        url: '<%= package.homepage %>',
        logo: 'http://media.usabilitydynamics.com/logo.png',
        options: {
          paths: [ "./lib" ],
          outdir: './static/codex'
        }
      }
    }

  });

  // Update Documentation, run basic tests.
  grunt.registerTask( 'default', [ 'markdown', 'mochaTest:basic' ] );

  // Run Basic tests.
  grunt.registerTask( 'test:basic', [ 'mochaTest:basic' ] );

  // Run Adavnced tests.
  grunt.registerTask( 'test:advanced', [ 'mochaTest:advanced' ] );

  // Generate documentation.
  grunt.registerTask( 'documentation', [ 'markdown', 'yuidoc' ] );

};
