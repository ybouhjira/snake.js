// Draws a random food on the map
function drawFood(){
	ctx.save();
	ctx.fillStyle = "#fa0";
	ctx.beginPath();
	var x = parseInt(Math.random() * game.vCount) * game.cellW + game.cellW / 2;
	var y = parseInt(Math.random() * game.hCount) * game.cellH + game.cellH / 2;
	var radius = game.cellW / 2 ;
	ctx.arc(x,y, radius, 0, Math.PI*2);
	ctx.stroke();
	ctx.fill();
	ctx.restore();
}

// Draws a piece of the snake at the given coordinates
function drawSnakePiece(x,y){
	ctx.save();
	ctx.fillStyle = '#abf';
	ctx.strokeStyle = '#05e';
	ctx.beginPath();
	var realX = parseInt(game.cellW*x) ;
	var realY = parseInt(game.cellH*y);
	ctx.rect(realX, realY, game.cellW, game.cellH);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

// Draws the snake
function drawSnake(){
	// draw the head
	drawSnakePiece(snake.headX, snake.headY);
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
		drawSnakePiece(snake.headX + vhx, snake.headY + vhy);
	}

	//draw the other pieces
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
			drawSnakePiece(curX, curY);
		}
	}
}

// Draws the hole game after update
function draw(){
	ctx.clearRect(0,0,game.width,game.height);
	if(game.foodEaten){
		drawFood();
		game.foodEaten = false ;
	}
	drawSnake();
}

function update(){
	// tail 
	if(snake.points.length > 0){
		var lastPoint = snake.points[snake.points.length-1] ;
		if(lastPoint.count > 1)
			lastPoint.count--;
		else
			snake.points.splice(snake.points.length-1,1);
	}

	// head
	switch(snake.direction){
		case 'up':
			snake.headY--;
			break;
		case 'down':
			snake.headY++;
			break;
		case 'left':
			snake.headX--;
			break;
		case 'right':
			snake.headX++;
	}
	if(snake.points.length > 0){
		snake.headCount++;
	}
}
window.addEventListener('keydown',function(e){
	var key = String.fromCharCode(e.keyCode);
	switch(key){
		case 'Z':
			snake.direction = 'up';
			break;
		case 'S':
			snake.direction = 'down';
			break;
		case 'Q':
			snake.direction = 'left';
			break;
		case 'D':
			snake.direction = 'right';
	}
});
var exec = function(){
	update();
	draw();
	setTimeout(exec,100);
}
setTimeout(exec,100);
