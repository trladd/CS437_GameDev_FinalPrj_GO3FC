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
    this.isTurn = false;
    this.winningPlayer = -1;
    this.playerTurn = 1;

    this.gameBoard = new Array(3);
    for (var i = 0; i < 3; i++) {
        this.gameBoard[i] = new Array(3);
        for (var x = 0; x < 3; x++) {
            this.gameBoard[i][x] = 0;
        }
    }

    //Player 1 will be given first turn. 




    /**
     * runClick
     * Handles what happens when a player clicks on a square area
     */
    runClick = function (xCoord, yCoord, obj) {
        console.log("Turn" + obj.isTurn);
        if (obj.isTurn == true && obj.gameBoard[xCoord][yCoord]) {

            obj.isTurn = false;
            obj.gameBoard[xCoord, yCoord] = obj.playerNumber;
            conn.send(["ticTacToe_makeTurn", xCoord, yCoord, obj.playerNumber]);
        } else {
            console.log("Player " + obj.playerNumber + " has attempted to play off their turn");
        }
    }

    this.displayChange = function () {
        if (this.gameBoard[1][1] > 0) {
            $("#game_ticTacToe_11").text(this.gameBoard[1][1]);
        } else {
            $("#game_ticTacToe_11").text(this.gameBoard[1][1]);
        }
        if (this.gameBoard[1][2] > 0) {
            $("#game_ticTacToe_12").text(this.gameBoard[1][2]);
        } else {
            $("#game_ticTacToe_12").text(this.gameBoard[1][3]);
        }
        if (this.gameBoard[1][3] > 0) {
            $("#game_ticTacToe_13").text(this.gameBoard[1][3]);
        } else {
            $("#game_ticTacToe_13").text(this.gameBoard[1][3]);
        }
        if (this.gameBoard[2][1] > 0) {
            $("#game_ticTacToe_21").text(this.gameBoard[2][1]);
        } else {
            $("#game_ticTacToe_21").text(this.gameBoard[2][1]);
        }
        if (this.gameBoard[2][2] > 0) {
            $("#game_ticTacToe_22").text(this.gameBoard[2][2]);
        } else {
            $("#game_ticTacToe_22").text(this.gameBoard[2][2]);
        }
        if (this.gameBoard[2][3] > 0) {
            $("#game_ticTacToe_23").text(this.gameBoard[2][3]);
        } else {
            $("#game_ticTacToe_23").text(this.gameBoard[2][3]);
        }
        if (this.gameBoard[3][1] > 0) {
            $("#game_ticTacToe_31").text(this.gameBoard[3][1]);
        } else {
            $("#game_ticTacToe_31").text(this.gameBoard[3][1]);
        }
        if (this.gameBoard[3][2] > 0) {
            $("#game_ticTacToe_32").text(this.gameBoard[3][2]);
        } else {
            $("#game_ticTacToe_32").text(this.gameBoard[3][2]);
        }
        if (this.gameBoard[3][3] > 0) {
            $("#game_ticTacToe_33").text(this.gameBoard[3][3]);
        } else {
            $("#game_ticTacToe_33").text(this.gameBoard[3][3]);
        }
    }

    /**
     * Calculate Win
     */
    this.calculateWin = function (newX, newY) {
        var winningPlayer = -1;
        //Check Vertical
        if (this.gameBoard[1][newY] == this.gameBoard[2][newY] && this.gameBoard[2][newY] == this.gameBoard[3][newY]) {
            if (this.gameBoard[1][newY] > 0) {
                winningPlayer = this.gameBoard[1][newY];
            }
        }
        //Check Horizontal
        if (this.gameBoard[newX][1] == this.gameBoard[newX][2] && this.gameBoard[newX][2] == this.gameBoard[newX][3]) {
            if (this.gameBoard[newX][1] > 0) {
                winningPlayer = this.gameBoard[newX][1];
            }
        }
        //Check Diagonal
        if (this.gameBoard[1][1] == this.gameBoard[2][2] && this.gameBoard[2][2] == this.gameBoard[3][3]) {
            if (this.gameBoard[2][2] > 0) {
                winningPlayer = this.gameBoard[2][2];
            }
        }
        if (this.gameBoard[1][3] == this.gameBoard[2][2] && this.gameBoard[2][2] == this.gameBoard[3][1]) {
            if (this.gameBoard[2][2] > 0) {
                winningPlayer = this.gameBoard[2][2];
            }
        }
        if (winningPlayer != -1) {
            alert("Player " + this.playerNumber + " has won Tic-Tac-Toe");
            this.endGame();
        }
        return winningPlayer;
    }



    /**
     * This. Run Game
     * This method is what will be the driving force for this game file. This method is called by the main controller and it should be ensured
     * that the naming is not changed here. 
     */
    this.runGame = function () {
        if (this.playerNumber == 1) {
            this.isTurn = true;
        }
        $("#game_ticTacToe").slideDown(); //Displays your HTML pane
        console.log("Running Game " + this.gameName);
        console.log("Turn" + this.isTurn);


    }

    //Returns end game signal
    this.endGame = function () {
        $("#game_ticTacToe").slideUp();
        returnGameResults(this.gameResults);
    }

    $("#game_ticTacToe_11").click(function () {
        runClick(1, 1, this)
    });
    $("#game_ticTacToe_12").click(function () {
        runClick(1, 2, this)
    });
    $("#game_ticTacToe_13").click(function () {
        runClick(1, 3, this)
    });
    $("#game_ticTacToe_21").click(function () {
        runClick(2, 1, this)
    });
    $("#game_ticTacToe_22").click(function () {
        runClick(2, 2, this)
    });
    $("#game_ticTacToe_23").click(function () {
        runClick(2, 3, this)
    });
    $("#game_ticTacToe_31").click(function () {
        runClick(3, 1, this)
    });
    $("#game_ticTacToe_32").click(function () {
        runClick(3, 2, this)
    });
    $("#game_ticTacToe_33").click(function () {
        runClick(3, 3, this)
    });


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
            case "ticTacToe_makeTurn":
                console.log("Received other player's turn:\n" + data[1]);
                this.gameBoard[xCoord, yCoord] = data[3];
                this.calculateWin();
                break;
        }
    });
}