"use strict";

let fs = require('fs'),
  gulp = require('gulp'),
  babel = require('gulp-babel'),
  ghPages = require('gulp-gh-pages'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  uglify = require('gulp-uglify');

const COMPILED_DESTINATION = 'dist/';

gulp.task('calculator', () => {
  return gulp.src('src/calculator.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(COMPILED_DESTINATION))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({
      output: {
        quote_style: 1 // always use single quote
      }
    }))
    .pipe(gulp.dest(COMPILED_DESTINATION))
});

gulp.task('docs-html', ['calculator'], () => {''
  let calculatorSource = fs.readFileSync(`${COMPILED_DESTINATION}calculator.min.js`);
  return gulp.src('docs/index.html')
    .pipe(replace('%CALCULATOR%', calculatorSource))
    .pipe(gulp.dest(COMPILED_DESTINATION));
});

gulp.task('docs-css', () => {
  return gulp.src(['docs/*', '!docs/index.html'])
    .pipe(gulp.dest(COMPILED_DESTINATION));
});

gulp.task('docs', ['docs-html', 'docs-css']);

gulp.task('deploy', ['docs'], () => {
  return gulp.src(`${COMPILED_DESTINATION}**/*`)
    .pipe(ghPages());
});

gulp.task('default', () => {
  gulp.watch('src/calculator.js', ['calculator']);
  gulp.watch('docs/**/*.html', ['docs-html']);
  gulp.watch('docs/**/*.css', ['docs-css']);
});
