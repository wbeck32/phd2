var gulp = require('gulp'),
  sass = require('gulp-sass'),
  minifycss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  livereload = require('gulp-livereload'),
  postcss      = require('gulp-postcss'),
  sourcemaps   = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  watch = require("gulp-watch-sass"),
  autoprefixer = require('autoprefixer'),
  less = require('gulp-less');


gulp.task('default', function() {
  gulp.start('start');
});

//TODO: autoprefixer isn't working correctly
gulp.task('sass', function () {
  return gulp.src('build/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(sourcemaps.write())
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(livereload());
});

// Compiles LESS > CSS
gulp.task('build-less', function(){
    return gulp.src('build/less/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('public/css'));
});

gulp.task('start',['sass', 'build-less'],function(){
  livereload.listen();
  gulp.watch('build/less/*.less', ['sass']);
  gulp.watch('build/scss/*.scss', ['sass']);
});
