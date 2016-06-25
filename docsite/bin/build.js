'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.config = exports.build = undefined;

var _metalsmith = require('metalsmith');

var _metalsmith2 = _interopRequireDefault(_metalsmith);

var _metalsmithLayouts = require('metalsmith-layouts');

var _metalsmithLayouts2 = _interopRequireDefault(_metalsmithLayouts);

var _asciidoc = require('./lib/plugins/asciidoc');

var _asciidoc2 = _interopRequireDefault(_asciidoc);

var _metalsmithWebpack = require('metalsmith-webpack');

var _metalsmithWebpack2 = _interopRequireDefault(_metalsmithWebpack);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    rootDirectory: _path2.default.resolve(__dirname, '..')
};

exports.build = build;
exports.config = config;


function build(options) {
    console.log('Build started');

    options = (0, _extend2.default)({
        rootDirectory: __dirname,
        buildDestination: './build',
        docsSubdirectory: './docs',
        scriptsSubdirectory: './scripts',
        callback: function callback() {}
    }, options);

    (0, _metalsmith2.default)(options.rootDirectory).source('./docs').destination(_path2.default.join(options.buildDestination, options.docsSubdirectory)).use((0, _asciidoc2.default)()).use((0, _metalsmithLayouts2.default)({ engine: 'jade', default: 'main.jade' })).use((0, _metalsmithWebpack2.default)({
        context: _path2.default.join(options.rootDirectory, 'assets'),
        entry: {
            //'style-default': './stylesheets/default.css',
            'style-loader': './scripts/style-loader.js'
        },
        output: {
            path: _path2.default.resolve(options.rootDirectory, options.buildDestination, options.scriptsSubdirectory),
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
            root: [_path2.default.join(options.rootDirectory, 'node_modules'), _path2.default.join(options.rootDirectory, 'bower_components')]
        },
        externals: {
            //http://www.unknownerror.org/opensource/webpack/webpack/q/stackoverflow/23305599/webpack-provideplugin-vs-externals
            //fontawesome: 'fontawesome'
        },
        plugins: [new _webpack2.default.ResolverPlugin(new _webpack2.default.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']))]
    })).build(function (err) {
        if (err) throw err;else {
            console.log('Build complete!');
            options.callback();
        }
    });
};