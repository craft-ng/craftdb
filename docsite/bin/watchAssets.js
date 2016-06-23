'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = watch;

var _gaze = require('gaze');

var _gaze2 = _interopRequireDefault(_gaze);

var _build = require('./build');

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function watch(options) {

    options = (0, _extend2.default)({ buildOptions: _build.config }, options);

    (0, _gaze2.default)(['docs/**/*.*', 'layouts/**/*.*', 'assets/**/*.*'], function (err, watcher) {
        watcher.on('all', function (event, filepath) {
            console.log('File ' + filepath + ' changed. Triggering events.');
            (0, _build.build)(options.buildOptions || _build.config);
        });
    });

    console.log('Asset watcher configured');
}