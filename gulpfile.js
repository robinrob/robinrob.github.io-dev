var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
//var haml        = require('gulp-haml');
var haml        = require('gulp-ruby-haml');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        browser: "google chrome"
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

gulp.task('haml', function () {
    var locations = ['.', '_layouts', '_includes', 'cv']

    locations.forEach(function(location) {
        console.log("Converting HAML to HTML in: " + location)
        gulp.src([location + '/haml/*.haml', location + '/*.haml'])
            .pipe(haml())
            .pipe(gulp.dest(location));
    })
});
/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['*.haml', '_layouts/haml/*', '_includes/haml/*', 'cv/haml/*'], ['haml']);
    gulp.watch(['_layouts/*', '_includes/*', '*.html', '_posts/*', 'css/*', '_sass/*', 'img/*', 'js/*', 'orbiter/**/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['haml', 'browser-sync', 'watch']);
