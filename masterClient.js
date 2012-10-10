var http = require("http");
var url = require("url");

http.createServer(function (request, response) {
	request.setEncoding("utf-8");
	
	var body = '';
	request.on('data', function (data) { body += data; });
	request.on('end', function () { 
		var question = body.replace('question=', '');
		handleQuestion(question, response);
	});
	
 })
.listen(3002);

var handlers = [];
handleQuestion = function(question, response) {
	console.log(question);
	
	handlers.forEach(function(handler){
		if (handler.canHandle(question)) {
			response.write(handler.getAnswer(question));
			response.end();
			return;
		}
	});
	
	response.end();
};

handlers[handlers.length] = { // suma simple
	canHandle: function(question) { return /¿Cuánto es \d+ más \d+ ?/.test(question); },
	getAnswer: function(question) {
		var splitted = question.split(' ');
		var result = parseInt(splitted[2]) + parseInt(splitted[4]);
		return "" + result;
	}
};

handlers[handlers.length] = { // metros a pulgadas
	canHandle: function(question) { return /¿Cuántas pulgadas son \d+.\d+ metros?/.test(question); },
	getAnswer: function(question) {
		var splitted = question.split(' ');
		var result = parseFloat(splitted[3]) * 39.3700;
		return "" + result;
	}
};

handlers[handlers.length] = { // la palabra mágica
	canHandle: function(question) { return /¿Cuál es la http:\/\/...\/palabramagica?/.test(question); },
	getAnswer: function(question) { return 'abracadabra'; }
};

handlers[handlers.length] = { // la palabra mágica
	canHandle: function(question) { return /Enumere al menos 3 tipos de frutos secos/.test(question); },
	getAnswer: function(question) { return 'Almendras, Anacardos, Avellanas'; }
};

handlers[handlers.length] = { // default
	canHandle: function(question) { return true; },
	getAnswer: function(question) { return "default"; }
};