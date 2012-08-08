var http = require("http");
var notifier = require('./lib/notifier').notifier;
var requestDispatcher = require('./lib/requestDispatcher').requestDispatcher;

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	
	notifier.notify(request.url);
	requestDispatcher.dispatch(request);
	
	//notifier.report();
	
	
	/*
	var req = http.request({ hostname: urlCliente.hostname, port: urlCliente.port, method: 'GET', path: '/?ok' }, function(res) {
		console.log('se envio el request al cliente ' + urlClienteRaw);
	});
	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});
	req.end();
	*/
	response.end();
 })
.listen(3001);