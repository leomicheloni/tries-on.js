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
		}
	};

	playerManager = {
		persistenceProvider: defaultPersistenceProvider,
		add: function(player){
			this.persistenceProvider.save(player, player.url);
		},
		
		get: function(playerUrl){
			return this.persistenceProvider.get(playerUrl);
		}
	};
		
})();