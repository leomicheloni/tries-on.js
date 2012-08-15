var http = require("http");
var RD = require('./lib/requestDispatcher');
var requestDispatcher = RD.requestDispatcher;
var RP = require('./lib/resourceProvider').resourceProvider;

requestDispatcher.addHandler(
	new RD.UrlHandler('/index', function(request, response){
		response.setHeader("Content-Type", "text/html");
		response.write(RP.getResource('index.html'));
		response.end();
	})
);

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	
	requestDispatcher.dispatch(request, response);
 })
.listen(3001);