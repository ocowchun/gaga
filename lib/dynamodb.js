var _ = require('underscore');
var AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-northeast-1'
});
var dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10'
});


function pull(tableName) {
    var params = {
        TableName: '',
        Key: {
            id: {
                S: '3345678'
            }
        }
    };
    params.TableName = tableName;
    return new Promise(function(resolve, reject) {
        dynamodb.getItem(params, function(err, data) {
            if (err) reject(err, err.stack); // an error occurred
            else {
                var item = data.Item;
                var keys = _.keys(item);
                var result = _.reduce(keys, function(memo, key) {
                    memo[key] = item[key]['S'];
                    return memo;
                }, {});

                resolve(result); // successful response
            }
        });
    });
}

module.exports.pull = pull;
