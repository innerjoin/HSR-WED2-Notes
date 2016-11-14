'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('public/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(f => f.base));
});

gulp.task('sass:watch', function () {
  gulp.watch('*.scss', ['sass']);
});