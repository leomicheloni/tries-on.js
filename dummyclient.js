var http = require("http");
var url = require("url");

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	
	console.log(request.query);
	
	response.write("OK");
	response.end();
 })
.listen(3002);
