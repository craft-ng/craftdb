import {watch, WatchOptions} from "chokidar";
import fs = require('fs');

type ContentReadyCallback = (content: string) => void;

export function fileReload(path: string, callback: ContentReadyCallback) {
    const watcher: fs.FSWatcher = watch(path);

    watcher.on('add', file=>readContent(file, callback));
    watcher.on('change', file=>readContent(file, callback));
    watcher.on('error', error=>console.log(`Watcher error: ${error}`));
}

function readContent(path: string, callback: ContentReadyCallback) {
    fs.readFile(path, 'utf-8', (err, content) => {
        if (err) {
            throw err;
        }
        else callback(content);
    });
}