	var gulp     = require('gulp'),
	sass         = require('gulp-sass'),
	plumber      = require('gulp-plumber'),
	cleanCSS 		 = require('gulp-clean-css'),
	postcss      = require('gulp-postcss'),
	autoprefixer = require('gulp-autoprefixer'),
	rename 			 = require('gulp-rename'),
	cssMin 			 = require('gulp-cssmin')
	cssConcat 	 = require('gulp-concat-css');

	var uglify 	 = require('gulp-uglify'),
		concat = require('gulp-concat'),
		browserSync = require('browser-sync').create();

var sassFiles = 'scss/*.scss';
var jsFiles   = 'lib/*.js';
var jsDir 		= './js/*.js';
var cssDir 		= 'css/*.css';

//pre processor
gulp.task('sass', function(){
	gulp.src(sassFiles)
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
		.pipe(cleanCSS())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./css'));
});

// Concat css
gulp.task('cssconcat', function(){
	return gulp.src(cssDir)
	.pipe(plumber())
	.pipe(cssConcat('style.css'))
	.pipe(cssMin())
	.pipe(gulp.dest('./'));
});

// Compress and export to js folder
gulp.task('js', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

// Concate JS files into app.js
gulp.task('jsconcat', function(){
	return gulp.src([
		'./js/jquery.js',
		// './js/particles.min.js',
		// './js/app.js',
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./builds/'));
});


gulp.task('watch', function () {
	browserSync.init({
		injectChanges: true,
		server: {
			baseDir: "./"
		},
		port: 8000,
		ui: {
			port: 8001
		}
	});
	gulp.watch("*.html").on("change", browserSync.reload);
	gulp.watch(sassFiles, ['sass']);
	gulp.watch(jsFiles, ['js']);
	gulp.watch(jsDir, ['jsconcat']);
	gulp.watch(cssDir, ['cssconcat']);
});

gulp.task('default', ['watch']);
