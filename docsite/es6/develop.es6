import runProcessSequence from './lib/run-process-sequence'

runProcessSequence([
    {cmd: 'node', args: ['transpile.es6']},
    {cmd: 'node', args: ['bin/build.js']}
]);