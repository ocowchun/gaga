#!/usr/bin/env node

/**
 * Module dependencies.
 */


var program = require('commander');
var dynamodb = require('./lib/dynamodb');


program
    .version('0.1.0')

program
    .command('yo')
    .description('yo')
    .action(function() {
        console.log('yo');
    });

program
    .command('show')
    .description('show config content')
    .option("-t, --table <table_name>", "Which table to get")
    .action(function(options) {
        var tableName = options.table || 'gaga_config';
        dynamodb.pull(tableName).then(console.log).catch(console.log)
    });


program.parse(process.argv);
