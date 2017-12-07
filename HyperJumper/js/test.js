var width = 90;
var height = 20;
var player;
var x;
var y;
var speed;
var gravity = 0.125;
var background;
var e;
var platform;
var platY;
var platX;
var platformArray;


init = function(){
	var canvas = document.getElementById("game");
    	ctx = canvas.getContext("2d");    	 
	canvas.width = 480;
	canvas.height = 640;
	background = new Image();
	background.src = "./images/css/Background_Clouds.png";
	Player();
	Platform();
}			

Player = function(){
	player = new Image();
	player.src = "./images/player.png";
	player.status = "jumping";
	player.speed = 6;
	player.update = function(){
		
		document.onkeydown = function(e) {
   			 switch (e.keyCode) {
        			case 37:
            			x = x-3;
				if (x < -50)
				{
				x = 490;
				}
            			break;
        			case 39:
            			x= x+3;
				if (x > 490)
				{
				x = -50	
				}
            			break;
        		    }
		
		};
		player.checkCollision = function(){
			for (i = 0; i < 15; i++){
			if (y > platformArray[i].platY - 60 && x > platformArray[i].platX - 45 && x < platformArray[i].platX + 45)
			{
				player.speed = 6;
				
			}
			}
			if (y > 580)
			{
			player.speed = 0;
			
			}
			};		
		player.speed -= gravity;
		if (player.speed < -9)
		{
			player.speed = 6;
		}
		y -= player.speed;
		ctx.drawImage(player, x , y);
		
	}
	
	
	
	var x = 240;
	var y = 550;

	ctx.drawImage(player, x , y );
	
}

Platform = function(){
	platformArray = new Array();
		for (i = 0; i < 15; i++)
		{
		platformArray[i] =  new Image();
		platformArray[i].src = "./images/blackWideButton2.png";
	
		platformArray[i].platX = Math.floor(Math.random() * 480);
		platformArray[i].platY = 40 * i;
		ctx.drawImage(platformArray[i], platformArray[i].platX, platformArray[i].platY);
		platformArray.update = function(){
			for (i = 0; i < 15; i++)
			{
			ctx.drawImage(platformArray[i], platformArray[i].platX, platformArray[i].platY);
			}
		}
	
		}
}



	function repeatOften() {
	ctx.clearRect(0, 0, 480, 640);
	
	player.update();
	player.checkCollision();
	platformArray.update();
	
 	requestAnimationFrame(repeatOften);
	}
requestAnimationFrame(repeatOften);

	
	
	
