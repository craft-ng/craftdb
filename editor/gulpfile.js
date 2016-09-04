var gulp = require('gulp');
var pug = require('gulp-pug');
var gulpDebug = require('gulp-debug');
var rename = require('gulp-rename');
var path = require('path');
var del = require('del');
var nodemon = require('gulp-nodemon');
var server = require('gulp-develop-server');
var browserSync = require('browser-sync').create();

var ts = require('gulp-typescript');
var tsCommonOptions = {}; //{typescript: require('typescript')};

var tsServerProject = ts.createProject('tsconfig.json', tsCommonOptions);
var tsClientProject = ts.createProject('tsconfig-client.json', tsCommonOptions);

var stylus = require('gulp-stylus');

var config = {
    tempDirectory: '.temp',
    serverScriptsDirectory: '.dist',
    serverViewsDirectory: '.dist/views',
    publicScriptsDirectory: '.www/scripts',
    publicStylesDirectory: '.www/styles',
    serverScriptsExtension: '.js',
    publicScriptsExtension: '.js'
};

function copy(files, destination, renameOptions) {
    var doNotRename = {};

    return gulp.src(files)
        .pipe(rename(renameOptions || doNotRename))
        .pipe(gulp.dest(destination));
}

gulp.task('clean', function () {
    var directoriesStartingWithDot = './.**/';
    return del(directoriesStartingWithDot);
});

gulp.task('typescript-client', function () {
    return tsClientProject.src()
        .pipe(ts(tsClientProject))
        .js.pipe(gulp.dest(config.tempDirectory));
});

gulp.task('typescript-server', function () {
    return tsServerProject.src()
        .pipe(ts(tsServerProject))
        .js.pipe(gulp.dest(config.tempDirectory));
});

gulp.task('typescript', gulp.parallel(
    'typescript-client',
    'typescript-server'
));

gulp.task('copy-scripts-client', function () {
    return copy(
        path.join(config.tempDirectory, './client/**/*.js'),
        config.publicScriptsDirectory,
        {extname: config.publicScriptsExtension}
    );
});

gulp.task('copy-scripts-server', function () {
    return copy(
        path.join(config.tempDirectory, './server/**/*.js'),
        config.serverScriptsDirectory,
        {extname: config.serverScriptsExtension}
    );
});

gulp.task('copy-scripts', gulp.parallel('copy-scripts-server', 'copy-scripts-client'));

gulp.task('copy-views-server', function () {
    return copy(
        path.join('./src', './server/**/*.pug'),
        config.serverScriptsDirectory
    );
});

gulp.task('stylus', function () {
    return gulp.src('./styles/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest(config.publicStylesDirectory))
        .pipe(browserSync.stream());
});

gulp.task('pug', function () {
    return gulp.src('./views/**/*.pug')
    //.pipe(pug())
        .pipe(gulp.dest(config.serverViewsDirectory));
});

gulp.task('tidy-when-done', function () {
    return del(config.tempDirectory);
});

gulp.task('build',
    gulp.series(
        'clean',
        gulp.parallel(
            gulp.series('typescript-client', 'copy-scripts-client'),
            gulp.series('typescript-server', 'copy-scripts-server', 'copy-views-server'),
            // gulp.series('typescript-server', 'copy-scripts', 'copy-views-server'),
            'stylus',
            'pug'
        ),
        'tidy-when-done'
    )
);

gulp.task('watch', function () {
    gulp.watch('./typings/**/*.ts', gulp.series('build', 'serve-restart'));
    gulp.watch('./src/**/*.ts', gulp.series('build', 'serve-restart'));
    gulp.watch('./styles/**/*.styl', gulp.series('build'));
    gulp.watch('./views/**/*.pug', gulp.series('build'));
});

gulp.task('serve', function () {

    browserSync.init({
        proxy: 'localhost:3010'
    });

    return server.listen({
        path: '.dist/app/app' + config.serverScriptsExtension
    });
});

gulp.task('serve-restart', function (done) {
    server.restart(function (error) {
        if (!error) done();
    });
});

gulp.task('develop',
    gulp.series(
        'build',
        gulp.parallel('watch', 'serve')
    )
);