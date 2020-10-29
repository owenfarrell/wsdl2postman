#!/usr/bin/env node

const converter = require('./convert');

converter.parseFile(process.argv[2], collection => {
    process.stdout.write(JSON.stringify(collection));
    process.exit(0);
});
