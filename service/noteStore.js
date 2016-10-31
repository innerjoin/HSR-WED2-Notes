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

function publicAddNote(title, description, importance, dueDate, finished, orderedBy, callback )
{
    var note = new Note(title, description, importance, dueDate, orderedBy);
    if(finished == 'true')
        note.state = 'FINISHED';
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

function publicAll(sort, sortOrder,show, callback) {
    if(show === 'false') {
        db.find({$not: {$or: [{state: 'FINISHED'}, {state:'DELETED'}]}}).sort({[sort]: sortOrder}).exec(function (err, notes) {
            callback(err, notes);
        });
    }

    else{
        db.find({$not: {state:'DELETED'}}).sort({ [sort]: sortOrder }).exec(function(err, notes) {
            callback(err, notes);
        });
    }
}
module.exports = {add : publicAddNote, modify : publicModify, delete : publicRemove, get : publicGet,  all : publicAll};