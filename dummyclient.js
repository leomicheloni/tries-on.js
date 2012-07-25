var http = require("http");
var url = require("url");

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	var question = request.query.q.substr(10);
	
	console.log(question);
	
	response.write("31");
	response.end();
 })
.listen(3000);
