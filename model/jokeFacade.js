/**
 * Created by Bente on 08-03-2016.
 */

var connect = require("../db/db")

function _allJokes(callback){
    var db = connect.get();
    db.collection("jokes").find({}).toArray(function(err,data){     // This is our seach thing
        if(err){
            callback(err);
        }else{
         callback(null,data);
        }
    });
}

function _findJoke(id,callback){
    var db = connect.get();
    db.collection("jokes").find({"_id" : id}).toArray (function(err,data){     // This is our seach thing
        if(err){
            callback(err);
        }else{
            callback(null,data);
        }
    });
}

function _addJoke(theJoke,callback){
    var db = connect.get();
    db.collection("jokes").insertOne(theJoke,function(err,data){
        if(err){
            callback(err);
        }
        else{
            callback(null,'This Joke was succesfully added'+data);
        }
    });
}

function _editJoke(id, toUpdate,callback){
    var db = connect.get();
    db.collection("jokes").updateOne({"_id": id},toUpdate,function(err,data){
        if(err){
            callback(err);
        }
        else{
            callback(null,'The Joke was succesfully edited'+data);
        }
    });
}

function _deleteJoke(id,callback){
    var db = connect.get();
    db.collection("jokes").deleteOne({"_id": id}, function(err,data){
        if(err){
            callback(err);
        }
        else{
            callback(null,'Joke was succesfully deleted'+data);
        }
    });
}

exports.allJokes = _allJokes;
exports.findJoke = _findJoke;
exports.addJoke = _addJoke;
exports.editJoke = _editJoke;
exports.deleteJoke = _deleteJoke;

