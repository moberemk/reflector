var express = require('express'),
    router = express.Router(),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies

app.all('/', function (req, res) {
    var formatted = {
        route: req.route,
        params: req.params,
        headers: req.headers,
        body: req.body,
    };
    res.json(formatted);
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});