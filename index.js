var express = require('express'),
    router = express.Router(),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server).
    BodyParser = require('body-parser'),
    // Database stuff
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID
    logger = require('./request-logger'),
    SocketLogger = require('./socket-logger'),
    connection_string = undefined; // Fill in your MongoDB connection string here

app.use(BodyParser.json());       // to support JSON-encoded bodies
app.use(BodyParser.urlencoded()); // to support URL-encoded bodies

app.all('/', function (req, res) {
    var formatted = {
        route: req.route,
        params: req.params,
        headers: req.headers,
        body: req.body,
    };
    logger(req);

    // Save the request to the database
    // db.collection('requests').insert([formatted]);
    logger(formatted);
    res.json(formatted);
});

app.listen(3000, function() {
    console.log('Listening on port %d', this.address().port);
});

io.on('connection', function(socket) {
    console.log('Socket connection started');

    var socket_logger = new SocketLogger();

    socket.on('message', function(message) {
        socket_logger.message(message);
        socket.emit(message);
    });
    socket.on('disconnect', socket_logger.close);
});