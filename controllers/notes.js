var express = require('express');
var router = express.Router();
var store = require('../service/noteStore');
var noteController = require('../controllers/noteController');

var sortingTemp = '';
var sortOrder = 1;

function setSessionParameters(session, query){
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
        session.style = 'Gray';
    }

    if(session.showFinished == undefined){
        session.showFinished = 'true';
    }
}
// list all notes
router.post('/', function(req, res) {
    console.log("POST /notes");
    setSessionParameters(req.session, req.body);
    noteController.all(req, res);
});

router.get('/', function(req, res) {
    console.log("GET /notes");
    setSessionParameters(req.session, req.query);
    noteController.all(req, res);
});

// new note
router.get('/add', function(req, res) {
    console.log("GET /notes/new");
    res.format({
        'text/html': function(){
            res.render("add" ,{style:req.session.style});
        },
        'application/json': function(){
            res.send({});
        }
    });
});

// create note
router.post('/', function(req, res) {
    console.log("POST /notes");
    store.add(req.body.title, req.body.description, req.body.importance,req.body.dueDate,req.body.finished, "unkown", function(err, note) {
        res.redirect("/");
    });
});

// edit note
router.get('/:id', function(req, res) {
    console.log("GET /notes/:id");
    store.get(req.params.id, function(err, note) {
        res.format({
            'text/html': function(){
                res.render("edit", {note:note, style:req.session.style});
            },
            'application/json': function(){
                res.json(note);
            }
        });
    });
});

// write edited note
router.post('/:id', function(req, res) {
    console.log("PUT /notes/:id");
    if(req.body.finished != undefined)
        req.body.state = 'FINISHED';
    store.modify(req.params.id, req.body.title, req.body.description, req.body.importance,req.body.state,req.body.dueDate, function(err, note) {
        res.redirect("/");
    });

});

router.get('/delete/:id', function(req, res) {
    console.log("DELETE /notes/delete/:id");
    store.get(req.params.id, function(err, note) {
        res.format({
            'text/html': function(){
                res.render("delete", {note:note, blocking:'true', style:req.session.style});
            },
            'application/json': function(){
                res.json(note);
            }
        });
    });
});

router.post('/delete/:id', function(req, res) {
    console.log("POST /notes/delete/:id");
    store.delete(req.params.id, function(err,note){
        noteController.all(req, res);
    });
});

module.exports = router;