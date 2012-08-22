(function(){
	var playerManager = require('./playerManager').playerManager;
	var notifier = require('./notifier').notifier;

	exports.game = {
		config: { askInterval: 10 * 1000 }, 
		started: false,
		
		addPlayer: function(player) { playerManager.add(player); },
		
		notifyPlayers: function() { console.log("Acá notifico a los players"); },
		
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