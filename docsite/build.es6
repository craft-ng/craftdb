const Metalsmith = require('metalsmith');
const metadata = require('metalsmith-metadata');
const markdown = require('metalsmith-markdown');
const remarkable = require('metalsmith-markdown-remarkable');
const partial = require('metalsmith-partial');
const inplace = require('metalsmith-in-place');
const layouts = require('metalsmith-layouts');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
//import {logFiles} from './metalsmith/logFiles'
//const logFiles = require('metalsmith/logfiles.js');

function logFiles(files, metalsmith, done) {
    console.log(files);
    done();
}

function handlebarsPartial(options) {

    options.handlebars.registerHelper('partial', function (name) {
        var pathInfo = path.parse(this.metadata.rootRelativeFilename);
        var partialPath = path.normalize(path.join(pathInfo.dir, name + pathInfo.ext || '.md'));

        //Read file content:
        return fs.readFileSync(partialPath);
    });

    return function addFilePathMetadata(files, metalsmith, done) {
        for (var file in files) {
            files[file].metadata = {
                sourceRelativeFilename: file,
                rootRelativeFilename: path.join(metalsmith.source(), file)
            };
        }

        done();
    }
}

function logError(err) {
    if (err) {
        console.log(err);
    }
}

function print(msg) {
    return ()=>console.log(msg);
}

console.log('Build started');

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    //.use(handlebarsPartial({handlebars: handlebars}))
    // .use(partial({
    //     directory: './partials',
    //     engine: 'handlebars'
    // }))
    .use(inplace({
        engine: 'handlebars',
        partials: 'partials',
        pattern: '**/*.md'
    }))
    // .use(partial({directory: 'partials', engine: 'jade'}))

    //.use(markdown())
    // .use(function (files, metalsmith, done) {
    //     done();
    // })
    .use(remarkable())

    .use(layouts({engine: 'jade', default: 'home.jade'}))
    //.use(logFiles)
    .build(logError);
