#!/usr/bin/env node

/**
 * Module dependencies.
 */


var program = require('commander');
var dynamodb = require('./lib/dynamodb');
var path = require("path");
var fs = require('fs');

program
    .version('0.1.3')

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
    .option("-i, --id <item_id>", "Which item to get")
    .action(function(options) {
        var tableName = options.table || 'gaga_config';
        var id = options.id || 'current';
        dynamodb.getItem(tableName, id).then(function(data) {
            var content = JSON.stringify(data, null, '\t');
            console.log(content);
        }).catch(console.log)
    });

program
    .command('pull')
    .description('pull config content')
    .option("-t, --table <table_name>", "Which table to get")
    .option("-i, --id <item_id>", "Which item to get")
    .action(function(options) {
        var tableName = options.table || 'gaga_config';
        var id = options.id || 'current';

        dynamodb.getItem(tableName, id).then(function(data) {
            var fileName = 'config.json';
            var content = JSON.stringify(data, null, '\t');
            return new Promise(function(resolve, reject) {
                fs.writeFile(fileName, content, (err) => {
                    if (err) reject(err);
                    console.log(fileName);
                });
            });
        }).catch(console.log)
    });

program
    .command('push')
    .description('push config content')
    .option("-t, --table <table_name>", "Which table to push")
    .option("-f, --file <file_name>", "Which file to push")
    .action(function(options) {
        var currentDir = path.resolve("./");
        var filePath = options.file || 'config.json';
        var fullFilePath = currentDir + '/' + filePath;
        var tableName = options.table || 'gaga_config';

        fs.readFile(fullFilePath, 'utf8', function(err, data) {
            if (err) throw err;
            var item = JSON.parse(data);
            dynamodb.putItem(tableName, item).then(console.log).catch(console.log);
        });
    });


program.parse(process.argv);
