/**
 * Created by dleewarden on 12/11/14.
 */
module.exports = function (grunt) {

    'use strict';
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'app/js/',
                    //appDir: 'app/',
                    //dir: 'js/opt',
                    mainConfigFile: 'app/js/main.js',
                    include: "main",
                    name: "../bower_components/almond/almond", // assumes a production build using almond
                    out: "js/optimized.js",
                    //optimize: 'none',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }
        },

        compass: {
            options: {
                sassDir: 'app/styles/sass/',
                cssDir: 'app/styles/css'
            }
        },
        cssmin: {
            my_target: {
                files: {
                    'css/output.css': [ 'css/site.css']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'app/css/site.css' : 'app/css/sass/site.scss'
                }
            }
        },
        jshint: {
            files: [ 'app/js/site/**/*.js'],
            options: {
                // options here to override JSHint defaults
                jquery: true,
                undef: true,
                unused: true,
                browser: true,
                "indent"    : 2,
                "predef":   [
                    "requirejs",
                    "define",
                    "require",
                    "Modernizr",
                    "respond",
                    "_"
                ],

                globals: {
                    jquery: true,
                    console: true,
                    module: true,
                    undef: true,
                    unused: true,
                    quotmark: 'single',
                    camelcase: true,
                    strict: true,
                    "indent"    : 2,
                    document: true
                }
            }
        },
        watch: {
            css: {
                files: 'app/css/sass/**/*.scss',
                tasks: ['sass']
            },

            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
//            karma: {
//                files: ['app/js/**/*.js', 'test-main.js'],
//                tasks: ['karma:unit:run'] //NOTE the :run flag
//            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        jslint: { // configure the task
            // lint your project's server code
            server: {
                src: [ // some example files
                    'app/js/site/*.js',
                    'app/js/*.js'

                ],
                exclude: [
                    'config.js'
                ],
                directives: { // example directives
                    node: true,
                    todo: true
                },
                options: {
                    edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
                    junit: 'out/server-junit.xml', // write the output to a JUnit XML
                    log: 'out/server-lint.log',
                    jslintXml: 'out/server-jslint.xml',
                    errorsOnly: true, // only display errors
                    failOnError: false, // defaults to true
                    checkstyle: 'out/server-checkstyle.xml' // write a checkstyle-XML
                }
            },
            // lint your project's client code
            client: {
                src: [
                    'app/js/site/*.js',
                    'app/js/*.js'
                ],
                directives: {
                    browser: true,
                    predef: [
                        'jQuery'
                    ]
                },
                options: {
                    junit: 'out/client-junit.xml'
                }
            }
        }
    });



//  grunt.registerTask('js', [
//    'jsbeautifier',
//    'jshint'
//  ]);
    grunt.registerTask('buildcss', ['sass', 'cssc', 'cssmin']);
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.registerTask('default', ['watch','compass']);

};
