(function(){
	defaultPersistenceProvider = {
		collection : new Array(),
		save: function(object, key){
			this.collection.push({k: key, o: object});
		},
		
		get: function(key){
			return this.collection.filter(function(e) { 
				return e.k == key 
			})[0].o;
		},
		
		count: function() {
			return this.collection.length;
		}
	};

	playerManager = {
		persistenceProvider: defaultPersistenceProvider,
		
		add: function(player){
			this.persistenceProvider.save(player, player.url);
		},
		
		get: function(playerUrl){
			return this.persistenceProvider.get(playerUrl);
		},
		
		count: function() {
			return this.persistenceProvider.count();
		}
	};
	
	exports.playerManager = playerManager;
})();