// Draws a random food on the map
function drawFood(){
	ctx.save();
	ctx.fillStyle = "#fa0";
	ctx.beginPath();
	var x,y;
	if(food.eaten){
		x = parseInt(Math.random() * game.hCount) * game.cellW + game.cellW / 2;
		y = parseInt(Math.random() * game.vCount) * game.cellH + game.cellH / 2;
		food.x = (x - game.cellW/2 ) / game.cellW  ;
		food.y = (y - game.cellH/2 ) / game.cellH  ;
		food.eaten = false ;
	}else{
		x = food.x * game.cellW + game.cellW / 2 ;
		y = food.y * game.cellH + game.cellH / 2 ;
	}
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
	var realY = parseInt(game.cellH*y) ;
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

function writePause(){
	ctx.font = "100px Arial";
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	var txtWidth = ctx.measureText("PAUSE").width ; 
	ctx.fillText("PAUSE",game.width/2 - txtWidth/2,game.height/2+34);
}

function cleanCanvas(){
	ctx.clearRect(0,0,game.width,game.height);
}
function writeScore(){
	var text = "Score : "+game.score ;
	ctx.save();
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	ctx.font = "20px Arial";
	var txtWidth = ctx.measureText(text).width ;
	ctx.fillText (text, game.width/2 - txtWidth/2, game.height - game.cellH );
	ctx.restore(); 
}

// Draws the hole game after update
function draw(){
	cleanCanvas();
	drawSnake();
	drawFood();
	if(game.paused)
		writePause();
	writeScore();	
}

function update(){
	// tail 
	if(snake.points.length > 0){
		var lastPoint = snake.points[snake.points.length-1] ;
		if(lastPoint.count > 1)
			lastPoint.count--;
		else
			snake.points.pop();
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

	// check if the snake will eat the food
	if(snake.headX == food.x && snake.headY == food.y ){
		food.eaten = true ;
		game.score += game.scoreIncrement;
		if(snake.points.length > 0)
			snake.points[snake.points.length-1].count += game.sizeIncrement;
		else
			snake.headCount += game.sizeIncrement;
	}
}

var keyboardInputHandler = function(e){
	var direction = snake.direction, vx=0, vy=0;

	switch(e.keyCode){
		case arrowKeys.up:
			direction = 'up';
			vy = -1;
			break;
		case arrowKeys.down:
			direction = 'down';
			vy = +1;
			break;
		case arrowKeys.left:
			direction = 'left';
			vx = -1;
			break;
		case arrowKeys.right:
			direction = 'right';
			vx = +1;
			break;
		case 'P'.charCodeAt(0) :
			game.paused = (game.paused)? false:true ;
			if(!game.paused)
				exec();
			break;
	}
	if(!(  (direction == 'up' && snake.direction == 'down')
		||(direction == 'down' && snake.direction == 'up')
		||(direction == 'left' && snake.direction == 'right')
		||(direction == 'right' && snake.direction == 'left')
		)){

		if(direction != snake.direction){
			snake.points.unshift(new SnakePoint(snake.direction, snake.headCount+1));
			snake.headCount = 0;
			snake.direction = direction ;
			if(snake.points.length > 1){
				if(snake.points[snake.points.length-1].count == 1)
					snake.points.pop();
				else
					snake.points[snake.points.length-1].count--;
			}
		}

		// Remove the event listener so that the user can't change direction two
		// time between 2 frames
		if(!game.paused)
			window.removeEventListener('keydown',keyboardInputHandler);
	}
}

function writeGameOver(){
	ctx.font = "100px Arial";
	ctx.fillStyle = 'rgba(255,255,255,0.5)';
	var txtWidth = ctx.measureText("GAME OVER").width ; 
	ctx.fillText("GAME OVER",game.width/2 - txtWidth/2,game.height/2+34);
}

var exec = function(){
	if(!game.started)
		displayStartScreen();
	else{
		if(lost()){
			game.paused = true;
			window.removeEventListener('keydown',keyboardInputHandler);
			writeGameOver();
			return;
		}
		update();
		draw();
		window.addEventListener('keydown',keyboardInputHandler);
		if(!game.paused)
			setTimeout(exec,game.timeBetweenFrames);
	}
}
setTimeout(exec,game.timeBetweenFrames);
