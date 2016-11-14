var util = require('util');
expressValidator = require('express-validator');
var store = require('../service/noteStore');

function publicSetSessionParameters(session, query){
    if(query.sorting){
        session.sortOrder = session.sorting == query.sorting ? session.sortOrder * -1 : 1;
        session.sorting = query.sorting;
    }
    if(query.showFinished){
        session.showFinished = query.showFinished;
    }
    if(query.style){
        session.style = query.style;
    }

    if(session.sorting == undefined){
        session.sorting = 'dueDate';
        session.sortOrder = 1;
    }

    if(session.style == undefined){
        session.style = 'Red';
    }

    if(session.showFinished == undefined){
        session.showFinished = 'true';
    }
}

function publicValidateRequest(req){
    req.sanitize('title').trim();
    req.checkBody('title', 'Title cannot be empty').notEmpty().withMessage('Titel is required');
    req.checkBody("dueDate", "Enter a date bigger than today with format YYYY-MM-DD").isValidDate();
    req.checkBody("importance", "Enter valid importance").isInt().isInRange(0,4);
    return req.validationErrors();
}

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

module.exports  = {all: publicGetAll, setSessionParameters: publicSetSessionParameters, validate: publicValidateRequest};