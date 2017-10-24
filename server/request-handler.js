/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var qs = require('qs');
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


var results = [];

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var headers = defaultCorsHeaders;


  if (request.method === 'POST' && request.url === '/classes/messages') {

    headers['Content-Type'] = 'text/plain';
    var body = '';
    response.writeHead(201, headers);
    request.on('data', function(chunk) {
      body += chunk;
    });
    request.on('end', function() {
      //TODO add to results && end response
      results.push(qs.parse(body));
      response.end(JSON.stringify({results}));
    });
  } else if (request.method === 'GET' && request.url === '/classes/messages') {
    headers['Content-Type'] = 'application/JSON';
    response.writeHead(200, headers);
    console.log('sending results', results)
    response.end(JSON.stringify({results}));
  } else if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);
    response.end();
  } else {
    headers['Content-Type'] = 'text/plain';
    response.writeHead(404, headers);
    response.end('404');
  } 
};



exports.requestHandler = requestHandler;