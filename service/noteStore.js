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
        db.find({$not: {state: 'FINISHED'}}).sort({[sort]: sortOrder}).exec(function (err, notes) {
            callback(err, notes, sort);
        });
    }

    else{
        db.find({}).sort({ [sort]: sortOrder }).exec(function(err, notes) {
            callback(err, notes, sort);
        });
    }
}

function publicSort(parameter, all, callback){
    if(all == true)
    {
        db.find({}).sort(parameter).exec(function (err, docs) {
            callback( err, docs);
        });
    }
    else
    {
        db.find({$not: {state:'FINISHED'}}).sort(parameter).exec(function (err, docs) {
            callback( err, docs);
        });
    }

}

function publicFindNotFinished(callback) {
    db.find({$not: {state:'FINISHED'}} ,function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNote, modify : publicModify, delete : publicRemove, get : publicGet, getNotFinished: publicFindNotFinished, getSorted: publicSort, all : publicAll};