var express = require('express')
var router = express.Router();

// list all notes
router.get('/', function(req, res) {
    console.log("/notes");
    res.end();
});

// new note
router.get('/new', function(req, res) {
    console.log("GET /notes/new");
    res.end();
});

// create note
router.post('/', function(req, res) {
    console.log("POST /notes");
    res.end();
});

// edit note
router.get('/:id', function(req, res) {
    console.log("GET /notes/:id");
    res.end();
});

// write edited note
router.put('/:id', function(req, res) {
    console.log("PUT /notes/:id");
    res.end();
});

module.exports = router