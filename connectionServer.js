var http = require("http");
var requestDispatcher = require('./lib/requestDispatcher').requestDispatcher;

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	
	requestDispatcher.dispatch(request, response);
 })
.listen(3001);