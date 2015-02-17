;(function () {
    'use strict';

    module.exports = function (grunt) {
        require('load-grunt-tasks')(grunt, {
            pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
        });
        require('time-grunt')(grunt);

        // Project configuration.
        grunt.initConfig({

            // Metadata.
            pkg: grunt.file.readJSON("package.json"),
            banner: '/* ' +
            '<%= pkg.title || pkg.name %> - <%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> - ' +
            'Copyright (c) <%= grunt.template.today("yyyy") %> tdascoli; */\n',

            // Task configurations.
            clean: {
                lib: ['lib']
            },
            copy: {
                public: {
                    files: [
                        {
                            expand: true,
                            cwd: 'components/alv-ch-ng/dist/',
                            src: ['**/*'],
                            dest: 'lib/alv-ch-ng/'
                        },
                        {
                            expand: true,
                            cwd: 'components/bootstrap/',
                            src: 'fonts/*',
                            dest: 'lib/alv-ch-ng/'
                        },
                        {
                            expand: true,
                            cwd: 'components/bootstrap-select/dist/',
                            src: '**/*',
                            dest: 'lib/'
                        },
                        {
                            expand: true,
                            cwd: 'components/blueimp-load-image/',
                            src: '**/*.all.min.js',
                            dest: 'lib/blueimp/'
                        },
                        {
                            expand: true,
                            cwd: 'components/blueimp-file-upload/',
                            src: '**/*',
                            dest: 'lib/blueimp/'
                        }
                    ]
                }
            },
            uglify: {
                options: {
                    banner: '<%= banner %>'
                },
                demo: {
                    options: {
                        'mangle': false
                    },
                    files: {
                        'lib/lib.min.js': [
                            'components/jquery/dist/jquery.js',
                            'components/jquery-i18n-property/jquery.i18n.properties.js',
                            'components/bootstrap/dist/js/bootstrap.js',
                            'components/bootstrap-select/dist/js/bootstrap-select.js',
                            'components/bootstrap-datepicker/js/bootstrap-datepicker.js',
                            'components/bootstrapaccessibilityplugin/plugins/js/bootstrap-accessibility.js',
                            'components/angular/angular.js',
                            'components/angular-resource/angular-resource.js',
                            'components/angular-aria/angular-aria.js',
                            'components/ng-lodash/build/ng-lodash.js',
                            'components/autofill-event/src/autofill-event.js',
                            'components/angular-cookies/angular-cookies.js',
                            'components/angular-route/angular-route.js',
                            'components/angular-sanitize/angular-sanitize.js',
                            'components/angular-scroll/angular-scroll.js',
                            'components/angular-ui-bootstrap/src/bindHtml/bindHtml.js',
                            'components/angular-ui-bootstrap/src/position/position.js',
                            'components/angular-ui-bootstrap/src/tabs/tabs.js',
                            'components/angular-ui-bootstrap/src/tooltip/tooltip.js',
                            'components/angular-ui-bootstrap/src/typeahead/typeahead.js',
                            'components/angular-ui-bootstrap/src/modal/modal.js',
                            'components/angular-ui-bootstrap/src/transition/transition.js',
                            'js/accounting.min.js',
                            'js/ng-text-truncate.js',
                            'components/moment/moment.js',
                            'components/mailcheck/src/mailcheck.js'
                        ]
                    }
                }
            },
            jshint: {
                gruntfile: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    src: 'Gruntfile.js'
                },
                src: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    src: ['public/scripts/**/*.js']
                }
            },
            less: {
                src: {
                    options: {
                        paths: ['public/less/'],
                        compress: false,
                        cleancss: true,
                        ieCompat: true
                    },
                    files: {
                        'public/styles/mtg-app.css': ['public/less/mtg-app.less']
                    }
                }
            },
            htmlhint: {
                options: {
                    htmlhintrc: '.htmlhintrc'
                },
                src: {
                    src: ['pages/**/*.html']
                }
            }
        });

        // Tests
        grunt.registerTask('unit-test', ['jasmine']);
        grunt.registerTask('jshint-test', ['jshint']);
        grunt.registerTask('htmlhint-test', ['htmlhint']);
        // build
        grunt.registerTask('build', ['clean','copy','uglify']);
        // Default task.
        grunt.registerTask('default', ['build']);
    };


})();