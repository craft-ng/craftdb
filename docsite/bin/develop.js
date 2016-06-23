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

console.log('rerun');

console.log(process.pid);

var isBuilt = (0, _runProcessSequence2.default)([{ cmd: 'node', args: ['transpile.es6'] }]).
//{cmd: 'node', args: ['bin/build.js']}
then(function () {
    return new Promise(function (resolve, reject) {

        (0, _build.build)((0, _extend2.default)({ callback: function callback() {
                return resolve();
            } }, _build.config));

        // build(config);
        // setupWatch({buildOptions: config});
        // setupServer({directory: config.buildDestination});
        // setupServer({
        //     directory: config.buildDestination,
        //     onServerReady: ()=>resolve()
        // });
        //  resolve();
    });
    //resolve();
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

// var isBuilt = runProcessSequence([
//     {cmd: 'node', args: ['transpile.es6']},
//     //{cmd: 'node', args: ['bin/build.js']}
// ]).then(function () {
//     return new Promise((resolve, reject)=> {
//         build(extend({callback: ()=>resolve()}, config));
//         // resolve();
//     });
//     //resolve();
// });
//
// var isServerRunning = isBuilt.then(function () {
//     return new Promise((resolve, reject)=> {
//         setupServer({
//             directory: config.buildDestination,
//             onServerReady: ()=>resolve()
//         });
//         //This resolve is probably too early because server is not yet started.
//         //It first checks whether the port is in use, but the server itself is
//         //run in a callback.
//         // resolve();
//         // reject(); //
//     });
//     // setupServer({directory: config.buildDestination});
//     // //resolve();
// });
//
// var isBeingWatched = isBuilt.then(function () {
//     return new Promise((resolve, reject)=> {
//         setupWatch({buildOptions: config});
//         resolve();
//     });
//     // setupServer({directory: config.buildDestination});
//     // //resolve();
// });
//
// console.log('before promise all ?');
// Promise.all([isBuilt, isServerRunning, isBeingWatched]).then(()=>console.log("OK"));
// // .catch(err=>console.log(`Not OK. Err : ${err}`));
//
// console.log('end?s');;