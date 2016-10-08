var webpack = require('webpack');
var path = require('path');
var failPlugin = require('webpack-fail-plugin');

module.exports = {
    //context: path.join(__dirname, './.ww')
    entry: {
        js: './src/client/app.ts'
    },
    output: {
        path: './.www/scripts/client/',
        publicPath: '/scripts/client/',
        filename: 'main-bundle-webpack.js'
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
        failPlugin
    ]
};