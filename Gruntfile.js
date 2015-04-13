module.exports = function(grunt) {

    var config = {

        pkg: grunt.file.readJSON("package.json"),

        clean: {
            demo: ["demo/lib"],
            dist: ["dist"]
        },
        yuidoc: {
            compile: {
                name: "<%= pkg.name %>",
                description: "<%= pkg.description %>",
                version: "<%= pkg.version %>",
                url: "<%= pkg.homepage %>",
                options: {
                    paths: "source/",
                    outdir: "documentation/"
                }
            }
        },
        jasmine : {
          src : 'source/**/*.js',
          options : {
            specs : 'spec/**/*.js',
            vendor: [
                "bower_components/jquery/dist/jquery.js"
            ]
          }
        },
        copy: {
            source: { expand: true, cwd: "dist", src: ["**/*.min.js"], dest: "demo/lib/js" },
            jquery: { expand: true, cwd: "bower_components/jquery/dist", src: ["*.min.js", "*.min.map"], dest: "demo/lib/js" },
            mustache: { expand: true, cwd: "bower_components/mustache", src: ["*.min.js"], dest: "demo/lib/js" },
            bootstrap_js: { expand: true, cwd: "bower_components/bootstrap/dist/js", src: ["*.min.js"], dest: "demo/lib/js" },
            bootstrap_css: { expand: true, cwd: "bower_components/bootstrap/dist/css", src: ["*.min.css"], dest: "demo/lib/css" },
            bootstrap_fonts: { expand: true, cwd: "bower_components/bootstrap/dist/fonts", src: ["*.*"], dest: "demo/lib/fonts" }
        },
        concat: {
            options: { separator: ";" },
            dist: { src: [
                "source/js/hydrogen.source.http.js",
                "source/js/hydrogen.source.local.js",
                "source/js/hydrogen.partialView.js",
                "source/js/hydrogen.navigation.js",
                "source/js/hydrogen.page.js",
                "source/js/hydrogen.area.js",
                "source/js/hydrogen.js"
            ], dest: "dist/hydrogen.min.js" }
        },
        jshint: {
            source: {
                // Validate source code against the jshintrc file"s rules
                src: [
                    "source/**/*.js",
                    "spec/**/*.js"
                ],
                options: {
                    jshintrc: './.jshintrc'
                }
            }
        },
        watch: {
            source: {
                files: ["source/**/*.*", '<config:jasmine.specs>'],
                tasks: ["jshint", "clean:demo", "copy", "jasmine"],
                options: {
                    spawn: false
                }
            }
        },
        "http-server": {
            dev: {

                // the server root directory
                root: "demo",

                port: 8282,

                host: "127.0.0.1",

                cache: false,
                showDir : true,
                autoIndex: true,
                defaultExt: "html",

                // run in parallel with other tasks
                runInBackground: true
            }
        }
    };

    grunt.loadNpmTasks("grunt-http-server");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-yuidoc");

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig(config);

    grunt.registerTask("default", [
        "jshint",
        "clean:demo",
        "concat:dist",
        "copy",
        "http-server:dev",
        "watch:source"
    ]);

    grunt.registerTask('test', ['jshint', 'jasmine']);

    grunt.registerTask("distrib", [
        "jshint",
        "clean:dist",
        "concat:dist",
        "yuidoc"
    ]);

    // Travis CI task.
    grunt.registerTask('travis', [
        "jshint",
        "jasmine",
        "clean:demo",
        "concat:dist",
        "copy",
        "http-server:dev"
    ]);
};
