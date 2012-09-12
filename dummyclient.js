var http = require("http");
var url = require("url");

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	
	var body = '';
	request.on('data', function (data) { body += data; });
	request.on('end', function () { console.log(body); });
	
	response.write("10");
	response.end();
 })
.listen(3002);