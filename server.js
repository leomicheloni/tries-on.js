var http = require("http");
var url = require("url");
var querystring = require("querystring");

var players = [];

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	var action = url.parse(request.url, true).path.replace('/', '');
	
	if (request.method == "POST" && action == 'jugador') {
		request.on("data", function(data){
			var query = querystring.parse(data);
			var nombre = query.nombre;
			var direccion = query.url;
			// TODO agregar player a la lista
			
			response.write(
				'<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /></head><body>' +
				'¡Enhorabuena ' + nombre + '!<br />'+
				'Tu url es: ' + direccion + '</body></html>');
			response.end();
		});
	}
	
	/*
	var urlClienteRaw = '' + url.parse(request.url, true).query.url;
	var urlCliente = url.parse(urlClienteRaw, true);
	
	var req = http.request({ hostname: urlCliente.hostname, port: urlCliente.port, method: 'GET', path: '/?ok' }, function(res) {
		console.log('se envio el request al cliente ' + urlClienteRaw);
	});
	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});
	req.end();
	*/
 })
.listen(3002);