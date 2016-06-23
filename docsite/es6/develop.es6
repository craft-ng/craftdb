import runProcessSequence from './lib/run-process-sequence';
import {build, config} from './build';
import setupServer from './serve';
import setupWatch from './watchAssets';
import extend from 'extend';

process.on('unhandledRejection', function (error, promise) {
    console.error("UNHANDLED REJECTION", error.stack);
});

var isBuilt = runProcessSequence([
    {cmd: 'node', args: ['es6/transpile.es6']},
])
    .then(function () {
        return new Promise((resolve, reject)=> {

            build(extend({callback: ()=>resolve()}, config));
        });
    });

var isBeingWatched = isBuilt.then(function () {
    return new Promise((resolve, reject)=> {
        setupWatch({buildOptions: config});
        resolve();
    });
});

var isServerRunning = isBuilt.then(function () {
    return new Promise((resolve, reject)=> {
        setupServer({
            directory: config.buildDestination,
            onServerReady: ()=>resolve()
        });
    });
});

Promise.all([isBuilt, isBeingWatched, isServerRunning])
    .then(()=>console.log('All steps done.'));