var http = require("http");
var qs = require('querystring');
var url = require('url');

var RD = require('./lib/requestDispatcher');

var requestDispatcher = RD.requestDispatcher;
var resourceProvider = require('./lib/resourceProvider').resourceProvider;
var game = require('./lib/game').game;
var leaderboard = require('./lib/leaderboard').leaderboard;

requestDispatcher.addHandler(
	new RD.UrlHandler('/index', function(request, response){
		writeStaticAndEnd(response, 'index.html');
	})
);

requestDispatcher.addHandler(
	new RD.UrlHandler('/add', function(request, response){
		if (request.method != 'POST') {
			writeStaticAndEnd(response, '404.html');
			return;
		}
		
		var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
			
			console.dir({ name: post.nombre,  url: post.url });
			game.addPlayer({ name: post.nombre,  url: post.url });
			
			writeStaticAndEnd(response, 'agregado.html');
        });
	})
);

requestDispatcher.addHandler(
	new RD.UrlHandler('/leaderboard', function(request, response){
		writeStaticAndEnd(response, 'leaderboard.html');
	})
);

requestDispatcher.addHandler(
	new RD.UrlHandler('/JSONLeaderboard', function(request, response){
		response.setHeader("Content-Type", "application/json");
		response.write(JSON.stringify(leaderboard.getPlayers()));
		response.end();
	})
);

requestDispatcher.addHandler(
	new RD.UrlHandler('/static/.*', function(request, response){
		var staticResourceName = url.parse(request.url).path.replace('/static/', '');
		writeStaticAndEnd(response, staticResourceName);
	})
);

http.createServer(function (request, response) {
	requestDispatcher.dispatch(request, response);
 })
.listen(3001);

game.start();

function writeStaticAndEnd(response, resource) {
	response.setHeader("Content-Type", "text/html");
	response.write(resourceProvider.getResource(resource));
	response.end();
}