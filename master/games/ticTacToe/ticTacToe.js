/**
 * Tic Tac Toe
 * 
 * Follow this guide when creating a minigame for this project. Here are a few things that you will have to complete to get your multiplayer game
 * working properly. 
 * -Set up data listeners. 
 * To set up, 
 * 
 */

function TicTacToe(conn, playerNumber) {
    
        //Game Values - No change needed here
        this.conn = conn;
        this.playerNumber = playerNumber;
        this.gameName = "Tic Tac Toe";
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
            console.log("Received to ticTacToe.js Datacontroller: " + data[0]);
            switch (data[0]) {
                //Various Cases for the first element of data being passed 
                case "gamejsGeneralData":
                    console.log("Received general data for Tic Tac Toe:\n" + data[1]);
                    break;
            }
        });
    
    
        /**
         * Game Loop
         * 
         * This is where you will put your game loop code. You can treat this as a loop or you can work in here by implementing your own loop. 
         * Set the this.keepGoing != tru for the game loop to exit. Ensure that you either have been updating the game results object or that you 
         * update the game results object before the final return statement in this.runGame function
         */
        this.gameLoop = function () {
            for (i = 0; i < 10; i++) {
                console.log("Running Example game loop #" + i);
                this.gameResults.playerOneScore = 5;
                this.gameResults.playerTwoScore = 7;
            }
            if (this.gameResults.playerOneScore > this.gameResults.playerTwoScore) {
                this.gameResults.winner = 1;
            } else {
                this.gameResults.winner = 2;
            }
            this.keepGoing = false;
    
            ///END EXAMPLE
        }
    
    
        /**
         * This. Run Game
         * This method is what will be the driving force for this game file. This method is called by the main controller and it should be ensured
         * that the naming is not changed here. 
         */
        this.runGame = function () {
            $("#game_ticTacToe").slideDown(); //Displays your HTML pane
            console.log("Running Game" + this.gameName);
            while (this.keepGoing) {
                this.gameLoop();
            }
            console.log("Ending Game " + this.gameName);
            this.gameResults.setPlayerOneScore(76);
            $("#game_ticTacToe").slideUp();
            return this.gameResults;
        }
    }