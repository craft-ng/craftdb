'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = serve;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _finalhandler = require('finalhandler');

var _finalhandler2 = _interopRequireDefault(_finalhandler);

var _serveStatic = require('serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _portInUse = require('./lib/plugins/port-in-use');

var _portInUse2 = _interopRequireDefault(_portInUse);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serve(options) {
    var options = (0, _extend2.default)({
        directory: './build',
        port: 8080,
        onServerReady: function onServerReady() {}
    }, options);

    (0, _portInUse2.default)(options.port, function (isInUse) {
        if (isInUse) console.log('Port ' + options.port + ' is in use. Static server will not be restarted');else {
            console.log('Port ' + options.port + ' is not in use.');

            var serve = (0, _serveStatic2.default)(options.directory);

            console.log('Starting static server');

            var server = _http2.default.createServer(function (req, res) {
                var done = (0, _finalhandler2.default)(req, res);
                serve(req, res, done);
            });

            server.listen(options.port);
            console.log('Server listening on port ' + options.port);

            options.onServerReady();
        }
    });
};