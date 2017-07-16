var gulp = require('gulp'),
  sass = require('gulp-sass'),
  minifycss = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  livereload = require('gulp-livereload'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  watch = require("gulp-watch-sass"),
  autoprefixer = require('autoprefixer'),
  mocha = require('gulp-mocha'),
  less = require('gulp-less'),
  jshint = require('gulp-jshint');

gulp.task('default', function () {
  gulp.start('start');
});

//TODO: autoprefixer isn't working correctly
gulp.task('sass', function () {
  return gulp.src('build/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer({ browsers: ['last 2 version'] })]))
    .pipe(sourcemaps.write())
    // .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(livereload());
});

// Compiles LESS > CSS
gulp.task('build-less', function () {
  return gulp.src('build/less/bootstrap.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    // .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(livereload());
});

gulp.task('buildJs', ['test'], function () {
  return gulp.src('build/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    // .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js/.'))
    .pipe(livereload());
});

gulp.task('updateHTML', function () {
  return gulp.src('public/index.html')
    .pipe(livereload());
});

// Lint Tasks
gulp.task('lint', function () {
  return gulp.src(['build/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', ['lint'], function () {
  gulp.src('tests/*.js')
    .pipe(mocha({
      reporter: 'spec',
      clearRequireCache: true,
      ignoreLeaks: true
    }));
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('build/js/*.js', ['buildJs']);
  gulp.watch('build/less/*.less', ['build-less']);
  gulp.watch('build/scss/*.scss', ['sass']);
  gulp.watch('public/index.html', ['updateHTML']);
});

gulp.task('start', ['watch'], function () {});
