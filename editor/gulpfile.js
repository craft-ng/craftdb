var gulp = require('gulp');
var gulpDebug = require('gulp-debug');
var path = require('path');
var del = require('del');
var es = require('event-stream');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var stylus = require('gulp-stylus');

var config = {
    tempDirectory: '.temp',
    scriptsDirectory: '.dist',
    serverScriptsDirectory: '.dist',
    serverViewsDirectory: '.dist/views-out',
    clientScriptsDirectory: '.www/scripts',
    clientStylesDirectory: '.www/styles'
};

function copy(files, destination) {
    return gulp.src(files)
        .pipe(gulp.dest(destination));
}

gulp.task('clean', function () {
    var directoriesStartingWithDot = './.**/';
    return del(directoriesStartingWithDot);
});

gulp.task('typescript', function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest(config.tempDirectory));
});

gulp.task('copy-scripts-client', function () {
    return copy(
        path.join(config.tempDirectory, './src/server/**/*.js'),
        config.serverScriptsDirectory
    );
});

gulp.task('copy-scripts-server', function () {
    return copy(
        path.join(config.tempDirectory, './src/client/**/*.js'),
        config.clientScriptsDirectory
    );
});

gulp.task('copy-scripts', gulp.parallel('copy-scripts-server', 'copy-scripts-client'));

gulp.task('stylus', function () {
    return gulp.src('./styles/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest(config.clientStylesDirectory));
});

gulp.task('develop', gulp.series('clean', gulp.parallel('typescript', 'stylus'), 'copy-scripts'));