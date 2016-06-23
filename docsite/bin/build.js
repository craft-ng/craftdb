'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Metalsmith = require('metalsmith');
var handlebars = require('handlebars');
var inplace = require('metalsmith-in-place');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var asciidoc = require('./lib/plugins/asciidoc'); // require('metalsmith-asciidoc');
var serve = require('metalsmith-serve');
var gaze = require('gaze');
var metalsmithWebpack = require('metalsmith-webpack');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BowerWebpackPlugin = require('bower-webpack-plugin');
//require("font-awesome-webpack");
var path = require('path');

var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var extend = require('extend');
var portInUse = require('./lib/plugins/port-in-use');

var config = {
    rootDirectory: path.resolve(__dirname, '..'),
    buildDestination: './build'
};;

exports.build = build;
exports.config = config;


function build(options) {
    console.log('Build started');

    options = extend({
        rootDirectory: __dirname,
        buildDestination: './build',
        callback: function callback() {}
    }, options);

    Metalsmith(options.rootDirectory).source('./docs').destination(options.buildDestination).use(asciidoc()).use(function (files, metal, done) {
        console.log('before layouts');
        console.log(metal.metadata());
        done();
    }).use(layouts({ engine: 'jade', default: 'main.jade', locals: { local1: 'local1' } })).use(function (files, metal, done) {
        console.log('after layouts');
        console.log(metal.metadata());
        done();
    }).use(function (files, metal, done) {
        console.log('before webpack');
        console.log(files);
        done();
    }).use(metalsmithWebpack({
        context: path.join(options.rootDirectory, 'assets'),
        entry: {
            //'style-default': './stylesheets/default.css',
            'style-loader': './scripts/style-loader.js'
        },
        output: {
            path: path.resolve(options.rootDirectory, options.buildDestination, 'scripts'),
            filename: '[name].js',
            publicPath: '/assets/'
        },
        module: {
            loaders: [{ test: /\.css$/, loader: 'style-loader!css-loader' },
            //Regex provided by cchamberlain - see below link:
            //https://github.com/webpack/less-loader/issues/53
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'url?limit=100000&name=[name].[ext]'
            }]
        },
        resolve: {
            //https://github.com/webpack/webpack/issues/472
            //http://www.unknownerror.org/opensource/webpack/webpack/q/stackoverflow/23305599/webpack-provideplugin-vs-externals
            //http://webpack.github.io/docs/configuration.html#resolve-root
            //Root must be an absolute path, because otherwise webpack can't load submodules
            //from modules located in node_modules, etc.
            root: [path.join(options.rootDirectory, 'node_modules'), path.join(options.rootDirectory, 'bower_components')]
        },
        externals: {
            //http://www.unknownerror.org/opensource/webpack/webpack/q/stackoverflow/23305599/webpack-provideplugin-vs-externals
            //fontawesome: 'fontawesome'
        },
        plugins: [
        //new BowerWebpackPlugin()
        new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']))
        // new CopyWebpackPlugin([
        //     {from: './**/*.css'}
        // ], {copyUnmodified: true})
        ]
    })).use(function (files, metal, done) {
        console.log('after webpack');
        console.log(files);
        done();
    }).build(function (err) {
        if (err) throw err;else {
            console.log('Build complete!');
            options.callback();
        }
    });
};

// var config = {
//     rootDirectory: path.resolve(__dirname, '..'),
//     buildDestination: './build'
// };

// build(config);
// setupServer({directory: config.buildDestination});
// setupWatcher({buildOptions: config});