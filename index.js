#!/usr/bin/env node

/**
 * Module dependencies.
 */


var program = require('commander');
var dynamodb = require('./lib/dynamodb');
var fs=require('fs');

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
        dynamodb.getItem(tableName).then(console.log).catch(console.log)
    });

program
    .command('pull')
    .description('pull config content')
    .option("-t, --table <table_name>", "Which table to get")
    .action(function(options) {
        var tableName = options.table || 'gaga_config';
        dynamodb.getItem(tableName).then(function(data) {
            var fileName = 'config.json';
            var content=JSON.stringify(data, null, '\t');
            return new Promise(function(resolve, reject) {
                fs.writeFile(fileName, content, (err) => {
                    if (err) reject(err);
                    console.log(fileName);
                });
            });
        }).catch(console.log)
    });



program.parse(process.argv);
