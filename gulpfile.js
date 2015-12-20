var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var prefixer = require('gulp-prefixer');
var through = require('through2');

var path = {
    less: "./less",
    css: "./css",
    dist: "./dist"
};

gulp.task("css", function () {
    return gulp.src(path.less + "/**/*.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist));
});

gulp.task("css2", function () {
    return gulp.src(path.less + "/**/*.less")
        .pipe(importLess(path.less + "/import/import.less"))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist));
});

gulp.task("t", function () {
    return gulp.src(path.less + "/**/*.less")
        .pipe(prefixer("hello world"))
        .pipe(gulp.dest(path.less));
});

gulp.task('vendor', function () {
    return gulp.src(path.css + "/**/*.css")
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(path.dist));
});

var importLess = function (url) {
    return through.obj(function (file, enc, cb) {
        var css = "@import '" + url + "';\n" + file.contents.toString();
        file.contents = new Buffer(css);
        this.push(file);
        cb();
    });
};

gulp.task('default', ['css', 'vendor']);