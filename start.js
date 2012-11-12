// Start screen button class
function Button(x,y,text,color){
    this.x = x ;
    this.y = y ;
    this.text = text ;
    this.color = color ;
}

// draw method
Button.prototype.draw = function() {
    var fontSize = 40 ;
    ctx.font = fontSize + "px monospace" ;
    var txtWidth = ctx.measureText(this.text).width ;
    
    var w = txtWidth + 40 ;
    var h = fontSize + 20 ;
    var x = this.x - w / 2 ;
    var y = this.y  - h /2 ;

    //shadow
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#000';

    ctx.save();
    ctx.fillStyle = this.color ;
    ctx.strokeStyle = '#fff' ;
    ctx.lineWidth = 1 ;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 0;
    ctx.fillText(this.text, x+fontSize/2, y + fontSize);
    ctx.restore();
};

Button.prototype.containsPoint = function(px,py){
    var fontSize = 40 ;
    ctx.font = fontSize + "px monospace" ;
    var txtWidth = ctx.measureText(this.text).width ;
    
    var w = txtWidth + 40 ;
    var h = fontSize + 20 ;
    var x = this.x - w / 2 ;
    var y = this.y  - h /2 ;

    return (x<=px) && (px<=x+w) && (y<=py) && (py<y+h) ;
}

// start buttons :
var buttons = [] ;
buttons['easy'] =  new Button(game.width/2-20 , game.height/2-20, "  Easy  ",'#05a') ;
buttons['medium'] = new Button(game.width/2-20 , game.height/2 + 80, " Medium ",'#05a');
buttons['hard'] = new Button(game.width/2-20 , game.height/2 + 180, "  Hard  ",'#05a');

function writeGameTitle(){
    ctx.save();
    ctx.fillStyle = '#fa0' ;
    ctx.strokeStyle = '#000';
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 10
    ctx.shadowColor = '#fc0';
    ctx.font = "100px Arial";
    var txtWidth = ctx.measureText("GAME OVER").width ; 
    ctx.fillText("Snake Game", game.width/2 - txtWidth/2-20, game.height/4-20 + 50);
    ctx.restore();
}

var mouseMoveHandler = function(e){
    cleanCanvas();
    for(i in buttons){
        var mouseX = e.clientX - this.offsetLeft;
        var mouseY = e.clientY - this.offsetTop;
        if(buttons[i].containsPoint(mouseX, mouseY))
            buttons[i].color = '#fa0';
        else
            buttons[i].color = '#05a';
        buttons[i].draw();
    }
    writeGameTitle();
}

var clickHandler = function(e){
    var difficulty = '' ;
    for( i in buttons ){
        var mouseX = e.clientX - this.offsetLeft;
        var mouseY = e.clientY - this.offsetTop;
        if(buttons[i].containsPoint(mouseX,mouseY)){
            difficulty = buttons[i].text.trim().toLowerCase();
            break;
        }
    }

    switch(difficulty){
        case 'easy':
            game.sizeIncrement = 1 ;
            game.timeBetweenFrames = 300 ;
            game.scoreIncrement = 1;
            break;
        case 'medium':
            game.sizeIncrement = 2 ;
            game.timeBetweenFrames = 150 ;
            game.scoreIncrement = 2;
            break;
        case 'hard':
            game.sizeIncrement = 3 ;
            game.timeBetweenFrames = 60 ;
            game.scoreIncrement = 3;
            break;
        default:
            return ;
    }

    ctx.shadowBlur = 0;
    game.started = true ;
    canvas.removeEventListener('click',clickHandler);
    canvas.removeEventListener("mousemove",mouseMoveHandler);
    exec();
}

function displayStartScreen(){
    writeGameTitle();
    for( i in buttons)
        buttons[i].draw();
    canvas.addEventListener("mousemove",mouseMoveHandler);
    canvas.addEventListener("click",clickHandler);
}

