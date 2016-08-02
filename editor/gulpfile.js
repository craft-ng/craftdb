var gulp = require('gulp');
var pug = require('gulp-pug');
var gulpDebug = require('gulp-debug');
var path = require('path');
var del = require('del');
var nodemon = require('gulp-nodemon');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var stylus = require('gulp-stylus');

var config = {
    tempDirectory: '.temp',
    serverScriptsDirectory: '.dist',
    serverViewsDirectory: '.dist/views',
    publicScriptsDirectory: '.www/scripts',
    publicStylesDirectory: '.www/styles'
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
        config.publicScriptsDirectory
    );
});

gulp.task('copy-scripts', gulp.parallel('copy-scripts-server', 'copy-scripts-client'));

gulp.task('stylus', function () {
    return gulp.src('./styles/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest(config.publicStylesDirectory));
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
            gulp.series('typescript', 'copy-scripts'),
            'stylus',
            'pug'
        ),
        'tidy-when-done'
    )
);

gulp.task('watch', function () {
    gulp.watch('./typings/**/*.ts', gulp.series('build'));
    gulp.watch('./src/**/*.ts', gulp.series('build'));
    gulp.watch('./styles/**/*.styl', gulp.series('build'));
    gulp.watch('./views/**/*.pug', gulp.series('build'));
});

gulp.task('serve-with-reload', function () {
    nodemon({
        script: '.dist/app.js',
        ext: 'js ts',
        watch: '.dist'
        // tasks: ['build']
    });
});

gulp.task('develop',
    gulp.series(
        'build',
        gulp.parallel('watch', 'serve-with-reload')
    )
);