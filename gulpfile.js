var gulp = require('gulp');
var ghPages = require('gulp-gh-pages')
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "_site"
        },
        browser: "google chrome"
    });
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
