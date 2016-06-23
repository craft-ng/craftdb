'use strict';

var _runProcessSequence = require('./lib/run-process-sequence');

var _runProcessSequence2 = _interopRequireDefault(_runProcessSequence);

var _build = require('./build');

var _serve = require('./serve');

var _serve2 = _interopRequireDefault(_serve);

var _watchAssets = require('./watchAssets');

var _watchAssets2 = _interopRequireDefault(_watchAssets);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('unhandledRejection', function (error, promise) {
    console.error("UNHANDLED REJECTION", error.stack);
});

var isBuilt = (0, _runProcessSequence2.default)([{ cmd: 'node', args: ['es6/transpile.es6'] }]).then(function () {
    return new Promise(function (resolve, reject) {

        (0, _build.build)((0, _extend2.default)({ callback: function callback() {
                return resolve();
            } }, _build.config));
    });
});

var isBeingWatched = isBuilt.then(function () {
    return new Promise(function (resolve, reject) {
        (0, _watchAssets2.default)({ buildOptions: _build.config });
        resolve();
    });
});

var isServerRunning = isBuilt.then(function () {
    return new Promise(function (resolve, reject) {
        (0, _serve2.default)({
            directory: _build.config.buildDestination,
            onServerReady: function onServerReady() {
                return resolve();
            }
        });
    });
});

Promise.all([isBuilt, isBeingWatched, isServerRunning]).then(function () {
    return console.log('All steps done.');
});