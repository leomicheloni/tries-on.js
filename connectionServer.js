var http = require("http");
var RD = require('./lib/requestDispatcher');
var requestDispatcher = RD.requestDispatcher;

requestDispatcher.addHandler(
	new RD.UrlHandler('/test/.*', function(request, response){
		response.write('test');
		response.end();
	})
);

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	
	requestDispatcher.dispatch(request, response);
 })
.listen(3001);