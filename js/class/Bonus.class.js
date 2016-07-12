var Bonus = function (bricks, c, r){
	this.canvas  = document.querySelector('canvas#myCanvas');
	this.ctx = this.canvas.getContext('2d');

	this.bonusSize = BONUS_SIZE;
	this.bonusDY = BONUS_SPEED;
	this.bricks = bricks;
	
	this.bonusX = (this.bricks.brickOffsetLeft+c*(BRICK_PADDING+BRICK_WIDTH)+(BRICK_WIDTH/2));
	this.bonusY = this.bricks.brickOffsetTop+r*(BRICK_PADDING+BRICK_HEIGHT)+BRICK_HEIGHT;



	this.bonusTypes = ['life', 'multiBall']
	this.bonuses = {
		'life' : {
			'bonusColor':  LIFE_BONUS_COLOR
		}, 
		'multiBall' : {
			'bonusColor': MULTI_BONUS_COLOR

		}
	};

		this.bonusIndex = Math.floor(Math.random()*this.bonusTypes.length);
		this.bonusType = this.bonusTypes[this.bonusIndex];

}


Bonus.prototype.drawBonus = function() {
	
	this.ctx.beginPath();
    this.ctx.arc(this.bonusX, this.bonusY, this.bonusSize, 0, 2*Math.PI);
    this.ctx.fillStyle = this.bonuses[this.bonusType]['bonusColor'];
    this.ctx.fill();
    this.ctx.closePath(); 

/* Bonus carré, /!\ ajouter  "-this.bonuSize/2" au calcul de bonusX pour centrer le bonus sur la brique!!!!
	this.ctx.beginPath();
    this.ctx.rect(bonusX, bonusY, this.bonusSize, this.bonusSize);
    this.ctx.fillStyle = this.bonuses[bonusType]['bonusColor'];
    this.ctx.fill();
    this.ctx.closePath(); */
    if(this.bonusY < this.canvas.height){
    	this.bonusY += this.bonusDY;
	}

}