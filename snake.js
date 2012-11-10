// This array contains the points that forms the snake

var snake = {
	headX: 2,
	headY: 0,
	direction: 'right',
	headCount: 2 ,
	points: [new SnakePoint('up',5)]
}

// a point in which the snake changes direction
function SnakePoint(direction,count){
	this.direction = direction ;
	this.count = count ;
}