/*
 * grunt-obfuscator-node
 * https://github.com/NickolasDev/grunt-obfuscator-node
 *
 * Copyright (c) 2015 Nicolaus
 * Licensed under the MIT license.
 */

'use strict';
var uglifyjs = require('uglify-js');
var _ = require('lodash');

var default_options = {
    sequences: true,
    properties: true,
    dead_code: true,
    drop_debugger: true,
    unsafe: true,
    conditionals: true,
    comparisons: true,
    evaluate: true,
    booleans: true,
    loops: true,
    unused: true,
    hoist_funs: true,
    hoist_vars: true,
    if_return: true,
    join_vars: true,
    cascade: true,
    warnings: false
};

var map = {
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t'
};

var toHex = function(str){
    var result = '';

    for (var i = 0, l = str.length; i < l; i++) {
        var char = str[i];

        if (map[char]) {
            result += map[char];
        } else if ('\\' == char) {
            result += '\\' + str[++i];
        } else {
            result += '\\x' + str.charCodeAt(i).toString(16);
        }
    }
    return result;
};

var astString = function(node) {
    if (!(node instanceof uglifyjs.AST_String)) {
        return;
    }
    var str = node.getValue();
    var hex = toHex(str);

    var obj = _.merge({}, node);
    obj.value = hex;
    return new uglifyjs.AST_String(obj);
};

var compress = function (ast, opts) {
    opts = opts || options;
    var compressor = uglifyjs.Compressor(opts);
    return ast.transform(compressor);
};

module.exports.parse = function(src,options,cb){
    if(typeof options === 'function'){
        cb = options;
        options = {};
    }

    try{
        src = '(function(module,exports,console,global,process,require){'+src+'})(module,exports,console,global,process,require)';
        options.compressor = _.merge(default_options,options.compressor || {});

        options.fromString  = true;


        var ast = uglifyjs.parse(src);
        var stream = new uglifyjs.OutputStream;

        ast.figure_out_scope();
        ast.compute_char_frequency();
        ast.mangle_names();


        ast = compress(ast, options.compressor);


        if (options.strings) {
            var transformer = new uglifyjs.TreeTransformer(null, astString);
            ast = ast.transform(transformer);
            stream.print_string = function (str) {
                return this.print('"' + str + '"');
            };
        }

        ast.figure_out_scope();
        ast.compute_char_frequency();
        ast.mangle_names();
        ast.print(stream);

        var _result = stream.toString();

        if(typeof cb == 'function'){
            cb(null,_result);
        }
    }catch(e){
        if(typeof cb == 'function'){
            cb(e,null);
        }
    }
};