"use strict";
const chokidar_1 = require("chokidar");
const fs = require('fs');
function fileReload(path, callback) {
    const watcher = chokidar_1.watch(path);
    watcher.on('add', file => readContent(file, callback));
    watcher.on('change', file => readContent(file, callback));
    watcher.on('error', error => console.log(`Watcher error: ${error}`));
}
exports.fileReload = fileReload;
function readContent(path, callback) {
    fs.readFile(path, 'utf-8', (err, content) => {
        if (err) {
            throw err;
        }
        else
            callback(content);
    });
}

//# sourceMappingURL=file-reload.js.map
