/*
 * grunt-obfuscator-node
 * https://github.com/NickolasDev/grunt-obfuscator-node
 *
 * Copyright (c) 2015 Nicolaus
 * Licensed under the MIT license.
 */

'use strict';
var obfuscator = require('../lib/obfuscator');
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



    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join();
      obfuscator.parse(src,options,function(err,data){
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
