var Canvas = function(){
	// mes propriétés
	this.canvas  = document.querySelector('canvas#myCanvas');
	this.ctx = this.canvas.getContext('2d');
	
};

Canvas.prototype.draw = function(){
	this.ctx.beginPath();
	this.ctx.arc(50, 50, 10, 0, Math.PI*2);
	this.ctx.fillStyle = "#0095DD";
	this.ctx.fill();
	this.ctx.closePath();
}
