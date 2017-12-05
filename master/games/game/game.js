/**
 * Template Game File
 * 
 * Follow this guide when creating a minigame for this project. 
 * 
 */

function MiniGameName(conn, playerNumber) {

    //Game Values
    this.conn = conn;
    this.playerNumber = playerNumber;
    this.gameName = "Mini Game Name";
    this.keepGoing = true;
    this.gameResults = new GameResult(0, 0, this.gameName);

    //Sets up what will happen when data is received
    conn.on('data', function (data) {
        console.log("Received to Game.js Datacontroller: " + data[0]);
        switch (data[0]) {
            //Various Cases for the first element of data being passed 
            case "#sendID_1":
                console.log("Interpreted received data as #send_id");
                break;

            case "gamejsGeneralData":
                console.log("Received general data for gamejs:\n" + data[1]);
                break;
        }
    });



    this.gameLoop = function () {
        //This is where you will put your game loop code
        //Set this.keepGoing != true for the game loop to exit
        //Ensure that you either have been updating the game results object
        //or that you update the game results object before the final return 
        //statement in this.runGame function
        //BEGIN EXAMPLE
        for (i = 0; i < 10; i++) {
            console.log("Running Example game loop #" + i);
            this.gameResults.playerOneScore += 5;
            this.gameResults.playerTwoScore += 7;
        }
        if (this.gameResults.playerOneScore > this.gameResults.playerTwoScore) {
            this.gameResults.winner = 1;
        } else {
            this.gameResults.winner = 2;
        }
        this.keepGoing = false;

        ///END EXAMPLE
    }

    this.runGame = function () {
        console.log("Running Game" + this.gameName);
        while (this.keepGoing) {
            this.gameLoop();
        }
        console.log("Ending Game " + this.gameName);
        this.gameResults.setPlayerOneScore(76);
        return this.gameResults;
    }
}