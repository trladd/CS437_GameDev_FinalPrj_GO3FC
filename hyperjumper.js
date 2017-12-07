/**
 * HyperJumper
 * 
 * Follow this guide when creating a minigame for this project. 
 * 
 */

function HyperJumper(conn, playerNumber) {

    //Game Values - No change needed here
    this.conn = conn;
    this.playerNumber = playerNumber;
    this.gameName = "HyperJumper";
    this.keepGoing = true;
    this.gameResults = new GameResult(0, 0, this.gameName);

    /**
     * Setting up Data Connection 
     * 
     * This conn.on statement is a method that will set up the data connectivity for this particular applicatioon. Be sure to use unique naming as 
     * this may carry outside of this game. This works by setting up a case statement for example 'thisCase' and then it will be called with a 
     * conn.send statement that sends an array where the first element is the data name so conn.send(["thisCase", DATA TO SEND HERE])
     */
    conn.on('data', function (data) {
        console.log("Received to hyperjumper.js Datacontroller: " + data[0]);
        switch (data[0]) {
            //Various Cases for the first element of data being passed 

            case "gamejsGeneralData":
                console.log("Received general data for hyperjumper.js:\n" + data[1]);
                break;
        }
    });


    /**
     * Game Loop
     * 
     * This is where you will put your game loop code. You can treat this as a loop or you can work in here by implementing your own loop. 
     * Set the this.keepGoing != true for the game loop to exit. Ensure that you either have been updating the game results object or that you 
     * update the game results object before the final return statement in this.runGame function
     */
    this.gameLoop = function () {
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
var myScore;

init = function(){
	var canvas = document.getElementById("game");
    	ctx = canvas.getContext("2d");    	 
	canvas.width = 480;
	canvas.height = 640;
	background = new Image();
	background.src = "./images/css/Background_Clouds.png";
	myScore.playerNumber = new component("30px", "Consolas", "black", playerNumber * 100, 600, "text");
	Player();
	Platform();
}			
function component(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0; 
  this.x = x;
  this.y = y; 
  this.update = function() {
      if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

}
Player = function(){
	player = new Image();
	player.src = "./images/player.png";
	player.status = "jumping";
	player.speed = 6;
	player.maxY = 0;
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
			if (y > platformArray[i].platY - 60 && y < platformArray[i].platY && x > platformArray[i].platX - 45 && x < platformArray[i].platX + 45)
			{
				player.speed = 6;
				
			}
			}
			if (y > 640)
			{
			player.speed = 0;
			gravity = 0;
			playermaxY = playermaxY + 1;
			this.gameResult = new GameResult(playermaxY, 0, this.HyperJumper);
			}
			};		
		player.speed -= gravity;
		if (player.speed < -9)
		{
			player.speed = 0;
		}
		y -= player.speed;
		ctx.drawImage(player, x , y);
		
	}
	
	
	
	x = 240;
	y = 550;

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
			if (player.speed > 0){
			platformArray[i].platY = platformArray[i].platY + player.speed;
			player.maxY = player.maxY + player.speed;
			}
			if (player.speed <= 0){
			platformArray[i].platY++;
			player.maxY = player.maxY - 1;

			}
			if (platformArray[i].platY > 540 && y < 320)
			{
				platformArray[i].platX = Math.floor(Math.random() * 480);
				platformArray[i].platY = Math.floor(Math.random() * 40);
			}
			ctx.drawImage(platformArray[i], platformArray[i].platX, platformArray[i].platY);
			}
		}
	
		}
}



	function repeatOften() {
	ctx.clearRect(0, 0, 480, 640);
	myScore.text = "Player 1: " + Math.floor(player.maxY) + "Player 2: " + 0;
	myScore.update();
	player.update();
	player.checkCollision();
	platformArray.update();
	
 	requestAnimationFrame(repeatOften);
	}
requestAnimationFrame(repeatOften);

	
	
	
	
	
	

        if (this.gameResults.playerOneScore > this.gameResults.playerTwoScore) {
            this.gameResults.winner = 1;
	    
        } else {
            this.gameResults.winner = 2;
        }
        this.keepGoing = false;
	var endString = "This is the end of the game";

	
        ///END EXAMPLE
    }


    /**
     * This. Run Game
     * This method is what will be the driving force for this game file. This method is called by the main controller and it should be ensured
     * that the naming is not changed here. 
     */
    this.runGame = function () {
        $("#game_HyperJumper").slideDown(); //Displays your HTML pane
        console.log("Running Game" + this.gameName);
        while (this.keepGoing) {
            this.gameLoop();
        }
        console.log("Ending Game " + this.gameName);
        this.gameResults.setPlayerOneScore(76);
        $("#game_HyperJumper").slideUp();
        return this.gameResults;
    }
}   
HyperJumper();
HyperJumper.runGame();