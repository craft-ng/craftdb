import http from 'http';
import finalhandler from 'finalhandler';
import serveStatic from 'serve-static';
import portInUse from './lib/plugins/port-in-use';
import extend from 'extend';

export default function serve(options) {
    var options = extend({
        directory: './build',
        port: 8080,
        onServerReady: ()=> {
        }
    }, options);

    portInUse(options.port, isInUse=> {
        if (isInUse) console.log('Port ' + options.port + ' is in use. Static server will not be restarted');
        else {
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