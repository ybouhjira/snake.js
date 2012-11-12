var canvas = document.getElementById("snake-game-canvas");
var ctx = canvas.getContext("2d");

// Contains the games global variables
var game = {
	width: canvas.getAttribute("width"),
	height: canvas.getAttribute("height"),
	vCount: 30,
	hCount: 40,
	paused: false,
	score: 0,
	timeBetweenFrames: 60,
	sizeIncrement: 5,
	scoreIncrement: 3,
	started: false
};
game.cellW = game.width / game.hCount;
game.cellH = game.height / game.vCount;


var arrowKeys = {
	left: 37,
	up: 38,
	right: 39,
	down: 40
}
// Check if the player have lost
function lost(){
	if(snake.headX == game.hCount-1 && snake.direction == 'right'
	||snake.headX == 0 && snake.direction == 'left'
	||snake.headY == game.vCount-1 && snake.direction == 'down'
	||snake.headY == 0 && snake.direction == 'up'
	){
		return true;
	}

	// This part was copy-pasted here from drawSnake() just change d
	// drawSnakePiece(x1,y1) calls to crndts.push({x: x1, y: y1})
	var crndts = [] ;
	var vhx = 0, vhy=0;
	for(var j=0; j<snake.headCount ; j++){
		switch(snake.direction){
		case 'up': 
			vhy++;
			break;
		case 'down':
			vhy--;
			break;
		case 'left':
			vhx++;
			break;
		case 'right' :
			vhx--;
		}
		crndts.push({x: snake.headX + vhx, y: snake.headY + vhy });
	}

	var curX = snake.headX + vhx ;
	var curY = snake.headY + vhy ;
	for(var i=0; i<snake.points.length; i++){
		var vx = 0, vy=0;
		for(var j=0; j<snake.points[i].count-1; j++){
			switch(snake.points[i].direction){
				case 'up': 
					curY++;
					break;
				case 'down':
					curY--;
					break;
				case 'left':
					curX++;
					break;
				case 'right' :
					curX--;
			}
			crndts.push({x: curX, y: curY});
		}
	}

	for(var i=0; i<crndts.length; i++)
		if(snake.headX == crndts[i].x && snake.headY == crndts[i].y)
			return true ;
	return false;
}
