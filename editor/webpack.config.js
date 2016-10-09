var webpack = require('webpack');
var path = require('path');
var failPlugin = require('webpack-fail-plugin');

module.exports = {
    //context: path.join(__dirname, './.ww')
    devtool: 'source-map',
    entry: {
        js: './src/client/app.ts'
    },
    output: {
        path: './.www/scripts/client/',
        publicPath: '/scripts/client/'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        // modules:[path.resolve(__dirname, 'src/client')],
        // alias: {client: path.resolve(__dirname, '/src/client')}
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts?configFileName=tsconfig-client.json'}
        ]
    },
    plugins: [
        failPlugin,
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            output: {comments: false}
        })
    ]
};