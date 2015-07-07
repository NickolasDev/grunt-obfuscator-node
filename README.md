# grunt-obfuscator-node

> Obfuscate nodejs projects via Grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-obfuscator-node --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-obfuscator-node');
```

## The "obfuscator_node" task

### Overview
In your project's Gruntfile, add a section named `obfuscator_node` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  obfuscator_node: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever.

```js
grunt.initConfig({
    obfuscator_node: {
        default_options: {
            options: {
                strings: true,
                compressor : {
                    conditionals: true,
                    evaluate: true,
                    booleans: true,
                    loops: true,
                    unused: false,
                    hoist_funs: false
                }
            },
            files: [{
                cwd: '.',
                src: ['express/**/*.js'],
                dest: '.build/',
                expand: true,
                cache : false
            }]
        }
    }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
