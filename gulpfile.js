var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var path = {
	less : "./less",
	css : "./css",
	dist : "./dist"
}

gulp.task("css", function(){
	return gulp.src(path.less + "/**/*.less")
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(concat('all.css'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.dist));	
});

gulp.task('vendor', function(){
	return gulp.src(path.css + "/**/*.css")
	.pipe(concat('vendor.css'))
	.pipe(gulp.dest(path.dist));
})

gulp.task('default', ['css', 'vendor']);