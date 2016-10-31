var Datastore = require('nedb');
var db = new Datastore({ filename: './data/config.db', autoload: true });

function publicGetAllConfigs(callback) {
    db.find({}, function (err, configurations) {
        callback( err, configurations);
    });
}

function publicGetConfig(configurations, callback) {
    db.find({ configurations }, function (err, configuration) {
        callback(err, configuration);
    });
}

function publicSetConfig(type, value, params, callback) {
    db.update({type: type}, {$set: {'value':value, 'params':params}}, {}, function (err) {
        callback();
    });
}

module.exports = {get: publicGetConfig, getAll: publicGetAllConfigs, set: publicSetConfig};