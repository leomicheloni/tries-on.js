(function(){
	var playerManager = require('./playerManager').playerManager;
	
	exports.leaderboard = {
		getPlayers: function() { 
			return  playerManager.getAllOrdered();
		}
	}
})();