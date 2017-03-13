/*
 * grunt-generate-sass-imports
 * https://github.com/eduardoboucas/grunt-sass-import
 *
 * Copyright (c) 2017 Thorsten Schau
 * Licensed under the MIT license.
 */

'use strict';

var nodePath = require('path');
var yaml = require('js-yaml');
var fs   = require('fs');

module.exports = function(grunt) {
  grunt.registerMultiTask('generate_sass_imports', 'Glob functionality for loading Sass partials based on directory structure', function() {
    var allowedExtensions = ['.scss'];
    const target = this.target;
    const files = this.files
    var dest = '';
    var destRoot = '';
    var resultFiles = [];
    var output = '';


    var options = this.options({
      configBase: '',
      basePath: ''
    });

    files.forEach(function (file) {
      dest = file.orig.dest;
      destRoot = nodePath.dirname(options.basePath + file.orig.dest);

      // Handling regular files
      grunt.file.expand(file.src).forEach(function (match) {

        var this_file = splitFilename(match);

        // Discard if extension is now allowed
        if (allowedExtensions.indexOf(this_file.extension) == -1) {
          return;
        }

        if (configCheckIsActive(this_file)) {
          resultFiles.push(this_file.name);
        }
      });

    });


    resultFiles.forEach(function (running_file) {
      running_file = nodePath.relative(destRoot, running_file).replace(/\\/g, '/');
      output += buildOutputLine(running_file.replace(options.basePath, ''));
    });

    grunt.file.write(options.basePath + dest, output);
    grunt.log.writeln('File "' + dest + '" created.');

    function configCheckIsActive(this_file) {
      try {
        var doc = yaml.safeLoad(fs.readFileSync(options.configBase+'/'+target+'/'+this_file.folder+'/config.yaml', 'utf8'));
        if(doc.active && doc.active === true) {
          return true;
        }else{
          return false;
        }
      } catch (e) {
        return false;
      }
    }

    function splitFilename(filename) {
      var dot = filename.lastIndexOf('.');
      var slash = filename.split("/");
      return {name: filename.substring(0, dot), extension: filename.substring(dot), folder: slash[4]};
    }

    function buildOutputLine(file) {
      return '@import \'' + file + '\';\n';
    }
  });

  grunt.registerMultiTask('generateSassImports', 'Glob functionality for loading Sass partials based on directory structure', function () {
    grunt.config.set('generate_sass_imports', grunt.config.get('generateSassImports'));
    grunt.task.run('generate_sass_imports');
  });

};
