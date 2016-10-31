var configStore = require("../service/configStore");

function loadConfigurations(req, res, callback) {
    configStore.getAll(function(err, config) {
        callback(req, res, config);
    });
}

function hasConfigurationChanges(hasPendingChanges, configuration, query) {
    return hasPendingChanges || (!!query.sorting && query.sorting !== configuration[0].value) || configuration[0] === undefined || configuration[1] === undefined || configuration[2] === undefined;
}

function publicUpdateConfigs(req, res, query, callback) {
    loadConfigurations(req, res, function (req, res, config) {
        var sorting = !!query.sorting ? query.sorting : 'dueDate';
        var order = 1;
        var showFinished = !!query.showFinished ? query.showFinished : 'true';
        var style = !!query.style ? query.style : 'Red';
        var hasPendingChanges = false;

        //changes sort order if actual config is the same as specified in query string
        if (!!config[0].type && !!query.sorting && config[0].value === query.sorting) {
            order = config[0].params.sortOrder == 1 ? -1 : 1;
            hasPendingChanges = true;
        }
        if (!!config[1].type && !!query.style) {
            style = config[1].value == 'Red' ? 'Dark' : 'Red';
            hasPendingChanges = true;
        }
        if (!!config[2].type && !!query.showFinished) {
            show = config[2].value == 'true' ? 'false' : 'true';
            hasPendingChanges = true;
        }
        if (hasConfigurationChanges(hasPendingChanges, config, query)) {
            configStore.set('sorting', sorting, {sortOrder: order}, function() {
                configStore.set('style', style, {}, function() {
                    configStore.set('show', showFinished, {}, function() {
                        loadConfigurations(req, res, callback);
                    });
                });
            });
        } else {
            callback(req, res, config);
        }
    });
};

function publicGetStyleConfig(callback) {
    configStore.get({'type':'style'}, function(err, config) {
        callback(config);
    });
};

function publicGetSortingConfig(callback) {
    configStore.get({'type':'sorting'}, function(err, config) {
        callback(config);
    });
};

function publicGetShowFinishedConfig(callback) {
    configStore.get({'type':'show'}, function(err, config) {
        callback(config);
    });
};

module.exports = {getStyleConfig : publicGetStyleConfig,getShowFinishedConfig : publicGetShowFinishedConfig, getSortingConfig : publicGetSortingConfig, updateConfigurations : publicUpdateConfigs};