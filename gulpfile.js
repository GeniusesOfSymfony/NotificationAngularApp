var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var autoprefix = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('less', function() {
    gulp.src('./src/style/*.less')
        .pipe(less())
        .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
        .pipe(minifyCSS({
            'comments' : true,
            'spare': true
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('js', function () {
    gulp.src('./src/gos-notification.coffee', {read: false})
        .pipe(browserify({
            extensions: ['.coffee'],
            bundle: {
                debug: true
            }
        }))
        .pipe(uglify())
        .pipe(concat('gos-notification.min.js'))
        .pipe(gulp.dest('./dist/'))
});