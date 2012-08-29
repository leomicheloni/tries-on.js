(function(){
	var playerManager = require('./playerManager').playerManager;
	
	exports.leaderboard = {
		getPlayers: function() { 
			var players =  playerManager.getAll();
			for(i = 0; i < players.length; i++) {					
				console.log("url player " + i + " " + "Name: " + players[i].name + " " + "Url: " + players[i].url ); 
			}
		}
	}
})();