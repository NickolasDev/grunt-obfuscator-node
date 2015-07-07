/*
 * grunt-obfuscator-node
 * https://github.com/NickolasDev/grunt-obfuscator-node
 *
 * Copyright (c) 2015 Nicolaus
 * Licensed under the MIT license.
 */

'use strict';
var obfuscator = require('obfuscator');
var _ = require('lodash');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('obfuscator_node', 'Obfuscate nodejs projects via Grunt', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      strings: false,
      path : process.cwd()
    });

    var fn = this.async();
    var files = this.files;
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var file = f.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        return filepath;
      });

      var _options = new obfuscator.Options(file, options.path, file[0], options.strings);

      // see https://github.com/mishoo/UglifyJS2/#compressor-options
      _options.compressor = {
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: false,
        hoist_funs: false
      };

      _options.compressor = _.merge(_options.compressor,options.compressor || {});

      obfuscator(_options, function (err, data) {
        if (err) {
          grunt.log.error(err);
          return fn(false);
        }
        grunt.file.write(f.dest,data);
        grunt.log.writeln('File "' + f.dest + '" created.');
        fn();
      });
    });
  });

};
