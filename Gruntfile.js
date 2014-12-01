module.exports = function (grunt) {

    grunt.registerTask('default', [ 'dev' ]);

    grunt.registerTask('dev', [
        'clean:dev',
        'sass:dev',
        'watch:dev',
        'clean:dev'
    ]);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            dev: {
                server: {
                    port: process.env.PORT || 8080,
                    host: process.env.IP || '127.0.0.1'
                },
            },
            src: {
                styles: {
                    dir: 'sass',
                    files: '**/*.scss',
                    main: 'sass/style.scss'
                },
                html: {
                    files: '**/*.html'
                }
            },
            dist: {
                styles: {
                    dir: 'styles',
                    bundle: 'styles/style.css'
                }
            }
        },
        clean: {
            dev: [ '<%= config.dist.styles.bundle %>' ]
        },
        sass: {
            dev: {
                options: {
                    require: [ 'compass', 'compass-inuit', 'scut', 'font-awesome-sass', 'sass-css-importer' ]
                },
                files: [{
                    src: '<%= config.src.styles.main %>',
                    dest: '<%= config.dist.styles.bundle %>'
                }]
            }
        },
        watch: {
            dev: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.src.styles.files %>'
                ],
                tasks: [
                    'clean:demo',
                    'sass:dev'
                ]
            }
        },
        'http-server': {
            dev: {
                root: '.',
                port: '<%= config.dev.server.port %>',
                host: '<%= config.dev.server.host %>',
                cache: -1,
                showDir : true,
                autoIndex: true,
                defaultExt: 'html',
                runInBackground: true
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    
};