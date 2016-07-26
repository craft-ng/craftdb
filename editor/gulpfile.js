var gulp = require('gulp');
var path = require('path');
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

gulp.task('typescript', function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest(config.tempDirectory));
});

gulp.task('copy-scripts', function () {
    function copy(files, destination) {
        return gulp.src(path.join(config.tempDirectory, files))
            .pipe(gulp.dest(destination));
    }

    return es.merge(
        copy('./src/server/**/*.js', config.serverScriptsDirectory),
        copy('./src/client/**/*.js', config.clientScriptsDirectory)
    );
});

gulp.task('stylus', function () {
    return gulp.src('./assets/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest(config.clientScriptsDirectory));
});

gulp.task('develop', gulp.series(gulp.parallel('typescript', 'stylus'), 'copy-scripts'));