var express = require('express')
var router = express.Router();

// list all notes
router.get('/', function(req, res) {
    console.log("/notes");
    var notes = [
        {id: 1, title: "title", description: "this isch ä deskribschen", importance: 3, dueDate: "2016-09-25", finished: false},
        {id: 2, title: "other title", description: "this isch änöddr deskribschen", importance: 5, dueDate: "2016-10-18", finished: true}
    ];
    res.render("notes", {notes: notes});
});

// new note
router.get('/add', function(req, res) {
    console.log("GET /notes/new");
    res.render("add");
});

// create note
router.post('/', function(req, res) {
    console.log("POST /notes");
    res.end();
});

// edit note
router.get('/:id', function(req, res) {
    console.log("GET /notes/:id");
    res.render("edit");
});

// write edited note
router.put('/:id', function(req, res) {
    console.log("PUT /notes/:id");
    res.end();
});

module.exports = router