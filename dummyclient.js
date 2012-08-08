var http = require("http");
var url = require("url");

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	
	console.log(request.query);
	
	response.write("31");
	response.end();
 })
.listen(3000);
