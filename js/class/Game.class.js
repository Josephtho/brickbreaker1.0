var Game = function(){
	this.canvas  = document.querySelector('canvas#myCanvas');
	this.ctx = this.canvas.getContext('2d');

	this.score = 0;
	this.lives = LIVES;
	this.win;
	this.levelNumber = 1;
	this.ball =  new Ball();
	this.paddle = new Paddle(this.ball);
	this.bricks = new Bricks();
	console.log(this.balls)
}


Game.prototype.drawScore = function() {

    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = COLOR1;
    this.ctx.fillText("Score: "+this.score+'		Level: '+this.levelNumber+'			High-Score: '+highScore, 8, 20);
}

Game.prototype.drawLives = function() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = COLOR1;
    this.ctx.fillText("Lives: "+this.lives, this.canvas.width-65, 20);
}



Game.prototype.collisionDetection = function() {

	// Max scores for every level (Bricks lv1 * 10 pts, lv2 * 20 pts etc.)
	var score1 = this.bricks.getLevelPattern(1)['upgrade'][1].length*10+this.bricks.getLevelPattern(1)['upgrade'][2].length*20+this.bricks.getLevelPattern(1)['upgrade'][3].length*30;
	var score2 = this.bricks.getLevelPattern(2)['upgrade'][1].length*10+this.bricks.getLevelPattern(2)['upgrade'][2].length*20+this.bricks.getLevelPattern(2)['upgrade'][3].length*30;
	var score3 = this.bricks.getLevelPattern(3)['upgrade'][1].length*10+this.bricks.getLevelPattern(3)['upgrade'][2].length*20+this.bricks.getLevelPattern(3)['upgrade'][3].length*30;

	// For every every bricks from every columns then rows
  for(var c=0; c<this.bricks.brickColumnCount; c++) {
    for(var r=0; r<this.bricks.brickRowCount; r++) {
        var b = this.bricks.bricks[c][r];
       // If the brick is lit up 
      if(b.state > 0) {
          
          // If the coordinates of the ball are inside these of the bricks

        if(this.ball.x > b.x && this.ball.x < b.x + this.bricks.brickWidth && this.ball.y > b.y && this.ball.y < b.y + this.bricks.brickHeight) {
            //Then the ball bounces
            this.ball.setDY(-this.ball.dy);
            //Player earns 10 points
            this.score += 10;
            //The brick loses a level
            this.bricks.bricks[c][r].state --;
            

        	//Checking for victory
          if(this.score == score1 || this.score == score1+score2 || this.score == score1+score2+score3) {
              return true;
          }
            
      	}
     	}
    }
  }
}


Game.prototype.askReplay = function() {
	if (!this.lives || (this.lives && this.levelNumber == 4)) {
		$('canvas').click(restartGame);
	} else {
		$('canvas').click(this.startNextLevel.bind(this));
		this.win = undefined;
	}
	$('canvas').keydown(this.onSpaceDownStart.bind(this));

	this.ctx.beginPath();
    this.ctx.rect(this.canvas.width*0.3, this.canvas.height*0.3, this.canvas.width*0.4, this.canvas.height*0.4);
    this.ctx.fillStyle = COLOR1;
    this.ctx.globalAlpha = 0.4;
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.globalAlpha = 1;
    
    this.ctx.font = "40px Open Sans";
	this.ctx.fillStyle = COLOR2;
	if (this.lives) {
        if (this.levelNumber == 4){
            this.ctx.fillText("BRAVO !", this.canvas.width*0.42, this.canvas.height*0.40);
        } else {
	       this.ctx.fillText("Félicitations !", this.canvas.width*0.375, this.canvas.height*0.40);
        }
	} else {
		this.ctx.fillText("Game Over !", this.canvas.width*0.37, this.canvas.height*0.40);
	}
	this.ctx.font = "16px Open Sans";
    this.ctx.fillStyle = COLOR2;
    this.ctx.fillText("Vous avez marqué " +this.score+" points", this.canvas.width*0.38, this.canvas.height*0.46);

    if (this.lives) {
        if (this.levelNumber == 4){
            this.ctx.fillText("Vous avez gagné !! :)", this.canvas.width*0.42, this.canvas.height*0.645);
        } else {
        	this.ctx.font = "20px Open Sans";
        	this.ctx.fillText("Clique pour passer au niveau suivant", this.canvas.width*0.315, this.canvas.height*0.645);
        }
    } else {
    	this.ctx.font = "20px Open Sans";
    	this.ctx.fillText("Clique pour rejouer", this.canvas.width*0.40, this.canvas.height*0.645);
    }
}

Game.prototype.upgradeBricks = function(indexOfBricksToUpgrade){
// FONCTION DE CREATION DE LEVELS
	for (i=0; i<indexOfBricksToUpgrade[1].length; i++) {
		this.bricks.setState(indexOfBricksToUpgrade[1][i][0], indexOfBricksToUpgrade[1][i][1], 1);
	}
	
	for (i=0; i<indexOfBricksToUpgrade[2].length; i++) {
		this.bricks.setState(indexOfBricksToUpgrade[2][i][0], indexOfBricksToUpgrade[2][i][1], 2);
	}

	for (i=0; i<indexOfBricksToUpgrade[3].length; i++) {
		this.bricks.setState(indexOfBricksToUpgrade[3][i][0], indexOfBricksToUpgrade[3][i][1], 3);
	}
}

Game.prototype.renderGame = function() {
	//Clear the canvas each frame to re-draw everything
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // We draw the main elements
    this.bricks.draw();
    this.ball.draw();
    this.paddle.draw();

    // The Gamescreen info
    this.drawScore();
   	this.drawLives();


   	// We check if there is collision with bricks, and if there is, if we win
    this.win = this.collisionDetection();
    if (this.win == true) {
    	this.levelNumber++;
    	this.askReplay();
    	return;
    }

    // TOP & BOTTOM BOUNCE
    if(this.ball.x + this.ball.dx > this.canvas.width-this.ball.ballRadius || this.ball.x + this.ball.dx < this.ball.ballRadius) {
        this.ball.setDX(-this.ball.dx);
    }

    // LEFT & RIGHT BOUNCE
    if(this.ball.y + this.ball.dy < this.ball.ballRadius) {
        this.ball.setDY(-this.ball.dy);

    } else if(this.ball.y + this.ball.dy > this.canvas.height-this.ball.ballRadius) {
    // PADDLE BOUNCE
        if(this.ball.x > this.paddle.paddleX && this.ball.x < this.paddle.paddleX + this.paddle.paddleWidth) {
            this.paddle.bounce();
    // LOSE A LIFE IF NOT CAUGHT
        } else {
        		this.lives--;
        		this.paddle.bounceCount = 0;
					if(!this.lives) {
						if(this.score>highScore){
				    		highScore = this.score;
				    	}
				    	this.askReplay();
				    	return;
					} else {
						this.resetPos();
					}
				}
      }
    
    // PADDLE MOVEMENT
    if(this.paddle.rightPressed && this.paddle.paddleX < this.canvas.width-this.paddle.paddleWidth) {
        this.paddle.paddleX += PADDLE_SPEED;
    }
    else if(this.paddle.leftPressed && this.paddle.paddleX > 0) {
        this.paddle.paddleX -= PADDLE_SPEED;
    }

    	this.ball.moveBall();
 
   	requestAnimationFrame(this.renderGame.bind(this));
}	

Game.prototype.startGame = function() {
    var game = new Game()
    var bricksToModify = this.bricks.getLevelPattern(this.levelNumber);
    game.upgradeBricks(bricksToModify['upgrade']);
    game.renderGame();

    $('canvas').unbind('click');
    $('canvas').unbind('keydown');
}

Game.prototype.resetPos = function(){
		this.ball.resetPos();
		this.paddle.resetPos();
}

Game.prototype.startNextLevel = function(){
	this.bricks = new Bricks();
	var bricksToModify = this.bricks.getLevelPattern(this.levelNumber);
    this.upgradeBricks(bricksToModify['upgrade']);
    this.paddle.bounceCount = 0;
    this.resetPos();
    this.renderGame();
    $('canvas').unbind('keydown');
    $('canvas').unbind('click');

}

Game.prototype.onSpaceDownStart = function(e){
	if (e.keyCode == 32) {
		if (!this.lives) {
			console.log('restart')
		}
		console.log('startnext')
	}
}





