'use strict';

require('babel-polyfill');

var suppressEpipe = require('epipebomb');
var childProcess = require('child_process');
var onDeath = require('death');

// process.on('exit', function (a, b, c) {
//     console.log(a);
//     console.log(b);
//     console.log(c);
//     console.log('exiting ' + __filename);
// });
//
// onDeath(function (signal, err) {
//     console.log('death: ' + __filename + ' signal: ' + signal + ' err: ' + err);
//
//     for (process of childProcesses) {
//         console.log(process);
//         process.kill(signal);
//     }
// });
//
// var childProcesses = [];
//
// [
//     {cmd: 'node', args: ['transpile.es6']},
//     {cmd: 'node', args: ['bin/build.js']}
// ].forEach(task=> {
//     console.log('starting ' + task);
//     var child = childProcess.spawn(task.cmd, task.args);
//
//     child.stdout.pipe(process.stdout);
//     child.stderr.pipe(process.stderr);
//
//     // console.log(child);
//     childProcesses.push(child);
//
//     child.on('exit', function(code, signal) {
//
//     });
// });

// var currentProcess = childProcess.spawn('node', ['transpile.es6']);
//
// currentProcess.stdout.pipe(process.stdout);
// currentProcess.stderr.pipe(process.stderr);
//
// currentProcess = childProcess.spawn('node', ['bin/build.js']);
//
// currentProcess.stdout.pipe(process.stdout);
// currentProcess.stderr.pipe(process.stderr);
//
// onDeath(function (signal, err) {
//     console.log('death: ' + __filename + ' signal: ' + signal + ' err: ' + err);
//
//     currentProcess.kill(signal);
//
// });

// onDeath(function (signal, err) {
//     console.log('death: ' + __filename + ' signal: ' + signal + ' err: ' + err);
//
//     if (child)
//         child.kill(signal);
//
// });
//
// var child = childProcess.spawn('node', ['transpile.es6']);
//
// child.stdout.pipe(process.stdout);
// child.stderr.pipe(process.stderr);
//
// // console.log(child);
// //childProcesses.push(child);
//
// child.on('exit', function (code, signal) {
//     child = childProcess.spawn('node', ['bin/build.js']);
//
//     child.stdout.pipe(process.stdout);
//     child.stderr.pipe(process.stderr);
//
// // console.log(child);
//     //childProcesses.push(child);
//
//     child.on('exit', function (code, signal) {
//         console.log('done');
//     });
// });
//
// console.log('as');

var runningProcess;
//var isExiting = false;

function runProcess(cmd, args, doneCallback) {
    var child = runningProcess = childProcess.spawn(cmd, args);

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on('exit', function (code) {
        console.log('Process \'' + cmd + '\' exited with code ' + code + '.');

        doneCallback();
    });
}

// function chainPromises(tasks, afterPromise) {
//     var nextTask = tasks.shift();
//
//     if (!nextTask) {
//         return Promise.resolve();
//     } else {
//         return new Promise(function (resolve, reject) {
//             console.log(`Running cmd: '${task.cmd}' with args '${task.args}'`);
//             runProcess(task.cmd, task.args, ()=> {
//                 console.log(`Exiting cmd: '${task.cmd}' with args '${task.args}'`);
//                 resolve();
//             });
//         });
//     }
//
// }
function runProcessSequence(tasks) {

    var promise = Promise.resolve();

    tasks.forEach(function (task) {

        //if (!isExiting) {
        promise = promise.then(function (result) {
            return new Promise(function (resolve, reject) {
                console.log('Running cmd: \'' + task.cmd + '\' with args \'' + task.args + '\'');
                runProcess(task.cmd, task.args, function () {
                    console.log('Exiting cmd: \'' + task.cmd + '\' with args \'' + task.args + '\'');
                    resolve();
                });
            });
        });
        // .catch(function (reason) {
        //     console.log('catch ' + reason);
        // });
        //}
    });
}

onDeath(function (signal, err) {
    console.log('Process originating in file \'' + __filename + '\' dies after receiving signal \'' + signal + '\'. \n        Error info: ' + err);

    //isExiting = true;

    if (runningProcess) {
        console.log('Killing child process');
        runningProcess.kill(signal);
        runningProcess = undefined;
    }
});

// https://github.com/mhart/epipebomb:
// By default, node throws EPIPE errors if process.stdout is being written to
// and a user runs it through a pipe that gets closed while the process is still
// outputting (eg, the simple case of piping a node app through head).
//suppressEpipe();

runProcessSequence([{ cmd: 'node', args: ['transpile.es6'] }, { cmd: 'node', args: ['bin/build.js'] }]);