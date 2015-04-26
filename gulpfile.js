var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var autoprefix = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var browserify = require('browserify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var watchify = require('watchify');
var sequence = require('gulp-watch-sequence');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var coffeeify = require('coffeeify');

const OUTPUT_FILE_NAME = 'gos-notification.min.js';
const ENTRY_FILE = './src/gos-notification.coffee';
const DIST_DIR = './dist';

var bundler = browserify({
    entries: [ENTRY_FILE],
    extensions: ['.coffee'],
    debug: !argv.production,
    cache: {},
    packageCache: {},
    fullPaths: true
});

var bundle = function(){
    var handler = bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(OUTPUT_FILE_NAME))
        .pipe(buffer())
        .pipe(gulpif(!argv.production, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(!argv.production, sourcemaps.write('./')))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(concat(OUTPUT_FILE_NAME))
        .pipe(gulp.dest(DIST_DIR));

    gutil.log("Updated JavaScript sources");

    return handler;
};

gulp.task('less', function() {
    gulp.src('./src/style/*.less')
        .pipe(less())
        .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
        .pipe(minifyCSS({
            'comments' : true,
            'spare': true
        }))
        .pipe(gulp.dest(DIST_DIR))
});

gulp.task('js', function (){
    return bundle();
});

gulp.task('watch', function(){
    var watcher = watchify(bundler);
    watcher.on('update', bundle, true);

    bundle();

    gulp.watch('./src/style/*.less', function(){
        gulp.run('less');
    });
});
