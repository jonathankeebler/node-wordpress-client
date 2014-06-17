"use strict";

/**
 * @author potanin@UD
 * @param grunt
 */
module.exports = function (grunt) {
  // Automatically load tasks with package name "grunt-*" included in package.json.
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    package: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: ['Gruntfile.js', 'lib/**/*.js']
      }
    },

    clean: {
      docs: {
        src: 'docs/'
      },
      coverage: {
        src: 'lib-cov/'
      },
      reports: {
        src: 'reports/'
      }
    },

    // Tests.
    copy: {
      test: {
        src: ['test/**'],
        dest: 'lib-cov/'
      }
    },

    blanket: {
      all: {
        src: 'lib/',
        dest: 'lib-cov/lib'
      }
    },

    mochaTest: {
      'spec': {
        options: {
          reporter: 'spec',
          timeout: 10000,
          ui: 'bdd'
        },
        src: 'lib-cov/test/**/*.js'
      },
      'html-cov': {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'reports/coverage.html'
        },
        src: ['lib-cov/test/lib/**/*.js']
      },
      'mocha-lcov-reporter': {
        options: {
          reporter: 'mocha-lcov-reporter',
          quiet: true,
          captureFile: 'reports/lcov.info'
        },
        src: ['lib-cov/test/lib/**/*.js']
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['lib-cov/test/lib/**/*.js']
      }
    },

    coveralls: {
      options: {
        force: true
      },
      all: {
        src: 'reports/lcov.info'
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
          paths: [ "lib/" ],
          outdir: 'docs/'
        }
      }
    },

    // Codex.
    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'readme.md',
            dest: 'docs',
            ext: '.html'
          }
        ]
      }
    }
  });

  grunt.registerTask('clean-test', ['clean:coverage', 'clean:reports']);
  grunt.registerTask('build', ['clean-test', 'blanket', 'copy']);
  grunt.registerTask('doc', ['clean:docs', 'markdown', 'yuidoc' ]);

  grunt.registerTask('default', ['jshint', 'build', 'mochaTest']);
  grunt.registerTask('ci', ['default', 'coveralls']);
};
