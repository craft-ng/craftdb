'use strict';

var _runProcessSequence = require('./lib/run-process-sequence');

var _runProcessSequence2 = _interopRequireDefault(_runProcessSequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _runProcessSequence2.default)([{ cmd: 'node', args: ['transpile.es6'] }, { cmd: 'node', args: ['bin/build.js'] }]);