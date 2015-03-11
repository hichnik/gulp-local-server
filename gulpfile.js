'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    opn = require('opn');

var path = {
    src: '/',
    watch: '**/*.{js,html,css}'
};

var server = {
    host: 'localhost',
    port: '9000'
};

gulp.task('build', function () {
    gulp.src(path.src)
        .pipe(plumber())
        .pipe(connect.reload());
});

gulp.task('webserver', function() {
    connect.server({
        host: server.host,
        port: server.port,
        livereload: true
    });
});

gulp.task('openbrowser', function() {
    opn( 'http://' + server.host + ':' + server.port + '' );
});


gulp.task('watch', function(){
    watch([path.watch], function(event, cb) {
        gulp.start('build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);
