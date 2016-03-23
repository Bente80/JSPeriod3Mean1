/**
 * Created by Bente on 08-03-2016.
 */

var MongoClient = require('mongodb').MongoClient
var connection;
var connect = function(url, done) {
    if (connection)
        return done()

    MongoClient.connect(url, function(err, db) {
        if (err){
            return done(err);
        }
        connection = db;
        console.log("DB connection ready");
        done();
    })
}

var get = function() {
    return connection;
}

var close = function(done) {
    if (connection) {
        connection.close(function(err, result) {
            connection= null;
            done(err)
        })
    }
}
module.exports.connect = connect;
module.exports.get = get;
module.exports.close = close;
