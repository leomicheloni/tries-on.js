var url = require("url");

var requestDispatcher = {
	dispatch: function(request) {
		var path = url.parse(request.url, false, true).path;
		// TODO despachar según el path
	},
}

exports.requestDispatcher = requestDispatcher;