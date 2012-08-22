var url = require("url");
var notifier = require('./notifier').notifier;

var helpers = {
	getFirstPart: function(pathname) {
		var firstPart = pathname;
		var lastBarra = firstPart.indexOf('/');
		if (lastBarra != -1) {
			firstPart = firstPart.substr(0, lastBarra);
		}
		
		return firstPart;
	}
}

function UrlHandler(path, handler) {
	this.path = path;
	
	this.handle = handler;
	this.canHandle = function(path) { 
		return new RegExp(this.path).test(path);
	};
}

var requestDispatcher = {
	handlers: [],
	ignoredPaths: ['/favicon.ico'],
	
	// Le pasa el request al primer handler que pueda manejarlo.
	dispatch: function(request, response) {
		notifier.notify(request.url);
		
		var path = url.parse(request.url, false, true).path;
		var action = helpers.getFirstPart(path);
		
		if (this.mustIgnoreUrl(path)){
			response.end();
			return;
		}
		
		for (var i = 0; i < this.handlers.length; i++) {
			var handler = this.handlers[i];
			
			if (handler.canHandle(path)) {
				handler.handle(request, response);
				wasHandled = true;
				return;
			}
		}
		
		console.log("No se manejar " + path);
		response.end();
	},
	
	mustIgnoreUrl: function(path) {
		for (var i = 0; i < this.ignoredPaths.length; i++) {
			if (new RegExp(this.ignoredPaths[i]).test(path)) {
				return true;
			}
		}
		
		return false;
	},
	
	addHandler: function(handler) { this.handlers.push(handler); },
}

requestDispatcher.addHandler(
	new UrlHandler('/log', function(request, response){
		response.write('' + notifier.getLog());
		response.end();
	})
);

exports.requestDispatcher = requestDispatcher;
exports.UrlHandler = UrlHandler;