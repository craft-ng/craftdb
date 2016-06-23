'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = serve;
var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var extend = require('extend');
var portInUse = require('./lib/plugins/port-in-use');

function serve(options) {
    var options = extend({
        directory: './build',
        port: 8080,
        onServerReady: function onServerReady() {}
    }, options);

    portInUse(options.port, function (isInUse) {
        if (isInUse) console.log('Port ' + options.port + ' is in use. Static server will not be restarted');else {
            console.log('Port ' + options.port + ' is not in use.');

            var serve = serveStatic(options.directory);

            console.log('Starting static server');

            var server = http.createServer(function (req, res) {
                var done = finalhandler(req, res);
                serve(req, res, done);
            });

            server.listen(options.port);
            console.log('Server listening on port ' + options.port);

            options.onServerReady();
        }
    });
};