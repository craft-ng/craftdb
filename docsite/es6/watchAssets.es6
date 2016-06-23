import gaze from 'gaze';
import {build, config as defaultBuildConfig} from './build';
import extend from 'extend';

export default function watch(options) {

    options = extend({buildOptions: defaultBuildConfig}, options);

    gaze(['docs/**/*.*', 'layouts/**/*.*', 'assets/**/*.*'], function (err, watcher) {
        watcher.on('all', function (event, filepath) {
            console.log(`File ${filepath} changed. Triggering events.`);
            build(options.buildOptions || defaultBuildConfig);
        });
    });

    console.log('Asset watcher configured');
}