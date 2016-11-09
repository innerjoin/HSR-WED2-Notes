var util = require('util');
var express = require('express');
var router = express.Router();
var store = require('../service/noteStore');
var noteController = require('../controllers/noteController');

expressValidator = require('express-validator')

// list all notes
router.post('/', function(req, res) {
    noteController.setSessionParameters(req.session, req.body);
    noteController.all(req, res);
});

router.get('/', function(req, res) {
    console.log("GET /notes");
    noteController.setSessionParameters(req.session, req.body);
    noteController.all(req, res);
});

// new note
router.get('/add', function(req, res) {
    console.log("GET /notes/new");
    res.format({
        'text/html': function(){
            var date = JSON.stringify(new Date());
            res.render("add" ,{style:req.session.style, actualDate:date.substring(1, 11)});
        },
        'application/json': function(){
            res.send({});
        }
    });
});

// create note
router.post('/add', function(req, res) {
    console.log("POST /notes create");
    var tempNote = {title: req.body.title, desc: req.body.description, dueDate: req.body.dueDate, importance: req.body.importance};

    req.sanitize('title').trim();
    req.checkBody('title', 'Title cannot be empty').notEmpty().withMessage('Titel is required');
    req.checkBody("dueDate", "Enter valid due date").isValidDate();
    req.checkBody("importance", "Enter valid importance").isInt().isInRange(1,5);

    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        var date = JSON.stringify(new Date());
        res.render("add", {style:req.session.style, note: tempNote, errors:errors,actualDate:date.substring(1, 11)});
    }
    else {
        store.add(req.body.title, req.body.description, req.body.importance,req.body.dueDate,req.body.finished, "unkown", function(err, note) {
            res.redirect("/");
        });
    }
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
        res.redirect("/");
    });
});

module.exports = router;