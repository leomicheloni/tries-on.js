var fileSystem = require('fs');

function read(fileName) {
	return fileSystem.readFileSync(fileName, "ascii");
}

exports.resourceProvider = {
	getResource: function(path) {
		return read(path);
	}
}