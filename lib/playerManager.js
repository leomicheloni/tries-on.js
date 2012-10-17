(function(){
	defaultPersistenceProvider = {
		collection : {},
		
		save: function(key, object){
			this.collection[key] = object;
		},
		
		get: function(key){
			return this.collection[key];
		},
		
		count: function() {
			var count = 0;
			for (key in this.collection) { count++ };
			return count;
		},
		
		getAll: function() {
			var values = new Array();
			
			for (key in this.collection) {
				values.push(this.collection[key]);
			}
			
			return values;
		},
		
		getAllOrdered: function() {
			return this.getAll().sort(function(player1, player2) { return player1.score <= player2.score; });
		}
	};

	playerManager = {
		persistenceProvider: defaultPersistenceProvider,
		
		add: function(player){
			this.persistenceProvider.save(player.url, player);
		},
		
		get: function(playerUrl){
			return this.persistenceProvider.get(playerUrl);
		},
		
		count: function() {
			return this.persistenceProvider.count();
		},
		
		getAll: function() {
			return this.persistenceProvider.getAll();
		},
		
		getAllOrdered: function() {
			return this.persistenceProvider.getAllOrdered();
		}
	};
	
	exports.playerManager = playerManager;
})();