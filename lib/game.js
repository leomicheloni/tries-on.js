(function(){
	var http = require('http');
	var url = require('url');
	var playerManager = require('./playerManager').playerManager;
	var notifier = require('./notifier').notifier;

	exports.game = {
		config: { askInterval: 10 * 1000 }, 
		started: false,
		
		addPlayer: function(player) { playerManager.add(player); },
		
		notifyPlayers: function() {
			var players =  playerManager.getAll();
			for(i = 0; i < players.length; i++) {
				this.notifyPlayer(players[i]);
			}
		},
		
		notifyPlayer: function(player) {
			var question = 'LA GRAN PREGUNTA';
			notifier.notify("Le pregunto " + question + " a " + player.name + " en " + player.url);
			this.sendQuestionAndHandleResponse(player, question);
		},
		
		sendQuestionAndHandleResponse: function(player, question) {
			var parsedUrl = url.parse(player.url);
			var that = this;
			
			var req = http.request({ hostname: parsedUrl.hostname, port: parsedUrl.port, method: 'POST' }, function(res) {
				res.setEncoding('utf8');
				var data = '';
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function() {
					that.handleAnswer(player, data);
				});
			});

			req.on('error', function(error) {
				that.handleError(player, error);
			});

			req.write(question);
			req.end();
		},
		
		handleAnswer: function(player, answer) {
			notifier.notify(player.name + ' manejo la pregunta y contesto ' + answer);
			//player.score++;
		},
		
		handleError: function(player, error) {
			notifier.notify(player.name + ' tiro un error, buuu para el');
			//player,score--;
		},
		
		start: function() {
			this.started = true;
			this.runGame();
		},
		
		stop: function() {
			this.started = false;
		},
		
		runGame: function() {
			this.notifyPlayers();
			
			if (this.started) {
				var self = this;
				self.loop = function() { self.runGame(); };
				setTimeout(self.loop, this.config.askInterval);
			}
		}
	};
})();