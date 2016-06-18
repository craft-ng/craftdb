const Metalsmith = require('metalsmith');
const babel = require('metalsmith-babel');
const rename = require('metalsmith-rename');

const gaze = require('gaze');
const extend = require('extend');

var setupWatcher = () =>
    gaze(['docs/**/*.*', 'layouts/**/*.*', 'assets/**/*.*'], function (err, watcher) {
        watcher.on('all', function (event, filepath) {
            console.log(`File ${filepath} changed. Triggering events.`)
            build();
        });
    });

var build = (options) => {
    console.log('Transpiling started');

    options = extend({
        buildDestination: './bin',
        callback: ()=> {
        }
    }, options);

    Metalsmith(__dirname)
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

build();
//setupWatcher();


