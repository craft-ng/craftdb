const Metalsmith = require('metalsmith');
const handlebars = require('handlebars');
const inplace = require('metalsmith-in-place');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');

console.log('Build started...');

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .use(inplace({
        engine: 'handlebars',
        partials: 'partials',
        pattern: '**/*.md'
    }))
    .use(markdown({}))
    .use(layouts({engine: 'jade', default: 'main.jade'}))
    .build(err => {
        if (err) console.log(err);
        else console.log('Build complete!');
    });
