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
	new RD.UrlHandler('/pause', function(request, response){
		game.pause();
		console.log('Cambio de estado: ' + game.status);
		writeTextAndEnd(response, game.status);
	})
);
requestDispatcher.addHandler(
	new RD.UrlHandler('/start', function(request, response){
		game.start();
		console.log('Cambio de estado: ' + game.status);
		writeTextAndEnd(response, game.status);
	})
);
requestDispatcher.addHandler(
	new RD.UrlHandler('/stop', function(request, response){
		game.stop();
		console.log('Cambio de estado: ' + game.status);
		writeTextAndEnd(response, game.status);
	})
);

requestDispatcher.addHandler(
	new RD.UrlHandler('/leaderboard', function(request, response){
		writeStaticAndEnd(response, 'leaderboard.html');
	})
);
requestDispatcher.addHandler(
	new RD.UrlHandler('/JSONLeaderboard', function(request, response){
		writeTextAndEnd(response, JSON.stringify(leaderboard.getPlayers()));
	})
);

requestDispatcher.addHandler(
	new RD.UrlHandler('/palabramagica', function(request, response){
		writeTextAndEnd(response, 'La palabra magica es abracadabra.')
	})
);

requestDispatcher.addHandler(
	new RD.UrlHandler('/static/.*', function(request, response){
		var staticResourceName = url.parse(request.url).path.replace('/static/', '');
		writeStaticAndEnd(response, staticResourceName);
	})
);

http.createServer(function (request, response) {
	request.setEncoding('utf8');
	requestDispatcher.dispatch(request, response);
 })
.listen(3001);

game.level = require('./levels').levels.warmup;

function writeStaticAndEnd(response, resource) {
	response.setHeader("Content-Type", "text/html; charset=utf8");
	response.write(resourceProvider.getResource(resource));
	response.end();
}
function writeTextAndEnd(response, text) {
	response.setHeader("Content-Type", "text/html; charset=utf8");
	response.write(text);
	response.end();
}