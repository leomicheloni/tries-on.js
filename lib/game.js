(function(){
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
			console.log("url del player " + player.name + ": " + player.url );
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