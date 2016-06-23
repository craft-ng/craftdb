'use strict';

var Metalsmith = require('metalsmith');
var babel = require('metalsmith-babel');
var rename = require('metalsmith-rename');
var path = require('path');
var gaze = require('gaze');
var extend = require('extend');

var transpile = function transpile(options) {
    console.log('Transpiling started');

    options = extend({
        rootDirectory: __dirname,
        buildDestination: './bin',
        callback: function callback() {}
    }, options);

    Metalsmith(options.rootDirectory).source('./es6').destination('./bin').use(rename([[/\.es6$/, '.js']])).use(babel({
        presets: ['es2015']
    })).build(function (err) {
        if (err) throw err;else {
            console.log('Transpiling complete!');
            options.callback();
        }
    });
};

transpile({ rootDirectory: path.resolve(__dirname, '..') });