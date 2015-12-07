module.exports = function(grunt) {
    // Loads each task referenced in the packages.json file
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);

    // Initiate grunt tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        moment: require('moment'),
        // Tasks
        //less: {
        //    standard: {
        //        options: {
        //        },
        //        files: [{
        //            expand: true,
        //            cwd: 'app/assets/less/',
        //            src: ['*.less'],
        //            dest: 'build/',
        //            ext: '.css'
        //        }]
        //    }
        //},


        sass: {

            options: {},
            www: {
                files: {
                    'build/accordion-view.css': 'app/assets/sass/www-accordion-view.scss'
                }
            },
            www2: {
                files: {
                    'build/accordion-view.css': 'app/assets/sass/www2-accordion-view.scss'
                }
            }

        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
                    //diff: 'build/config/*.diff'
            },
            prefix: {
                expand: true,
                //flatten: true,
                src: 'build/*.css'
                    //dest: 'tmp/css/prefixed/'
            }
        },
        cssmin: {
            main: {
                options: {
                    banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>, released: <%= moment().format("HH:mm DD-MM-YYYY") %> */'
                },
                expand: true,
                cwd: 'build',
                src: ['*.css', '!*.min.css'],
                dest: 'build/',
                ext: '.v<%= pkg.version %>.min.css'
            }
        },
        copy: {
            dist: {
                expand: true,
                cwd: 'build/',
                src: '**',
                dest: 'dist',
                filter: 'isFile'
            },
            tests: {
                expand: true,
                cwd: 'tests',
                src: '**',
                dest: 'build/tests/',
                filter: 'isFile'
            },
            testjsdata: {
                src: ['vendor/frontend/app/assets/js/data/i18n.json'],
                dest: 'build/assets/js/data/i18n.json'
            },
            testscripts: {
                src: ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js'],
                dest: 'build/tests/qunit/<%= pkg.name %>.js'
            },
            teststyles: {
                src: ['build/<%= pkg.name %>.css'],
                dest: 'build/tests/qunit/<%= pkg.name %>.css'
            }
        },
        clean: {
            dist: ['dist/**/*'],
            deploy: ['deploy/**/*'],
            build: ['build/**/*'],
            tests: ['build/tests/**/*', 'build/assets/**/*']
        },

        jshint: {
            options: {
                ignores: ['app/assets/js/templates/templates.js']
            },
            files: ['app/assets/js/**/*.js', 'Gruntfile.js', 'bower.json', 'package.json']
        },
        handlebars: {
            options: {
                namespace: 'Hiof.Templates',
                processName: function(filePath) {
                    if (filePath.substring(0, 4) === 'vend') {
                        return filePath.replace(/^vendor\/frontend\/app\/templates\//, '').replace(/\.hbs$/, '');
                    } else {
                        return filePath.replace(/^app\/templates\//, '').replace(/\.hbs$/, '');
                    }
                }
            },
            all: {
                files: {
                    "build/templates.js": ["app/templates/**/*.hbs"]
                }
            }
        },
        concat: {
            scripts: {
                src: [
                    'vendor/jQuery-ajaxTransport-XDomainRequest/jquery.xdomainrequest.min.js',
                    'vendor/pathjs/path.js',
                    'vendor/handlebars/handlebars.js',
                    'vendor/jquery.scrollTo/jquery.scrollTo.js',
                    'build/templates.js',
                    'vendor/detectjs/detect.min.js',
                    'vendor/frontend/app/assets/js/components/__helper.js',
                    'vendor/frontend/app/assets/js/components/__options.js',
                    'vendor/bootstrap/js/transition.js',
                    'vendor/bootstrap/js/collapse.js',
                    'app/assets/js/components/_component_accordion.js'
                ],
                dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
            }
        },
        uglify: {
            options: {
                mangle: false,
                //compress: true,
                preserveComments: false,
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>, released: <%= moment().format("HH:mm DD-MM-YYYY") %> */'
            },
            main: {
                files: {
                    'build/<%= pkg.name %>.v<%= pkg.version %>.min.js': ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js']
                }
            }
        },
        versioning: {
            options: {
                cwd: 'build/',
                outputConfigDir: 'build/',
                namespace: 'hiof'
            },
            build: {
                files: [{
                    assets: [{
                        src: ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js'],
                        dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
                    }],
                    key: 'assets',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                }, {
                    assets: [{
                        src: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css',
                        dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css'
                    }],
                    key: 'assets',
                    dest: '',
                    type: 'css',
                    ext: '.min.css'
                }]
            },
            deploy: {
                options: {
                    output: 'php',
                    outputConfigDir: 'build/',
                },
                files: [{
                        assets: [{
                            src: ['build/<%= pkg.name %>.v<%= pkg.version %>.min.js'],
                            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.js'
                        }],
                        key: 'assets',
                        dest: '',
                        type: 'js',
                        ext: '.min.js'
                    },

                    {
                        assets: [{
                            src: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css',
                            dest: 'build/<%= pkg.name %>.v<%= pkg.version %>.min.css'
                        }],
                        key: 'assets',
                        dest: '',
                        type: 'css',
                        ext: '.min.css'
                    }
                ]
            }
        },
        secret: grunt.file.readJSON('secret.json'),
        sftp: {
            stage: {
                files: {
                    "./": "dist/**"
                },
                options: {
                    path: '<%= secret.stage.path %>',
                    srcBasePath: "dist/",
                    host: '<%= secret.stage.host %>',
                    username: '<%= secret.stage.username %>',
                    password: '<%= secret.stage.password %>',
                    //privateKey: grunt.file.read('id_rsa'),
                    //passphrase: '<%= secret.passphrase %>',
                    showProgress: true,
                    createDirectories: true,
                    directoryPermissions: parseInt(755, 8)
                }
            },
            prod: {
                files: {
                    "./": "dist/**"
                },
                options: {
                    path: '<%= secret.prod.path %>',
                    srcBasePath: "dist/",
                    host: '<%= secret.prod.host %>',
                    username: '<%= secret.prod.username %>',
                    password: '<%= secret.prod.password %>',
                    //privateKey: grunt.file.read('id_rsa'),
                    //passphrase: '<%= secret.passphrase %>',
                    showProgress: true,
                    createDirectories: true,
                    directoryPermissions: parseInt(755, 8)
                }
            },
            stage2: {
                files: {
                    "./": "dist/**"
                },
                options: {
                    path: '<%= secret.stage2.path %>',
                    srcBasePath: "dist/",
                    host: '<%= secret.stage2.host %>',
                    username: '<%= secret.stage2.username %>',
                    password: '<%= secret.stage2.password %>',
                    //privateKey: grunt.file.read('id_rsa'),
                    //passphrase: '<%= secret.passphrase %>',
                    showProgress: true,
                    createDirectories: true,
                    directoryPermissions: parseInt(755, 8)
                }
            },
            prod2: {
                files: {
                    "./": "dist/**"
                },
                options: {
                    path: '<%= secret.prod2.path %>',
                    srcBasePath: "dist/",
                    host: '<%= secret.prod2.host %>',
                    username: '<%= secret.prod2.username %>',
                    password: '<%= secret.prod2.password %>',
                    //privateKey: grunt.file.read('id_rsa'),
                    //passphrase: '<%= secret.passphrase %>',
                    showProgress: true,
                    createDirectories: true,
                    directoryPermissions: parseInt(755, 8)
                }
            }
        },
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    bases: 'build',
                    livereload: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'build'
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port%>/tests/qunit/index.html'
            }
        },
        qunit: {
            all: {
                options: {
                    timeout: 10000,
                    urls: [
                        'http://localhost:<%= express.all.options.port%>/tests/qunit/index.html'
                    ]
                }
            }
        },

        watch: {
            tests: {
                files: ['tests/**/*'],
                tasks: ['copy:tests', 'qunit'],
                options: {
                    livereload: true,
                },
            },
            hbs: {
                files: ['app/templates/**/*.hbs'],
                tasks: ['handlebars', 'copy:jstemplates'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['app/assets/js/**/*.js', 'app/assets/js/**/*.json'],
                tasks: ['jshint', 'concat:scripts', 'versioning:build'],
                options: {
                    livereload: true,
                },
            },
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: 'beta',
                regExp: false
            }
        }

    });

    // ----------------------------------------------------------
    // Tasks

    // Register tasks
    grunt.registerTask('subtaskJs', ['handlebars', 'jshint', 'concat:scripts', 'uglify']);
    //grunt.registerTask('subtaskCss', ['sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('subtaskClean', ['clean:build', 'clean:tests', 'clean:dist']);

    grunt.registerTask('tests', ['copy:testscripts', 'copy:teststyles', 'copy:tests', 'copy:testjsdata']);


    grunt.registerTask('build', ['subtaskClean', 'tests', 'clean:dist', 'subtaskJs', 'sass:www', 'autoprefixer', 'cssmin', 'versioning:build']);
    grunt.registerTask('build2', ['subtaskClean', 'tests', 'clean:dist', 'subtaskJs', 'sass:www2', 'autoprefixer', 'cssmin', 'versioning:build']);


    grunt.registerTask('deploy', ['build', 'versioning:deploy', 'copy:dist']);
    grunt.registerTask('deploy2', ['build2', 'versioning:deploy', 'copy:dist']);


    // Deploy tasks
    grunt.registerTask('deploy-staging2', ['deploy2', 'sftp:stage2']);
    grunt.registerTask('deploy-prod2', ['deploy2', 'sftp:prod2']);
    grunt.registerTask('deploy-staging', ['deploy', 'sftp:stage']);
    grunt.registerTask('deploy-prod', ['deploy', 'sftp:prod']);



    // Server tasks
    grunt.registerTask('server', [
        'build',
        'express',
        'open',
        'watch'
    ]);
    grunt.registerTask('test', [
        'build',
        'connect',
        'qunit'
    ]);


    // Bump tasks
    grunt.registerTask('major', ['bump:major']);
    grunt.registerTask('minor', ['bump:minor']);
    grunt.registerTask('patch', ['bump:patch']);
    grunt.registerTask('beta', ['bump:prerelease']);

};
