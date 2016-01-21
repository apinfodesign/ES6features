"use strict";

var gulp    = require('gulp');
var mocha   = require('gulp-mocha');
const babel = require('gulp-babel');

var gutil   = require('gulp-util');
var jshint  = require('gulp-jshint');

require('babel-core/register');

gulp.task('test', function () {
    return gulp.src( 'test/**/*.js', { read: false } )
        .pipe(mocha({
            reporter: 'nyan',
            compilers: [
                'js:babel-core/register',
            ]
        }));
});


gulp.task('build', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});


gulp.task('mocha', function() {
    return gulp.src(['test/*.js'], {read: false})
        .pipe(mocha({reporter: 'list'}))
        //.on('error', handleError);
        .on('error', gutil.log);
});


gulp.task('lint', function() {
    return gulp.src(['*.js', 'test/*.js'], {read: false})
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('watch-mocha', function() {
    gulp.watch(['./*.js', 'test/**','!package.json'], ['lint','mocha']);
});


gulp.task('default', ['build', 'lint', 'mocha']);

gulp.task('testing', ['build', 'lint', 'mocha', 'watch-mocha']);