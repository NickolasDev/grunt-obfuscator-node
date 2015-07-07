module.exports = function (grunt) {
    grunt.loadTasks('../tasks');

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


    grunt.registerTask('default', ['obfuscator_node']);
};