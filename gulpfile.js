var gulp = require('gulp');

var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

var useref = require('gulp-useref');

var uglify = require('gulp-uglify');

var gulpIf = require('gulp-if');

var cssnano = require('gulp-cssnano');

var imagemin = require('gulp-imagemin');

var cache = require('gulp-cache');

var del = require('del');

var runSequence = require('run-sequence');

var pkg = require('./package.json');

var header = require('gulp-header');

var rename = require('gulp-rename');

var rev = require('gulp-rev');

var revReplace = require('gulp-rev-replace');

var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app',
		    routes: {
		        '/bower_components': 'bower_components'
		    }
		}
	});
});

gulp.task('useref', function() {
	return gulp.src('app/**/*.html')
		.pipe(useref(pkg.version))
		.pipe(gulpIf('*.js', uglify()))		
		.pipe(gulpIf('*.css', cssnano()))		
		.pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('clean:cdn', function() {
  return del.sync('cdn');
});

gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback);
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/**/*.css', browserSync.reload);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/**/*.js', browserSync.reload);
});

gulp.task('rev-all', function () {
  return gulp
    .src('dist/**/*')
    .pipe(rev())
    .pipe(revReplace()) 
    .pipe(rename(function (path) {
        if (path.basename.indexOf('index') >= 0) {
        	path.basename = "index";
        }
      }))
    .pipe(gulp.dest('cdn'));
});

gulp.task('copy-cdn-dist', function() {
  return gulp.src('cdn/**')	
	.pipe(gulp.dest('dist'));
});

gulp.task('default', function (callback) {
	  runSequence(['browserSync', 'watch'],
	    callback
	  );
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'useref', 'rev-all', 'clean:dist', 'copy-cdn-dist', 'clean:cdn',
    callback
  );
});
