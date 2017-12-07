

function PastryPanic(conn, playerNumber){
	this.conn = conn;
    this.playerNumber = playerNumber;
    this.gameName = "Pastry Panic";
    this.keepGoing = true;
    this.gameResults = new GameResult(0,0,this.gameName);

    //Sets up what will happen when data is received
    conn.on('data', function (data) {
        console.log('Received Exmaple Game Data: ', data);
		setUPOtherPlayer(data)
    });
	
	    this.gameLoop = function(){
        //This is where you will put your game loop code
        //Set this.keepGoing != true for the game loop to exit
        //Ensure that you either have been updating the game results object
        //or that you update the game results object before the final return 
        //statement in this.runGame function
        //BEGIN EXAMPLE
		sendData = Array();
		for(j = 0; j < 25; j++){
			sendData[j] = pastries[j].state;
			
		}
		this.conn.send("ScreenData #" + sendData);
        for(i = 0; i < 10; i++){
            console.log("Running Example game loop #" +i);
            this.conn.send("Testing connection in game\nThis message sent from player " + this.playerNumber);
            this.gameResults.addPlayerOneScore(5);
            this.gameResults.addPlayerTwoScore(7);
        }
        if(this.gameResults.getPlayerOneScore() > this.gameResults.getPlayerTwoScore()){
            this.gameResults.setWinner(1);
        }
        else{
            this.gameResults.setWinner(2);
        }
        this.keepGoing = false;

        ///END EXAMPLE
    }

    this.resetDataRead = function(){
        this.conn.on('data', function (data) {
            console.log("Received data as: " + data);
        });
    }

    this.runGame = function(){
        console.log("Running Game" + this.gameName);
		init();
        while(this.keepGoing){
            this.gameLoop();
        }
        console.log("Ending Game " + this.gameName);
        this.resetDataRead();
        this.gameResults.setPlayerOneScore(76);
        return this.gameResults;
    }
 
	
}

        var scene;
        var scoreBoard;
        var score = 0;

        function init(){
            scoreBoard = document.getElementById("scoreBoard");
            scene = new Scene();
            scene.setBG("pink");
			scene.setSize(640,480);
		
            setUPPieces();
			
            scene.canvas.addEventListener('click', function(){
			   var tempx = scene.getMouseX();
			   var tempy = scene.getMouseY();
			   console.log(tempx + "," + tempy);
			   this.clickX = tempx;
			   this.clickY = tempy;
			   for(i = 0; i < 25; i++){
			      if(tempx >= pastries[i].x && tempx <= (pastries[i].x + pastries[i].width) && tempy <=(pastries[i].y + pastries[i].height) && tempy >= pastries[i].y){
		           console.log("middle");
                   console.log(pastries[i].selected);		   
		           pastries[i].selected = true;
		           console.log(i);	
	 	          }
		          else{
			         pastries[i].selected = false;
		          }
			   }
			}, false);
            scene.start();
        } 
        
	
        function update(){
            scene.clear();
			updateScore();
            var y = 50; 
			var x;
			for(j = 0; j < 25; j = j + 5){
			    y = y + 31;
				x = 46;
			    for(i = j; i < (5 + j); i++){
				   x = x + 30;
				   pastries[i].setPosition(x,y);
				   pastries[i].update();
				}  
				 
			}
			y = 50;
			for(j = 0; j < 25; j = j + 5){
			    y = y + 31;
				x = 200;
			    for(i = j; i < (5 + j); i++){
				   x = x + 30;
				   opponentBoard[i].setPosition(x,y);
				   opponentBoard[i].update();
				}  
				 
			}
			victoryCheck();
			for(m = 0; m < 25; m++){
			   pastries[m].checkKeys();
			 
			   if(pastries[m].move == "down"){
                  	if(m == 20){
				      temp = pastries[m];
					  pastries[m] = pastries[0];
					  pastries[0] = temp;
				   }
				   else if(m == 21){
				      temp = pastries[m];
					  pastries[m] = pastries[1];
					  pastries[1] = temp;
				   }
				   else if(m == 22){
				      temp = pastries[m];
					  pastries[m] = pastries[2];
					  pastries[2] = temp;
				   }
				   else if(m == 23){
				      temp = pastries[m];
					  pastries[m] = pastries[3];
					  pastries[3] = temp;
				   }
				   else if(m == 24){
				      temp = pastries[m];
					  pastries[m] = pastries[4];
					  pastries[4] = temp;
				   }
				   else{
				       temp = pastries[m];
					   pastries[m] = pastries[m+5];
					   pastries[m+5] = temp;
					   
				   }		   
			   }
			   if(pastries[m].move == "up"){
			       if(m == 0){
				      temp = pastries[m];
					  pastries[m] = pastries[20];
					  pastries[20] = temp;
				   }
				   else if(m == 1){
				      temp = pastries[m];
					  pastries[m] = pastries[21];
					  pastries[21] = temp;
				   }
				   else if(m == 2){
				      temp = pastries[m];
					  pastries[m] = pastries[22];
					  pastries[22] = temp;
				   }
				   else if(m == 3){
				      temp = pastries[m];
					  pastries[m] = pastries[23];
					  pastries[23] = temp;
				   }
				   else if(m == 4){
				      temp = pastries[m];
					  pastries[m] = pastries[24];
					  pastries[24] = temp;
				   }
				   else{
				       temp = pastries[m];
					   pastries[m] = pastries[m-5];
					   pastries[m-5] = temp;
					   
				   }
			   }
			   if(pastries[m].move == "left"){
			     if(m == 20){
				      temp = pastries[m];
					  pastries[m] = pastries[24];
					  pastries[24] = temp;
				   }
				   else if(m == 15){
				      temp = pastries[m];
					  pastries[m] = pastries[19];
					  pastries[19] = temp;
				   }
				   else if(m == 10){
				      temp = pastries[m];
					  pastries[m] = pastries[14];
					  pastries[14] = temp;
				   }
				   else if(m == 5){
				      temp = pastries[m];
					  pastries[m] = pastries[9];
					  pastries[9] = temp;
				   }
				   else if(m == 0){
				      temp = pastries[m];
					  pastries[m] = pastries[4];;
					  pastries[4] = temp;
				   }
				   else{
				       temp = pastries[m];
					   pastries[m] = pastries[m-1];
					   pastries[m-1] = temp;
					   
				   }
			   }
			   if(pastries[m].move == "right"){
			       if(m == 24){
				      temp = pastries[m];
					  pastries[m] = pastries[20];
					  pastries[20] = temp;
				   }
				   else if(m == 19){
				      temp = pastries[m];
					  pastries[m] = pastries[15];
					  pastries[15] = temp;
				   }
				   else if(m == 14){
				      temp = pastries[m];
					  pastries[m] = pastries[10];
					  pastries[10] = temp;
				   }
				   else if(m == 9){
				      temp = pastries[m];
					  pastries[m] = pastries[5];
					  pastries[5] = temp;
				   }
				   else if(m == 4){
				      temp = pastries[m];
					  pastries[m] = pastries[0];
					  pastries[0] = temp;
				   }
				   else{
				       temp = pastries[m];
					   pastries[m] = pastries[m+1];
					   pastries[m+1] = temp;
				   }
			     
			   }
			  
			 
			}
			
			victoryCheck();
        } 
	
	
	
	    function victoryCheck(){
		   
		   if(pastries[0].state == pastries[1].state && pastries[0].state == pastries[2].state){
		      
			  
		      if(pastries[0].state == pastries[4].state && pastries[0].state == pastries[3].state){
			    
			  score++;
			  console.log(score);
		      for(i = 0; i < 5; i++){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			  }
			}
		   }
		   else if(pastries[5].state == pastries[6].state && pastries[5].state == pastries[7].state && pastries[5].state == pastries[8].state && pastries[5].state == pastries[9].state){
		      score++;
			  console.log(score);
		      
			  for(i = 5; i < 11; i++){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			  }
		   }
		   else if(pastries[10].state == pastries[11].state && pastries[10].state == pastries[12].state && pastries[10].state == pastries[13].state && pastries[10].state == pastries[14].state){
		      console.log("victory");
			    score++;
			  console.log(score);
		      
			  for(i = 10; i < 16; i++){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			  }
		   }
		   else if(pastries[15].state == pastries[16].state && pastries[15].state == pastries[17].state && pastries[15].state == pastries[18].state && pastries[15].state == pastries[19].state){
		        score++;
			  console.log(score);
		      
			  for(i = 15; i < 20; i++){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			  }
		   }
		   else if(pastries[20].state == pastries[21].state && pastries[20].state== pastries[22].state && pastries[20].state == pastries[23].state && pastries[20].state  == pastries[24].state){
		      console.log("victory");
			    score++;
			  console.log(score);
		      
			  for(i = 20; i < 25; i++){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			  }
		   }
		   else if(pastries[0].state == pastries[5].state && pastries[0].state == pastries[10].state && pastries[0] == pastries[15].state && pastries[0] == pastries[20].state){
		      console.log("victory");
			  score++;
			  console.log(score);
			  for(i = 0; i < 25; i = i + 5){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			  }
			  
		   }
		   else if(pastries[1].state == pastries[6].state && pastries[1].state == pastries[11].state  && pastries[1].state == pastries[16].state && pastries[1].state == pastries[21].state){
		      console.log("victory");
			  score++;
			  console.log(score);
			   for(i = 1; i < 25; i = i + 5){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			  }
		   }
		   else if(pastries[2].state == pastries[7].state && pastries[2].state == pastries[12].state && pastries[2].state == pastries[17].state && pastries[2].state == pastries[22].state){
		      score++;
			  console.log(score);
		      for(i = 2; i < 25; i = i + 5){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			  }
		      console.log("victory");
		   }
		   else if(pastries[3].state == pastries[8].state && pastries[3].state == pastries[13].state && pastries[3].state == pastries[18].state && pastries[3].state  == pastries[23].state){
		       score++;
			  console.log(score);
		       for(i = 3; i < 25; i = i + 5){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			  }
		      console.log("victory");
		   }
		   else if(pastries[4].state == pastries[9].state && pastries[4].state== pastries[14].state && pastries[4].state == pastries[19].state && pastries[4].state == pastries[24].state){
		      console.log("victory");
			  score++;
			  console.log(score);
			   for(i = 4; i < 25; i = i + 5){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			  }
		   }
		
		}
   
		function setUPPieces(){
		    pastries = new Array(25);
			for(i = 0; i < 25; i++){
			  var img = Math.floor(Math.random() * 5) + 1;
			  if(img == 1){
                 pastries[i] = new Icon("Donut.png");
				 pastries[i].state = 1;
			  }
			  if(img == 2){
			     pastries[i] = new Icon("Pie.png");
				 pastries[i].state = 2;
			  }
			   if(img == 3){
			     pastries[i] = new Icon("cake.png");
				 pastries[i].state = 3;
			  }
			   if(img == 4){
			     pastries[i] = new Icon("bread.png");
				 pastries[i].state = 4;
			  }
			   if(img == 5){
			     pastries[i] = new Icon("palmier.png");
				 pastries[i].state = 5;
			  }
			}
		}
		
		function setUPOtherPlayer(numbers){
		   opponentBoard = new Array(25);
		   
		   for(i = 0; i < 25; i++){
			   var img = parseInt(numbers[i]);
		    if(img == 1){
                 opponentBoard[i] = new Icon("Donut.png");
				 opponentBoard[i].state = 1;
			  }
			  if(img == 2){
			     opponentBoard[i] = new Icon("Pie.png");
				 opponentBoard[i].state = 2;
			  }
			   if(img == 3){
			     opponentBoard[i] = new Icon("cake.png");
				 opponentBoard[i].state = 3;
			  }
			   if(img == 4){
			     opponentBoard[i] = new Icon("bread.png");
				 opponentBoard[i].state = 4;
			  }
			   if(img == 5){
			     opponentBoard[i]= new Icon("palmier.png");
				 opponentBoard[i].state = 5;
			  }
		   }
		}
    
	
        function updateScore(){
            scoreBoard.innerHTML = "Score " + score;
        }

function Icon(url){
    Ico = new Sprite(scene, url, 30, 30);
	this.selected = false;
	this.state = 0;
	this.width = Ico.width;
	this.height = Ico.height;
	this.x = Ico.x;
	this.y = Ico.y;
	this.url = url;
	Ico.setDX(0);
	Ico.setSelected = function(bool){
		this.selected = bool;
	}
    Ico.checkKeys = function(){
		if(this.selected == true){
			
			this.move = "none";
         if (keysDown[K_LEFT]){
			this.move = "left";
         } // end if
         if (keysDown[K_RIGHT]){
			this.move = "right";
         } // end if
         if (keysDown[K_UP]){
			this.move = "up";
         } // end if
         if (keysDown[K_DOWN]){
			this.move = "down";
         } // end if
		}
		else{
			this.move = "none";
		}
	}	
	
     // end checkKeys
    return Ico;
} // end setupFrog
