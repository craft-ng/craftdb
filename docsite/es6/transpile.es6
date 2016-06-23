const Metalsmith = require('metalsmith');
const babel = require('metalsmith-babel');
const rename = require('metalsmith-rename');
const path = require('path');
const gaze = require('gaze');
const extend = require('extend');

var transpile = (options) => {
    console.log('Transpiling started');

    options = extend({
        rootDirectory: __dirname,
        buildDestination: './bin',
        callback: ()=> {
        }
    }, options);

    Metalsmith(options.rootDirectory)
        .source('./es6')
        .destination('./bin')
        .use(rename([
            [/\.es6$/, '.js']
        ]))
        .use(babel({
            presets: ['es2015']
        }))
        .build(err => {
            if (err) throw err;
            else {
                console.log('Transpiling complete!');
                options.callback();
            }
        });
};

transpile({rootDirectory: path.resolve(__dirname, '..')});


