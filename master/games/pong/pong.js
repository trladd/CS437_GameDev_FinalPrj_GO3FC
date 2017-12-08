/**
 *Pong
 * 
 * Follow this guide when creating a minigame for this project. Here are a few things that you will have to complete to get your multiplayer game
 * working properly. 
 * -Set up data listeners. 
 * To set up, 
 * 
 */

function Pong(conn, playerNumber) {

    
    //Game Values - No change needed here
    this.CANVASWIDTH = 640;
    this.CANVASHEIGHT = 480;
    this.PADDLEHEIGHT = 50;
    this.PADDLEWIDTH = 20;
    this.BALLSIZE = 5;
    this.PADDLEPADDING
    this.playerNumber = playerNumber;
    this.pongPaddle1Y = this.CANVASHEIGHT / 2;
    this.pongPaddle2Y = this.CANVASHEIGHT / 2;
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.gameName = "Pong";
    this.ballX = this.CANVASHEIGHT / 2;
    this.ballY = this.CANVASHEIGHT / 2;
    this.ballDY = 5;
    this.ballDX = 1;

    this.playerTurn = 1;

    this.keepGoing = true;
    this.gameResults = new GameResult(0, 0, this.gameName);

    $("#upButton").click(function () {
        if (this.playerNumber == 1) {
                this.pongPaddle1Y += 3;
                alert(this.pongPaddle1Y);
            }
            else{
                this.pongPaddle2Y += 3;
            }
    });

    $("#downButton").click(function () {
        if (this.playerNumber == 1) {
            this.pongPaddle1Y -= 3;
            alert(pongPaddle1Y);
        }
        else{
            this.pongPaddle2Y -= 3;
        }
    });

    randomRGBColorString = function () {
        var outputString = 'rgb(';
        Math.floor(Math.random() * (256))
        outputString = outputString + Math.floor(Math.random() * (256));
        outputString = outputString + ',';
        outputString = outputString + Math.floor(Math.random() * (256));
        outputString = outputString + ',';
        outputString = outputString + Math.floor(Math.random() * (256));
        outputString = outputString + ')';
        return outputString;
    }

    /**
     * DRAW
     */
    drawCanvas = function (objDrawInfo) {
        console.log("drawing");
        var pongCanvas = document.getElementById('pongCanvas');
        var face = pongCanvas.getContext('2d');
        face.fillStyle = 'white';
        face.beginPath();
        face.clearRect(0, 0, objDrawInfo.CANVASWIDTH, objDrawInfo.CANVASHEIGHT);
        face.fillStyle = (randomRGBColorString());
        face.beginPath();
        face.fillRect(objDrawInfo.PADDLEPADDING, objDrawInfo.pongPaddle1Y - (objDrawInfo.PADDLEHEIGHT / 2), objDrawInfo.PADDLEWIDTH, objDrawInfo.PADDLEHEIGHT);
        face.fill();
        face.beginPath();
        face.fillRect(objDrawInfo.CANVASWIDTH - objDrawInfo.PADDLEPADDING, objDrawInfo.pongPaddle2Y - (objDrawInfo.PADDLEHEIGHT / 2), objDrawInfo.PADDLEWIDTH, objDrawInfo.PADDLEHEIGHT);
        face.fill();
        face.beginPath();
        face.ellipse(objDrawInfo.ballX,objDrawInfo.ballY, 20, 20, 0 * Math.PI *2, 0, 2 * Math.PI);
        face.fill();
        return "";
    }

    /**
     * Setting up Data Connection 
     * 
     * objDrawInfo conn.on statement is a method that will set up the data connectivity for this particular applicatioon. Be sure to use unique naming as 
     * this may carry outside of this game. This works by setting up a case statement for example 'thisCase' and then it will be called with a 
     * conn.send statement that sends an array where the first element is the data name so conn.send(["thisCase", DATA TO SEND HERE])
     */




    runGameFrame = function (runObj) {
        runObj.ballX += runObj.ballDX;
        runObj.ballY += runObj.ballDY;
        if (runObj.ballY < 0) {
            runObj.ballDY = runObj.ballDY * -1;
        }
        if (runObj.ballY > runObj.CANVASHEIGHT) {
            runObj.ballDY = runObj.ballDY * -1;
        }
        if (runObj.ballX < 0) {
            runObj.playerTwoScore++;
            runObj.ballX = runObj.CANVASWIDTH / 2;
            runObj.ballY = runObj.CANVASHEIGHT / 2;
            //player 2 point
        }
        if (runObj.ballX > runObj.CANVASWIDTH) {
            //player 1 point
            runObj.playerOneScore++;
            runObj.ballX = runObj.CANVASWIDTH / 2;
            runObj.ballY = runObj.CANVASHEIGHT / 2;
        }
        if (runObj.ballX >= runObj.CANVASWIDTH - 20 && runObj.ballY < runObj.pongPaddle2Y && runObj.pongPaddle2Y < runObj.ballY) {
            runObj.ballDX = runObj.ballDX * -1;
        }
        if (runObj.ballX <= 20 && runObj.ballY < runObj.pongPaddle1Y && runObj.pongPaddle1Y < runObj.ballY) {
            runObj.ballDX = runObj.ballDX * -1;
        }
        return runObj;
    }

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
        $("#game_pong").slideDown(); //Displays your HTML pane
        console.log("Running Game" + this.gameName);
        drawCanvas(this);
        if (this.playerNumber == 1) {
            setTimeout(
                conn.send(["pongSendData", this.pongPaddle1Y, this.pongPaddle2Y, this.ballDX, this.ballDY, this.ballX, this.ballY, this.playerOneScore, this.playerTwoScore]),
                2000
            );
        }


    }

    this.endGame = function () {
        console.log("Ending Game " + this.gameName);
        this.gameResults.setPlayerOneScore(76);
        $("#game_pong").slideUp();
        return this.gameResults;
    }


    conn.on('data', function (data) {
        console.log("Received to Game.js Datacontroller: " + data[0]);
        switch (data[0]) {
            //Various Cases for the first element of data being passed 

            case "pongSendData":
                console.log("Received general data for pong:\n" + data[1]);
                drawCanvas(this);
                this.pongPaddle1Y = data[1];
                this.pongPaddle2Y = data[2];
                this.ballDX = data[3];
                this.ballDY = data[4];
                this.ballX = data[5];
                this.ballY = data[6];
                this.ballX += this.ballDX;
                this.ballY += this.ballDY;
                if (this.ballY < 0) {
                    this.ballDY = this.ballDY * -1;
                }
                if (this.ballY > this.CANVASHEIGHT) {
                    this.ballDY = this.ballDY * -1;
                }
                if (this.ballX < 0) {
                    this.playerTwoScore++;
                    this.ballX = this.CANVASWIDTH / 2;
                    this.ballY = this.CANVASHEIGHT / 2;
                    this.ballDY = Math.floor(Math.random() * (10)) - 5;
                    this.ballDX = this.ballDX * -1;
                    //player 2 point
                }
                if (this.ballX > this.CANVASWIDTH) {
                    //player 1 point
                    this.playerOneScore++;
                    this.ballX = this.CANVASWIDTH / 2;
                    this.ballY = this.CANVASHEIGHT / 2;
                    this.ballDY = Math.floor(Math.random() * (10)) - 5;
                    this.ballDX = this.ballDX * -1;
                }
                if (this.ballX >= this.CANVASWIDTH - 20 && this.ballY < this.pongPaddle2Y && this.pongPaddle2Y < this.ballY) {
                    this.ballDX = this.ballDX * -1;
                    this.ballDY = Math.floor(Math.random() * (10)) - 5;
                }
                if (this.ballX <= 20 && this.ballY < this.pongPaddle1Y && this.pongPaddle1Y < this.ballY) {
                    this.ballDX = this.ballDX * -1;
                    this.ballDY = Math.floor(Math.random() * (10)) - 5;
                }
                drawCanvas(this);
                if (this.playerOneScore > 5 || this.playerTwoScore > 5) {
                    conn.send(["pongSendGameEnd"]);
                } else {
                    setTimeout(
                        conn.send(["pongSendData", this.pongPaddle1Y, this.pongPaddle2Y, this.ballDX, this.ballDY, this.ballX, this.ballY, this.playerOneScore, this.playerTwoScore]),
                        300
                    );
                }
                break;

            case "pongSendGameEnd":
                console.log("Received message stating end of pong game");
                break;
        }
    });
}