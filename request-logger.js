var fs = require('fs');

function LogRequest(req) {
	var formatted = {
        route: req.route,
        params: req.params,
        headers: req.headers,
        body: req.body,
    };

    var filename =  '[' + (new Date()).toISOString() + '] ' + req.method + '.json';
    fs.writeFile('logs/' + filename, JSON.stringify(formatted));
}

module.exports = LogRequest;