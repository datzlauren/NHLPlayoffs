var gulp = require('gulp');
var eslint = require('gulp-eslint');
var zip = require('gulp-zip');

var JS = [
  'content_scripts/api_poll.js',
  'popup/popup.js'
];
var BRUCE_FILES = [
  'content_scripts/api_poll.js',
  'manifest.json',
  'popup/popup.js',
  'app.js'
];

gulp.task('eslint', function () {
  return gulp.src(JS)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('zip', function () {
  return gulp.src(BRUCE_FILES, { base: '.' })
    .pipe(zip('files.zip'))
    .pipe(gulp.dest(''));
});
