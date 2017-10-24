/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
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
      console.log(' this is the chunk we push to results ~~~~~~~~~~~: ', chunk);
      body += chunk;
    });
    request.on('end', function() {
      //TODO add to results && end response
      results.push(JSON.parse(body));
      response.end(JSON.stringify({results}));
      console.log('this is the completed message: ', body);
    });
  } else if (request.method === 'GET' && request.url === '/classes/messages') {
    headers['Content-Type'] = 'application/JSON';
    response.writeHead(200, headers);
    request.on('end', function() {
      //TODO add to results && end response

      response.end(JSON.stringify({results}));
      console.log('this is the completed message: ', body);
    });
  } else {
    headers['Content-Type'] = 'text/plain';
    response.writeHead(404, headers)
    response.end('404 Error');
  }



  return results;
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


exports.requestHandler = requestHandler;