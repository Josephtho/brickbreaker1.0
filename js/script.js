const 	COLOR1 = "#222222",
		COLOR2 = "#ffffff", //white
		COLORBRICKLVL1 = "#C58658",
		COLORBRICKLVL2 = "#794618", 
		COLORBRICKLVL3 = "#241201", 

		BONUS_SIZE = 13,
		BONUS_SPEED = 3,
		LIFE_BONUS_COLOR = "#3EA500",
		MULTI_BONUS_COLOR = "#04005F",


		PADDLE_SPEED = 15,
		PADDLE_HEIGHT = 15,
		PADDLE_WIDTH = 130,
		PADDLE_COLOR = "#222222",

		INITIAL_DX = -1,
		INITIAL_DY = -10,
		BALL_ACCELERATION = 1.06,
		BALL_RADIUS = 8,
		BALL_COLOR = "#222222",

		LIVES = 3,

		BRICK_WIDTH = 60,
		BRICK_HEIGHT = 20,
		BRICK_PADDING = 2;

var	highScore = 0;
 

function restartGame (){
	var game = new Game();
	game.startGame();
}

function homePage(){
	var canvas = document.querySelector('canvas#myCanvas');
	var ctx = canvas.getContext('2d')
	ctx.beginPath();
    ctx.rect(canvas.width*0.3, canvas.height*0.3, canvas.width*0.4, canvas.height*0.4);
    ctx.fillStyle = COLOR1;
    ctx.globalAlpha = 0.4;
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
 	ctx.fillStyle = COLOR2;
	ctx.font = "20px Open Sans";
    ctx.fillText("Clique pour jouer", canvas.width*0.42, canvas.height*0.645);


    ctx.font = "40px Open Sans";
	ctx.fillStyle = COLOR2;
	ctx.fillText("Welcome !", canvas.width*0.40, canvas.height*0.40);
}


$(function(){

	homePage();
	$('canvas').click(restartGame);});
	//$(document).keydown(game.renderGame);

