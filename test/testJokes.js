/**
 * Created by Bente on 08-03-2016.
 */
// In this example I have made an instance of the id of the bson object using _id like it normaly is, and if I had
// not written it my self it would generate one. I could therefor also just have made an id, wich is not the same
// to test on, but I decided not to.

var expect = require("chai").expect;
var jokes = require("../model/jokeFacade");
var connection= require("../db/db");

var newJoke = {
        "_id"   : "3c",
        "joke" : "ad ad ad ",
        "type" : ["short", "joke","blind"],
        "reference": { "author" : "Someone", "link" : ""},
        "lastEdited" : new Date()
        };

var testJokes = [
    {
        "_id": "1a",
        "joke" : "aaaa",
        "type" : ["short", "joke","blind"],
        "reference": { "author" : "Someone", "link" : ""},
        "lastEdited" : new Date()
        },
    {
        "_id": "2b",
        "joke" : "bbbbb",
        "type" : ["short", "joke","riddle"],
        "reference": { "author" : "Unknown", "link" : ""},
            "lastEdited" : new Date()
        }
];

describe("The Jokes Factory", function(){
   before(function(done){                                           // We put in a blocking call, to make sure we dont do anything before we have got a connection.
       connection.connect("mongodb://localhost:27017/test",function(){      // sets up a local variable
           done();
       });
   });

    beforeEach(function(done){
        var db = connection.get();
        db.collection("jokes").deleteMany({},function(err, data){           // deletes what is in the database
            if(err){
                throw new Error(err);
            }
            db.collection("jokes").insertMany(testJokes,function(err, data){    // insert the testarray in the database
                if(err){                                                        // before each test.
                    throw new Error(err);
                }
                done();
            });
        });
    });

    it("should find two jokes", function(done){
        jokes.allJokes(function(err, data){
            expect(data.length).to.be.equal(2);
            done();
        })
    })

    it("Should find one specific joke by id", function (done) {         // tilføjet i 2. test
        jokes.findJoke("1a", function (err, data) {
            expect(data.length).to.be.equal(1);
            done();
        });
    });

    it("Should add a new joke", function(done){
        jokes.addJoke(newJoke);
        jokes.allJokes (function(err, data){
            expect(data.length).to.be.equal(3);
            done();
        });
    });

    var toUpdate = {$set: {"joke": "I'm edited"}, $addToSet: {"type": "replaced"}};
    it("should edit 2", function (done) {
        jokes.editJoke("2b", toUpdate, function (err, data) {
             if (err) {
                 throw new Error(err);
                }
                //This only verifies that data was updated, not that it's updated correctly
             expect(data.modifiedCount).to.be.equal(1);
              done();
        });
    });

    it("Should delete a joke", function(done){
        jokes.deleteJoke("1a");
        jokes.allJokes (function(err, data){
            expect(data.length).to.be.equal(1);
            done();
        });
    });

});