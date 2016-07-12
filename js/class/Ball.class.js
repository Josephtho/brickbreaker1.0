var Ball = function(){
	// mes propriétés
	this.canvas  = document.querySelector('canvas#myCanvas');
	this.ctx = this.canvas.getContext('2d');
	this.x = this.canvas.width/2;
	this.y = this.canvas.height-30;
	this.dx = INITIAL_DX;
	this.dy = INITIAL_DY;
	this.ballRadius = BALL_RADIUS;
};



Ball.prototype.draw = function() {
	   
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
    this.ctx.fillStyle = BALL_COLOR;
    this.ctx.fill();
    this.ctx.closePath();
}

Ball.prototype.getPosition = function(){
	return [this.x, this.y];
}

Ball.prototype.setDX = function(dx) {
	this.dx = dx;
}

Ball.prototype.setDY = function(dy) {
	this.dy = dy;
}

Ball.prototype.setDXDY = function(dx, dy){
	this.setDX(dx);
	this.setDY(dy);
}

Ball.prototype.moveBall = function(){
	this.x += this.dx;
	this.y += this.dy;
}

Ball.prototype.resetPos = function(){
	this.x = this.canvas.width/2;
	this.y = this.canvas.height-30;
	this.dx = -INITIAL_DX;
	this.dy = INITIAL_DY;
}