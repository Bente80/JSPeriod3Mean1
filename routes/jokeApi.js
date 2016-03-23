/**
 * Created by Bente on 11-03-2016.
 */

var express = require('express');
var jokes = require('../model/jokeFacade');
var router = express.Router();

router.get("/jokes",function(req,res, next){
    jokes.allJokes(function(err,data){
        if(err){
            throw new Error(err);
        }else{
            res.json({jokes: data});
        }
    })
});

router.get("/joke/random",function(req,res, next){
    jokes.allJokes(function(err,data){
        if(err){
            throw new Error(err);
        }else{
            // Here i get all the jokes, but only returns one joke in the end. This is done by making a random number.
            // Not the most efficiant, but it works.
            var randomNumber = Math.floor(Math.random() * data.length);
            res.json({randomJoke : data[randomNumber]});
        }
    })
});

router.get('/findjoke/:id',function(req,res, next){                 // find a Joke pr. ID
    jokes.findJoke(req.params.id, function(err,data){
        if(err){
            throw new Error(err);
        }
        res.json({joke: data[0]})
    })
});

router.post("/addJoke/",function(req,res, next){                    // make a new Joke
    var newjoke = req.body;
    newjoke.lastEdited = new Date();
    jokes.addJoke(newjoke);
    res.json({joke: newjoke});
});

router.put("/editJoke/:id", function(req, res, next){               // edit a Joke
    jokes.editJoke(req.params.id, req.body, function(err,data){
        if(err){
            throw new Error(err);
        }
        res.json({editedJoke: data})
    })
});

router.delete("/deleteJoke/:id", function(req, res, next){
    jokes.deleteJoke(req.params.id, function(err,data){
        if(err){
            throw new Error(err);
        }
        res.json({deletedJoke: data})
    })
});

module.exports = router;


