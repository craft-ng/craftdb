import runProcessSequence from './lib/run-process-sequence';
import {build, config} from './build';
import setupServer from './serve';
import setupWatch from './watchAssets';
import extend from 'extend';

process.on('unhandledRejection', function (error, promise) {
    console.error("UNHANDLED REJECTION", error.stack);
});

console.log('rerun');

console.log(process.pid);

var isBuilt = runProcessSequence([
    {cmd: 'node', args: ['transpile.es6']},
    //{cmd: 'node', args: ['bin/build.js']}
])
    .then(function () {
        return new Promise((resolve, reject)=> {
            build(config);
            setupWatch({buildOptions: config});
            setupServer({directory: config.buildDestination});
            // setupServer({
            //     directory: config.buildDestination,
            //     onServerReady: ()=>resolve()
            // });
            //  resolve();
        });
        //resolve();
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