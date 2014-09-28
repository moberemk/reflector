var express = require('express'),
    router = express.Router(),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID
    bodyParser = require('body-parser'),
    logger = require('./request-logger'),
    connection_string = undefined, // Fill in your MongoDB connection string here
    db;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies

app.all('/', function (req, res) {
    var formatted = {
        route: req.route,
        params: req.params,
        headers: req.headers,
        body: req.body,
    };
    logger(req);

    // Save the request to the database
    db.collection('requests').insert([formatted]);

    res.json(formatted);
});

MongoClient.connect(connection_string, { native_parser:true }, function(err, result) {
    if(err) throw err;

    db = result;
    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    });
});
