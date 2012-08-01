var http = require("http");
var url = require("url");

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	var urlClienteRaw = '' + url.parse(request.url, true).query.url;
	var urlCliente = url.parse(urlClienteRaw, true);
	
	var req = http.request({ hostname: urlCliente.hostname, port: urlCliente.port, method: 'GET', path: '/?ok' }, function(res) {
		console.log('se envio el request al cliente ' + urlClienteRaw);
	});
	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});
	req.end();
	
	response.end();
 })
.listen(3001);