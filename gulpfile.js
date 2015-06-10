var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload
var sass        = require('gulp-sass');
var haml        = require('gulp-ruby-haml');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var gcallback   = require('gulp-callback')
var plumber     = require('gulp-plumber')
var watch       = require('gulp-watch')
var changed     = require('gulp-changed')
var ngmin       = require('gulp-ngmin')
var task        = require('gulp-task')
var runsequence        = require('run-sequence')
//var jekyll      = require('gulp-jekyll')
require('shelljs/global')


var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

function onError(err) {
    console.log(err)
    exec("say wanker")
}


gulp.task('jekyll-build', function(done) {
    browserSync.notify(messages.jekyllBuild)
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
})

//gulp.task('jekyll-build', function () {
//    gulp.src(['./index.html', './_layouts/*.html', './_includes/*.html', './_posts/*.{markdown,md}'])
//        .pipe(jekyll({
//            source: './',
//            destination: './_site/',
//            bundleExec: true
//        }))
//        .pipe(gulp.dest('./_site/'));
//});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    reload()
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
        .pipe(gulp.dest('css'));
});

// Watch for changes in Haml files
//gulp.task('haml-watch', function() {
//
//    locations.forEach(function(location) {
        //var location = '_includes'
        //var src = location + '/haml/*.haml'
        //var dest = location
        //console.log("src: " + src)
    //return gulp.src(src).
    //        pipe(plumber({
    //            onError: onError
    //        })).
    //        pipe(watch(src)).
    //        pipe(changed(dest, {extension: '.html'})).
    //        pipe(haml()).
    //        pipe(gulp.dest(dest))
//})

gulp.task('haml-watch', function() {
    var locations = ['/Users/msl/Programming/robin/ruby/projects/robinrob.github.io-dev', '_includes', '_layouts', 'cv']
    locations.forEach(function(location) {
        var src = location + '/haml/*.haml'
        var dest = location
        gulp.src(src).
            pipe(plumber({
                onError: onError
            })).
            pipe(watch(src)).
            pipe(changed(dest, {extension: '.html'})).
            pipe(haml()).
            pipe(gulp.dest(dest)).
            pipe(gcallback(function () {
                console.log("HAML DONE")
                runsequence('jekyll-rebuild')
            }))
    })
})

// Watch for changes in Haml files
//gulp.task('haml-watch', function() {
//    var dest = '.'
//    gulp.src('./*.haml').
//        pipe(plumber({
//            onError: onError
//        })).
//        pipe(watch('./*.haml')).
//        pipe(changed(dest, {extension: '.html'})).
//        pipe(haml()).
//        pipe(gulp.dest(dest)).
//        pipe(gcallback(reload))
//})


// gulp.task('reload', function() {


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['_posts/*', 'img/*', '_sass/*.scss', 'orbiter/**/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'haml-watch', 'watch']);
