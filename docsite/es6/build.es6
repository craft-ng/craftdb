import Metalsmith from 'metalsmith';
import layouts from 'metalsmith-layouts';
import asciidoc from './lib/plugins/asciidoc';
import metalsmithWebpack from 'metalsmith-webpack';
import webpack from 'webpack';
import path from 'path';
import extend from 'extend';

var config = {
    rootDirectory: path.resolve(__dirname, '..')
};

export {build, config};

function build(options) {
    console.log('Build started');

    options = extend({
        rootDirectory: __dirname,
        buildDestination: './build',
        docsSubdirectory: './docs',
        scriptsSubdirectory: './scripts',
        callback: ()=> {
        }
    }, options);

    Metalsmith(options.rootDirectory)
        .source('./docs')
        .destination(path.join(options.buildDestination, options.docsSubdirectory))
        .use(asciidoc())
        .use(layouts({engine: 'jade', default: 'main.jade'}))
        .use(metalsmithWebpack({
            context: path.join(options.rootDirectory, 'assets'),
            entry: {
                //'style-default': './stylesheets/default.css',
                'style-loader': './scripts/style-loader.js'
            },
            output: {
                path: path.resolve(options.rootDirectory, options.buildDestination, options.scriptsSubdirectory),
                filename: '[name].js',
                publicPath: '/assets/'
            },
            module: {
                loaders: [
                    {test: /\.css$/, loader: 'style-loader!css-loader'},
                    //Regex provided by cchamberlain - see below link:
                    //https://github.com/webpack/less-loader/issues/53
                    {
                        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/
                        , loader: 'url?limit=100000&name=[name].[ext]'
                    }

                ]
            },
            resolve: {
                //https://github.com/webpack/webpack/issues/472
                //http://www.unknownerror.org/opensource/webpack/webpack/q/stackoverflow/23305599/webpack-provideplugin-vs-externals
                //http://webpack.github.io/docs/configuration.html#resolve-root
                //Root must be an absolute path, because otherwise webpack can't load submodules
                //from modules located in node_modules, etc.
                root: [
                    path.join(options.rootDirectory, 'node_modules'),
                    path.join(options.rootDirectory, 'bower_components')
                ]
            },
            externals: {
                //http://www.unknownerror.org/opensource/webpack/webpack/q/stackoverflow/23305599/webpack-provideplugin-vs-externals
                //fontawesome: 'fontawesome'
            },
            plugins: [
                new webpack.ResolverPlugin(
                    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
                )
            ]
        }))
        .build(err => {
            if (err) throw err;
            else {
                console.log('Build complete!');
                options.callback();
            }
        });
};


