/*
 * grunt-generate-sass-imports
 * https://github.com/telor/grunt-generate-sass-imports
 *
 * Copyright (c) 2017 Thorsten Schau
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).

   generate_sass_imports: {
      options: {
        configBase: '<%= paths.src %>/shared/includes'
      },
      my_target: {
        files: [
          {
            expand: true,
            src: ['/includes/atoms/**/scss/*.scss'],
            dest: '/includes/atoms/atoms_x.scss',
            ext: '.css',
            filter: function (file) {
              var pattern = new RegExp(/\/(.+)\/scss\/_?(\1)\.scss/g);
              return pattern.test(file);
            }

          }
        ]
      }
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['generate_sass_imports']);
};