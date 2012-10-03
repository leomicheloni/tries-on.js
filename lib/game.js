(function(){
	var http = require('http');
	var url = require('url');
	var playerManager = require('./playerManager').playerManager;
	var questionManager = require('./question/questionManager').questionManager;
	var notifier = require('./notifier').notifier;

	exports.game = {
		config: { askInterval: 10 * 1000 }, 
		started: false,
		
		addPlayer: function(player) { 
			player.score = 0;
			player.level = 1;
			playerManager.add(player); 
		},
		
		notifyPlayers: function() {
			var players =  playerManager.getAll();
			for(i = 0; i < players.length; i++) {
				this.notifyPlayer(players[i]);
			}
		},
		
		notifyPlayer: function(player) {
			player.question = questionManager.getNext(player.level);
			this.sendQuestionAndHandleResponse(player, player.question);
		},
		
		sendQuestionAndHandleResponse: function(player, question) {
			var parsedUrl = url.parse(player.url);
			var that = this;
			
			notifier.notify("Le pregunto " + player.question.getText() + " a " + player.name + " en " + player.url);
			var req = http.request({ hostname: parsedUrl.hostname, port: parsedUrl.port, method: 'POST' }, function(res) {
				res.setEncoding('utf8');
				var data = '';
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function() {
					that.handleAnswer(player, question, data);
				});
			});

			req.on('error', function(error) {
				that.handleError(player, error);
			});
			
			req.write(question.getText());
			req.end();
		},
		
		handleAnswer: function(player, question, answer) {
			if (question.isAnswerCorrect(answer)) {
				notifier.notify('¡¡ ' + player.name + ' contestó bien "' + answer + '" !!');
				player.score += 10;
				player.level++;
			} else {
				notifier.notify(player.name + ' contestó mal "' + answer + '", la pregunta era ' + question.getText());
				player.score--;
			}
		},
		
		handleError: function(player, error) {
			notifier.notify(player.name + ' no manejó el request');
			player.score--;
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