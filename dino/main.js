var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-100;
canvas.height =window.innerHeight-100;

var imgDino = new Image();
imgDino.src = '1-original.png';

var imgCactus = new Image();
imgCactus.src = '4-original2.png';

var animation;

var game_over = false;



var dino = {
	x:10,
	y:200,
	width: 50,
	height: 50,
	draw(){
		ctx.fillStyle ='green';
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.drawImage(imgDino,this.x,this.y,this.width,this.height)
	}
}


class Cactus{
	constructor(){
		this.x = 500;
		this.y = 200;
		this.width = 30;
		this.height = 50;
	}
	draw(){
		ctx.fillStyle ='red';
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.drawImage(imgCactus,this.x,this.y,this.width,this.height)
	}
}

var timer = 0;
var cactuses = []; 
var jumpingTime = 0;

var jumping = false;
document.addEventListener('keydown',function(e){
	if(e.code=='Space'){
		//alert("점프")
		jumping = true;
	}
})

function fram(){
	
	if(game_over) return;
	
	
	animation = requestAnimationFrame(fram)
	timer++;
	
	ctx.clearRect(0,0, canvas.width,canvas.height);
	
	if(timer % 120 ==0){
		var cactus = new Cactus();
		cactuses.push(cactus);	
	}
	cactuses.forEach((a, i, o)=>{
		if(a.x < 0){
			o.splice(i,1);
		}
		collisino(dino, a);
		a.x-=2;
		a.draw();
		
	})
	
	if(jumping==true){
		dino.y-=2.5;
		jumpingTime++;
	}
	
	if(jumpingTime > 40){
		jumping = false;
		jumpingTime = 0;
	}
	
	if(jumping == false){
		if(dino.y<200){
			dino.y += 2.5;
		}
	}
	dino.draw()
}
fram()

function collisino(dino, cactus){
	var xDifference = cactus.x - (dino.x+dino.width);
	var yDifference = cactus.y - (dino.y+dino.height);
	
	if(xDifference < 0 && yDifference < 0){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		cancelAnimationFrame(animation);
		game_over = true;
	}
}


