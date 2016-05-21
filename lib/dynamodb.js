var _ = require('underscore');
var AWS = require('aws-sdk');
var marshaler = require('dynamodb-marshaler');

AWS.config.update({
    region: 'ap-northeast-1'
});
var dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10'
});


function getItem(tableName, id) {
    var params = {
        TableName: '',
        Key: {
            id: {
                S: ''
            }
        }
    };
    params.TableName = tableName;
    params.Key.id.S = id;

    return new Promise(function(resolve, reject) {
        dynamodb.getItem(params, function(err, data) {
            if (err) reject(err, err.stack); // an error occurred
            else {
                var item = data.Item;
                var result = marshaler.unmarshalItem(item);

                resolve(result); // successful response
            }
        });
    });
}


function putItem(tableName, item) {
    var params = {};
    params.TableName = tableName;
    item.id = 'current';
    params.Item = marshaler.marshalItem(item);

    return new Promise(function(resolve, reject) {
        dynamodb.putItem(params, function(err, data) {
            if (err) reject(err, err.stack); // an error occurred
            else {
                resolve(data); // successful response
            }
        });
    });
}


module.exports.getItem = getItem;
module.exports.putItem = putItem;
