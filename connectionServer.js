var http = require("http");
var qs = require('querystring');

var RD = require('./lib/requestDispatcher');

var requestDispatcher = RD.requestDispatcher;
var resourceProvider = require('./lib/resourceProvider').resourceProvider;
var game = require('./lib/game').game;
var leaderboard = require('./lib/leaderboard').leaderboard;

requestDispatcher.addHandler(
	new RD.UrlHandler('/index', function(request, response){
		console.log('bien');
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
		console.log('entre a la tabla de puntajes');
		writeStaticAndEnd(response, 'leaderboard.html');
	})
);

requestDispatcher.addHandler(
	new RD.UrlHandler('/leaderboardJSON', function(request, response){
		response.setHeader("Content-Type", "application/json");
		response.write(leaderboard.getPlayers());
		response.end();
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