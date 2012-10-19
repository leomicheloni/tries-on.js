(function(){
	var http = require('http');
	var url = require('url');
	var playerManager = require('./playerManager').playerManager;
	var Player = require('./player').Player;
	var questionManager = require('./question/questionManager').questionManager;
	var notifier = require('./notifier').notifier;

	exports.game = {
		level: { interval: 10, rightAnswer: 10, wrongAnswer: -1, error: -1 }, 
		status: 'En pausa', // En pausa, Corriendo
		
		addPlayer: function(playerData) {
			playerManager.add(new Player(playerData.name, playerData.url)); 
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
			
			req.setHeader('Content-type', 'application/x-www-form-urlencoded');

			req.on('error', function(error) {
				that.handleError(player, error);
			});
			
			req.write('question=' + question.getText());
			req.end();
		},
		
		handleAnswer: function(player, question, answer) {
			if (answer.toLocaleLowerCase() == 'paso') {
				notifier.notify(player.name + ' pasó la pregunta ' + question.getText());
				player.addScore(this.level.wrongAnswer);
				player.nexLevel();
				return;
			}
		
			if (question.isAnswerCorrect(answer)) {
				notifier.notify('¡¡ ' + player.name + ' contestó bien "' + answer + '" !!');
				player.addScore(this.level.rightAnswer);
				player.nexLevel();
				player.lastOkQuestion = question.getText();
			} else {
				notifier.notify(player.name + ' contestó mal "' + answer + '", la pregunta era ' + question.getText());
				player.addScore(this.level.wrongAnswer);
			}
		},
		
		handleError: function(player, error) {
			notifier.notify(player.name + ' no manejó el request');
			player.addScore(this.level.error);
		},
		
		start: function() {
			this.status = 'Corriendo';
			this.runGame();
		},
		
		pause: function() {
			this.status = 'En pausa';
		},
		
		isRunning: function() {
			return this.status == 'Corriendo';
		},
		
		runGame: function() {
			this.notifyPlayers();
			
			if (this.isRunning()) {
				var self = this;
				self.loop = function() { self.runGame(); };
				setTimeout(self.loop, this.level.interval * 1000);
			}
		}
	};
})();