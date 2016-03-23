/**
 * Created by Bente on 08-03-2016.
 */

var jokes = require("./model/jokeFacade");
var connection = require("./db/db");

connection.connect("mongodb://localhost:27017/test",function(){
    jokes.allJokes(function(err,data){
       if(err){
           console.log("Upps, you made a mistake!");
       }else{
           console.log(data);
       }
    });
})


