var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      watch: {
          scripts: {
            files: ['scripts/*.js', 'less/*.less'],
            tasks: ['jshint','uglify', 'css'],
            options: {
              spawn: false,
            },
          }
      },
      uglify: {
          build: {
            src: 'scripts/slider.js',
            dest: 'dist/js/slider.min.js'
          }
      },
      less: {
        serve: {
          files: {
            "css/slider.css": "less/slider.less"
          }
        },
        dist: {
          options: {
            cleancss: true
          },
          files: {
            "css/slider.css": "less/slider.less"
          }
        }
      },
      cssmin: {
        dist: {
          options: {
            keepSpecialComments: '0'
          },
          files: {
            "dist/css/slider.min.css": "css/slider.css"
          }
        }
      },
      jshint: {
        app: {
          options: {
            jshintrc: '.jshintrc'
          },
          src: [
            'scripts/*.js'
          ]
        }
      },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('css', 'compiles less and minify css', ['less:dist', 'cssmin:dist']);
  grunt.registerTask('default', ['jshint', 'uglify', 'css']);

};