(function(){
	defaultPersistenceProvider = {
		collection : new Array(),
		save: function(key, object){
			this.collection.push({k: key, o: object});
		},
		
		get: function(key){
			return this.collection.filter(function(e) { 
				return e.k == key 
			})[0].o;
		},
		
		count: function() {
			return this.collection.length;
		},
		
		getAll: function() {
			return this.collection.map(function(elem) { return elem.o; });
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
		}
	};
	
	exports.playerManager = playerManager;
})();