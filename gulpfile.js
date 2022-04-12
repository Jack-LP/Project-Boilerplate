const { series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile SCSS
function style() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
}

// BrowserSync Server
function watch() {
  browserSync.init({
    server: {
      baseDir: './src',
    },
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

// Build CSS Folder
exports.style = style;

// Runs Dev Server
exports.watch = watch;

// Runs both tasks, inital command
exports.dev = series(style, watch);
