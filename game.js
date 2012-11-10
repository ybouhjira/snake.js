var canvas = document.getElementById("snake-game-canvas");
var ctx = canvas.getContext("2d");

// Contains the games global variables
var game = {
	width: canvas.getAttribute("width"),
	height: canvas.getAttribute("height"),
	vCount: 80,
	hCount: 60,
	paused: false
}
game.cellW =  game.width / game.vCount;
game.cellH = game.height / game.hCount;