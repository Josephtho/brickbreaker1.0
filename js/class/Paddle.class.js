var Paddle = function(ball) {
	this.ball = ball
	this.canvas  = document.querySelector('canvas#myCanvas');
	this.ctx = this.canvas.getContext('2d');
	this.paddleHeight = PADDLE_HEIGHT;
	this.paddleWidth = PADDLE_WIDTH;
	this.paddleX = (this.canvas.width-this.paddleWidth)/2;
	this.rightPressed = false;
	this.leftPressed = false;
    
    this.bounceCount = 0


	document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
	document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
	document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);

}

Paddle.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.rect(this.paddleX, this.canvas.height-this.paddleHeight, this.paddleWidth, this.paddleHeight-5);
    this.ctx.fillStyle = PADDLE_COLOR;
    this.ctx.fill();
    this.ctx.closePath();
}

Paddle.prototype.bounce = function() {
    
    var dx, dy;
    var ballPosition = this.ball.getPosition();
    var ballRelativePos = (ballPosition[0]-this.paddleX)/this.paddleWidth;

    if (ballRelativePos < 0.1) {
        dx = Math.pow(BALL_ACCELERATION,this.bounceCount)*-8;
        dy = Math.pow(BALL_ACCELERATION,this.bounceCount)*-1;
    }else if (ballRelativePos < 0.2){
        dx = Math.pow(BALL_ACCELERATION,this.bounceCount)*-8;
        dy = Math.pow(BALL_ACCELERATION,this.bounceCount)*-2;
    }else if (ballRelativePos < 0.3){
        dx = Math.pow(BALL_ACCELERATION,this.bounceCount)*-6;
        dy = Math.pow(BALL_ACCELERATION,this.bounceCount)*-4;
    }else if (ballRelativePos < 0.4){
        dx = Math.pow(BALL_ACCELERATION,this.bounceCount)*-4;
        dy = Math.pow(BALL_ACCELERATION,this.bounceCount)*-6;
    }else if (ballRelativePos < 0.5){
        dx = Math.pow(BALL_ACCELERATION,this.bounceCount)*-1;
        dy = Math.pow(BALL_ACCELERATION,this.bounceCount)*-8;
    }else if (ballRelativePos < 0.6){
        dx = Math.pow(BALL_ACCELERATION,this.bounceCount)*1;
        dy = Math.pow(BALL_ACCELERATION,this.bounceCount)*-8 ;
    }else if (ballRelativePos < 0.7){
        dx = Math.pow(BALL_ACCELERATION,this.bounceCount)*4;
        dy = Math.pow(BALL_ACCELERATION,this.bounceCount)*-6;
    }else if (ballRelativePos < 0.8){
        dx = Math.pow(BALL_ACCELERATION,this.bounceCount)*6;
        dy = Math.pow(BALL_ACCELERATION,this.bounceCount)*-4;
    }else if (ballRelativePos < 0.9){
        dx = Math.pow(BALL_ACCELERATION,this.bounceCount)*8;
        dy = Math.pow(BALL_ACCELERATION,this.bounceCount)*-2; 
    }else if (ballRelativePos < 1){
        dx = Math.pow(BALL_ACCELERATION,this.bounceCount)*8;
        dy = Math.pow(BALL_ACCELERATION,this.bounceCount)*-1; 
    } else {
        dx = 5;
        dy = -5;
    }

    this.ball.setDXDY(dx, dy);
    this.bounceCount++;
    
}

Paddle.prototype.resetPos = function(){
    this.paddleX = (this.canvas.width-this.paddleWidth)/2;
}

//////////////////// MOVEMENT //////////////////////////////

/*$(document).mousemove(mouseMoveHandler.bind(this));
$(document).keydown(keyDownHandler.bind(this));
$(document).keyup(keyUpHandler.bind(this));*/


Paddle.prototype.mouseMoveHandler = function(e) {

    var relativeX = e.clientX - this.canvas.offsetLeft;
    if(relativeX > 0 && relativeX < this.canvas.width) {
        this.paddleX = relativeX - this.paddleWidth/2;
    }
}

Paddle.prototype.keyDownHandler = function(e) {
    if(e.keyCode == 39) {
        this.rightPressed = true;
    }
    else if(e.keyCode == 37) {
        this.leftPressed = true;

	}
}

Paddle.prototype.keyUpHandler = function(e) {
    if(e.keyCode == 39) {
        this.rightPressed = false;
    }
    else if(e.keyCode == 37) {
        this.leftPressed = false;
    }
}