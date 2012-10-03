var stackAppender = {
	logStack: [],
	
	log: function(message) {
		this.logStack.push(message);
	},
	
	printAll: function() {
		console.dir(this.logStack);
	},
	
	getStack: function() {
		return this.logStack;
	},
}

exports.notifier = {
	appenders: [console, stackAppender],
	
	notify: function(message) {
		for (var i=0; i < this.appenders.length; i++) {
			this.appenders[i].log(message);
		}
	},
	
	report: function() { stackAppender.printAll() },
	getLog: function() { return stackAppender.getStack() },
};