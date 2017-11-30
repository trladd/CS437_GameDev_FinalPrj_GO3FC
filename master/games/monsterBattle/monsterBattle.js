/**
 * Template Game File
 * 
 * Follow this guide when creating a minigame for this project. 
 * 
 */

 function MonsterBattle(conn, playerNumber){

    //Game Values
    this.conn = conn;
    this.playerNumber = playerNumber;
    this.gameName = "Monster Battle";
    this.keepGoing = true;
    this.gameResults = new GameResult(0,0,this.gameName);

    //Sets up what will happen when data is received
    conn.on('data', function (data) {
        console.log('Received Exmaple Game Data: ', data);
    });


    this.gameLoop = function(){
        //This is where you will put your game loop code
        //Set this.keepGoing != true for the game loop to exit
        //Ensure that you either have been updating the game results object
        //or that you update the game results object before the final return 
        //statement in this.runGame function
        //BEGIN EXAMPLE
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
        while(this.keepGoing){
            this.gameLoop();
        }
        console.log("Ending Game " + this.gameName);
        this.resetDataRead();
        this.gameResults.setPlayerOneScore(76);
        return this.gameResults;
    }
 }