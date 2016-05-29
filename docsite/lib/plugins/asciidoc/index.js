'use strict';

var path = require('path');
var asciidocObject = require('asciidoctor.js')();
var asciidoc = asciidocObject.Asciidoctor(true);

var rAsciidoc = /\.(adoc|asciidoc)$/;

/**
 * A function that
 *
 * @param {string} filename The filename to test.
 * @return {boolean} Returns `true` if the file has a recognized Asciidoc extension, otherwise
 * `false`.
 */
var isAsciidoc = function(filename) {
    return rAsciidoc.test(filename);
};

/**
 * Metalsmith plugin that converts Asciidoc documents to HTML files.
 *
 * @param {Object} [options] A list of options to pass to the Asciidoctor compiler.
 * TODO: Currently unused, to be implemented in the future.
 * @return {Function} A plugin function, to be consumed by Metalsmith.
 */
module.exports = function plugin(options) {
    options = options || {};

    return function(files, metalsmith, done) {
        setImmediate(done);

        Object.keys(files).forEach(function(filename) {
            if (!isAsciidoc(filename)) {
                return;
            }

            var data = files[filename];
            var dir = path.dirname(filename);
            // The name of the file, without its path or file extension.
            var baseFilename = path.basename(filename, path.extname(filename));
            // The name of the output file.
            var outpath = (dir !== '.' ? path.join(dir, baseFilename) : baseFilename) +'.html';

            // Convert the input Asciidoc to HTML and replace the file's contents
            // https://github.com/asciidoctor/asciidoctor.js/issues/42
            // http://asciidoctor.org/man/asciidoctor/
            // https://github.com/asciidoctor/asciidoctor-epub3#declaring-the-spine
            var opts = asciidocObject.Opal.hash2(['base_dir', 'safe', 'attributes', 'doctype', 'backend'], {
                'base_dir': metalsmith.source(),
                'safe': 'safe',
                'attributes': ['showtitle', 'linkcss', 'icons=font@' ],
                'doctype': 'article',
                'backend': 'html5',
            });
            data.contents = new Buffer(asciidoc.$convert(data.contents.toString(), opts));

            // Remove the old filename from the output list
            delete files[filename];

            // Add the new file to the output list
            files[outpath] = data;
        });
    };
};
