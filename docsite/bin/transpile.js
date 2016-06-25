'use strict';

//The require calls cannot be replaced with es6 imports,
//because this file is run by node directly, e.g. 'node transpile.es6'.
//Node (specifically v8) does not support es6-style imports.
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