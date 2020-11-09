const {
  task,
  series,
  src,
  dest,
  watch
} = require("gulp");

const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

task('sass', function () {
  return src(['styles/styles.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./'));
});

task('serve', function() {
  browserSync.init({
    server: "./"
  });

  watch(['styles/**/*.scss', 'styles/**/*.css'], series('sass'));
  watch(['styles.css', 'index.html']).on('change', browserSync.reload);
});

task('build', series('sass'));
task('default', series('build', 'serve'));
