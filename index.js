#!/usr/bin/env node

/**
 * Module dependencies.
 */


var program = require('commander');

program
    .version('0.1.0')

program
    .command('yo')
    .description('yo')
    .action(function() {
        console.log('yo');
    });

program.parse(process.argv);
