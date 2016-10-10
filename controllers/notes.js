var express = require('express');
var router = express.Router();
var store = require('../service/noteStore');

// list all notes
router.get('/', function(req, res) {
    console.log("/notes");
    store.all(function(err, data) {
        console.log(err, data);
        res.format({
            'text/html': function(){
                res.render("notes", {notes: data});
            },
            'application/json': function(){
                res.send({});
            }
        });
    });
});

// new note
router.get('/add', function(req, res) {
    console.log("GET /notes/new");
    res.format({
        'text/html': function(){
            res.render("add");
        },
        'application/json': function(){
            res.send();
        }
    });
});

// create note
router.post('/', function(req, res) {
    console.log("POST /notes");
    store.add(req.body.title, req.body.description, req.body.importance,req.body.finishedUnitl, "unkown", function(err, note) {
        console.log("POST /notes");
        res.end();
    });
});

// edit note
router.get('/:id', function(req, res) {
    console.log("GET /notes/:id");

    store.get(req.params.id, function(err, note) {
        res.format({
            'text/html': function(){
                res.render("edit");
            },
            'application/json': function(){
                res.json(note);
            }
        });
    });
});

// write edited note
router.put('/:id', function(req, res) {
    console.log("PUT /notes/:id");
    store.modify(req.params.id, req.body.title, req.body.description, req.body.importance,req.body.state,req.body.finishedUnitl, function(err, note) {
        res.end();
    });
});

module.exports = router;