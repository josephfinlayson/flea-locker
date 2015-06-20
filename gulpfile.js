var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var inject = require('gulp-inject');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var angularFilesort = require('gulp-angular-filesort');
var paths = {
    sass: ['./scss/**/*.scss'],
    js: ['./www/js/**/*.js'],
    css: ['./www/css/**/*.css'],
    html: ['./www/templates/**/*.html']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    return gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(browserSync.stream());
});

gulp.task('injectJS', function () {
    var target = gulp.src('./www/index.html');
    return target
        .pipe(inject(
            gulp.src(paths.js, {})
                .pipe(angularFilesort()), {
                ignorePath: '/www/',
                addRootSlash: false

            }))
        .pipe(gulp.dest('./www'))
});

gulp.task('watch',['injectJS'], function () {
        browserSync.init({
            server: {
                baseDir: "./www"
            }
        });

        gulp.watch(paths.html).on('change', browserSync.reload)
        gulp.watch(paths.js).on('change', browserSync.reload)
        gulp.watch(paths.sass, ['sass'])
        gulp.watch(paths.css).on('change', browserSync.reload)
        gulp.watch("www/index.html").on('change', browserSync.reload);
    }
);

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
