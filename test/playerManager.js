var Assert = require('assert');
var playerManager = require('../lib/playerManager').playerManager;

playerManager.add({url: 'a', score: 0, name: 'a'});
playerManager.add({url: 'b', score: 10, name: 'b'});
playerManager.add({url: 'c', score: -1, name: 'c'});
var players = playerManager.getAllOrdered();
Assert.ok(players[0].name == 'b', "No ordena bien");
Assert.ok(players[1].name == 'a', "No ordena bien");
Assert.ok(players[2].name == 'c', "No ordena bien");

playerManager.add({url: 'd', score: 10, name: 'd'});
var players = playerManager.getAllOrdered();
Assert.ok(players[0].name == 'd', "No ordena bien");
Assert.ok(players[1].name == 'b', "No ordena bien");
Assert.ok(players[2].name == 'a', "No ordena bien");
Assert.ok(players[3].name == 'c', "No ordena bien");

playerManager.add({url: 'e', score: -10, name: 'e'});
var players = playerManager.getAllOrdered();
Assert.ok(players[0].name == 'd', "No ordena bien");
Assert.ok(players[1].name == 'b', "No ordena bien");
Assert.ok(players[2].name == 'a', "No ordena bien");
Assert.ok(players[3].name == 'c', "No ordena bien");
Assert.ok(players[4].name == 'e', "No ordena bien");