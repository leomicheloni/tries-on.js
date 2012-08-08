var url = require("url");
var notifier = require('./notifier').notifier;

var helpers = {
	getFirstPart: function(pathname) {
		var firstPart = pathname.substr(1);
		var lastBarra = firstPart.indexOf('/');
		if (lastBarra != -1) {
			firstPart = firstPart.substr(0, lastBarra);
		}
		
		return firstPart;
	}
}

var requestDispatcher = {
	dispatch: function(request, response) {
		notifier.notify(request.url);
		
		var path = url.parse(request.url, false, true).path;
		var action = helpers.getFirstPart(path);
		
		switch (action) {
			case 'log':
				this.mostrarLog(request, response);
				break;
			default:
				notifier.notify('No se manejar: ' + action);
		}
	},
	
	mostrarLog: function(request, response) {
		response.write('' + notifier.getLog());
		response.end();
	}
}

exports.requestDispatcher = requestDispatcher;