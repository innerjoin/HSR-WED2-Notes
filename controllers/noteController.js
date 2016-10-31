var store = require('../service/noteStore');

function publicGetAll(req, res){
    store.all(req.session.sorting, req.session.sortOrder, req.session.showFinished, function(err, data) {
        res.format({
            'text/html': function(){
                res.render("notes", {notes: data, sortBy:req.session.sorting, showFinished:req.session.showFinished, sortOrder: req.session.sortOrder, style:req.session.style});
            },
            'application/json': function(){
                res.send({});
            }
        });
    });
}

module.exports  = {all: publicGetAll};