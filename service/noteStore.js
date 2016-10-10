var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(title, description, importance, dueDate,orderedBy )
{
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.createdDate = JSON.stringify(new Date());
    this.dueDate = dueDate;
    this.orderedBy = orderedBy;
    this.state = "NEW";
}


function publicAddNote(title, description, importance, dueDate, orderedBy, callback )
{
    var note = new Note(title, description, importance, dueDate, orderedBy);
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {}, function (err, doc) {
        publicGet(id,callback);
    });
}

function publicModify(id, title, description, importance, state, dueDate, callback) {
    db.update({_id: id}, {$set: {"state": state, "title":title, "description":description, "importance":importance, "dueDate":dueDate}}, {}, function (err, doc) {
        publicGet(id,callback);
    });
}

function publicGet(id, callback)
{   db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(callback)
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNote, modify : publicModify, delete : publicRemove, get : publicGet, all : publicAll};