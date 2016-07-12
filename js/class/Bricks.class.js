var Bricks = function(){
	this.canvas  = document.querySelector('canvas#myCanvas');
	this.ctx = this.canvas.getContext('2d');

	this.brickRowCount = 7;
	this.brickColumnCount = 11;
	
	this.brickWidth = BRICK_WIDTH;
	this.brickHeight = BRICK_HEIGHT;
	
	this.brickPadding = BRICK_PADDING;
	
	this.brickOffsetTop = 50;
	this.brickOffsetLeft = (this.canvas.width-(this.brickColumnCount*(this.brickWidth+this.brickPadding)))/2;
	//this.brickColors = ['#FF0000', ' "FF7F00', '#FFFF000','#00FF00','#00FFFF','#0000FF', '#8B00FF'];
	this.bricks = [];
		//c = column, r = rows
		for(var c=0; c<this.brickColumnCount; c++) {
		    this.bricks[c] = [];
		    for(var r=0; r<this.brickRowCount; r++) {
		    	this.bricks[c][r] = { x: 0, y: 0, state: 0 };
		    	this.bricks[c][r].x = (c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
				this.bricks[c][r].y = (r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
		    }
		}

	this.levelPattern = {
		'1':{'upgrade':{'1':[[1,3],[2,3],[3,2],[3,3],[3,4],[4,1],[4,2],[4,3],[4,4],[4,5],[5,0],[5,1],[5,2],[5,4],[5,5],[5,6],[6,1],[6,2],[6,3],[6,4],[6,5],[7,2],[7,3],[7,4],[8,3],[9,3]],'2': [[5,3]],'3':[]}},'2':{'upgrade':{'1':[[0,0],[0,2],[0,4],[0,6],[1,1],[1,3],[1,5],[2,0],[2,2],[2,4],[2,6],[3,1],[3,3],[3,5],[4,0],[4,2],[4,4],[4,6],[5,1],[5,3],[5,5],[6,0],[6,2],[6,4],[6,6],[7,1],[7,3],[7,5],[8,0],[8,2],[8,4],[8,6],[9,1],[9,3],[9,5],[10,0],[10,2],[10,4],[10,6]],'2':[[1,2],[2,3],[3,2],[4,3],[5,2],[6,3],[7,2],[8,3],[9,2]],'3':[[2,1],[8,1]]}},'3':{'upgrade':{'1':[],'2':[[1,1],[1,3],[1,5],[2,2],[2,4],[3,1],[3,3],[3,5],[4,2],[4,4],[5,1],[5,3],[5,5],[6,2],[6,4],[7,1],[7,3],[7,5],[8,2],[8,4],[9,1],[9,3],[9,5],],'3':[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,0],[1,6],[2,0],[2,6],[3,0],[3,6],[4,0],[4,6],[5,0],[5,6],[6,0],[6,6],[7,0],[7,6],[8,0],[8,6],[9,0],[9,6],[10,0],[10,1],[10,2],[10,3],[10,4],[10,5],[10,6]]}}
	}	
}	


Bricks.prototype.setState = function(c, r, upgradedState) {
	this.bricks[c][r].state = upgradedState;

}

Bricks.prototype.getLevelPattern = function(lvl){
	return this.levelPattern[lvl];
}

Bricks.prototype.draw = function(){
   for(c=0; c<this.brickColumnCount; c++) {
        for(r=0; r<this.brickRowCount; r++) {
        	var brickX = (c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
            var brickY = (r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
            this.bricks[c][r].x = brickX;
            this.bricks[c][r].y = brickY;
            if(this.bricks[c][r].state > 0) {
                this.ctx.beginPath();
                this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                switch(this.bricks[c][r].state) {
                	case 1:
                	default:
                		this.ctx.fillStyle = COLORBRICKLVL1;
                		break;
                	case 2:

                		this.ctx.fillStyle = COLORBRICKLVL2;

                		break;
                	case 3:
                		this.ctx.fillStyle = COLORBRICKLVL3;//this.brickColors[Math.round(Math.random()*7)];
                		break;
                }
                this.ctx.fill();
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.closePath();
            }

            
    	}
	}
}