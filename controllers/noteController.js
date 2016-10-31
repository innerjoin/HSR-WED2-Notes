var store = require('../service/noteStore');

function publicGetAll(req, res, config){
    var sorting;
    var show;
    var style;
    config.forEach(function(conf, index) {
        if(conf.type == 'sorting'){
            sorting = conf;
        }

        if(conf.type == 'show'){
            show = conf.value;
        }

        if(conf.type == 'style'){
            style = conf.value;
        }
    });
    store.all(sorting.value, sorting.params.sortOrder, show, function(err, data, sortBy) {
        res.format({
            'text/html': function(){
                res.render("notes", {notes: data, sortBy:sortBy, showFinished:show, sortOrder: sorting.params.sortOrder, style:style.value});
            },
            'application/json': function(){
                res.send({});
            }
        });
    });
}

module.exports  = {all: publicGetAll};