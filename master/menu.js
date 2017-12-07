/**Menu.js
 * 
 * The menu for this application serves as a controller which will connect two players and then route them 
 * to their games during a session. 
 * 
 * 
 * Testing Notes: To test a particular application, simply change the minigames array to only include the name
 * of the game that you would like to test. Alternatively, if you game doesn't seem to be running, ensure
 * that it is in the game array and aslo that there is a case for it in the run mini game method
 */

$(document).ready(function () {
    //Initial Jquery Statements to hide needed divs
    $("#startGame").hide();
    $("#pleaseWait").hide();
    $("#waitingPeers").hide();
    $("#game_compBlock").hide();
    $("#game_game").hide();
    $("#game_monsterBattle").hide();
    $("#game_pastryPanic").hide();
    $("#game_pong").hide();
    $("#game_runningMan").hide();
    $("#game_ticTacToe").hide();
    $("#game_virtualDDR").hide();
    $("#game_miniGolf").hide();

    var roundKeeper = 0;
    var gameRounds = 2;
    //var miniGames = ["TicTacToe", "Pong", "Game", "CompBlock", "MiniGolf", "MonsterBattle", "PastryPanic",
    //"RunningMan", "VirtualDDR"
    //];
    var miniGames = ["Pong","TicTacToe"];
    var globalConn;

    //Define click events for clicking button to join Game
    $("#nzupjvjyjnx3l3di1").click(function () {
        createRoom("nzupjvjyjnx3l3di");
    });
    $("#qtel6mk2t1chm2t91").click(function () {
        createRoom("qtel6mk2t1chm2t9");
    });
    $("#fq6a4niiuzkhuxr1").click(function () {
        createRoom("fq6a4niiuzkhuxr");
    });
    $("#jml9r8bsz1714i1").click(function () {
        createRoom("jml9r8bsz1714i");
    });
    $("#fuszgluehi8p8pvi1").click(function () {
        createRoom("fuszgluehi8p8pvi");
    });
    $("#dvy4sjbvks79o1or1").click(function () {
        createRoom("dvy4sjbvks79o1or");
    });
    $("#gx8uncxet3s1yvi1").click(function () {
        createRoom("gx8uncxet3s1yvi");
    });
    $("#l0wew8sguzo205291").click(function () {
        createRoom("l0wew8sguzo20529");
    });
    $("#nzupjvjyjnx3l3di2").click(function () {
        joinRoom("nzupjvjyjnx3l3di");
    });
    $("#qtel6mk2t1chm2t92").click(function () {
        joinRoom("qtel6mk2t1chm2t9");
    });
    $("#fq6a4niiuzkhuxr2").click(function () {
        joinRoom("fq6a4niiuzkhuxr");
    });
    $("#jml9r8bsz1714i2").click(function () {
        joinRoom("jml9r8bsz1714i");
    });
    $("#fuszgluehi8p8pvi2").click(function () {
        joinRoom("fuszgluehi8p8pvi");
    });
    $("#dvy4sjbvks79o1or2").click(function () {
        joinRoom("dvy4sjbvks79o1or");
    });
    $("#gx8uncxet3s1yvi2").click(function () {
        joinRoom("gx8uncxet3s1yvi");
    });
    $("#l0wew8sguzo205292").click(function () {
        joinRoom("l0wew8sguzo20529");
    });

    /**Setup Connections
     * This method will handle setting up the connection object to run the required data receiving methods. This will require 
     * a common method of transmitting data across the project. To setup a data receiver, add a conn.on method or add to this
     * method that will work to receive an array of two objects (standard), or more objects (nonstandard). The important
     * part here is that data is sent as an array. The first array entry should be a string identifier for what the programmer
     * wants to happen when that data is received. Otherwise, setting up more than one data connection would duplicate and perform
     * more than the desired actions
     * 
     * Data connection format
     * 		data >>> ["String Identifier for Case break", DATAOBJECT_SENT]
     * 
     */
    function setupConn(conn) {
        var miniGameResults = new Array(50);
        //for (i = 0; i < 50; i++) {
        //	miniGameResults[i] = new GameResult(0, 0, "");
        //}
        conn.on('data', function (data) {
            console.log("Received to Datacontroller: " + data[0]);
            switch (data[0]) {
                //Various Cases for the first element of data being passed 
                case "#sendID_1":
                    console.log("Interpreted received data as #send_id");
                    break;

                    //Run game signal to player 2
                case "#sendID_p1startGametop2":
                    conn.send("Player 2 Listener received message to run game");
                    $("#pleaseWait").slideUp();
                    
                    break;

                    //TestData - used to demonstrate the functionality of this
                case "#test1":
                    alert("Test has been completed");
                    console.log("This is a test function and signals that a test connection has been attempted");
                    console.log(data[1]);
                    break;

                    //Used to listen on the player 2 side. Player one will call this data connection to signal the beginning
                    //of a new game. Player two will receive this and run that game. Note that the sync process will be ran
                    //in the beginning of the game. 

                case "runP2game":
                    console.log("Player 2 listener has received a request to run a game " + data[1]);
                    $("#pleaseWait").slideUp();
                    runMiniGame(data[1], globalConn, miniGameResults);
                    //miniGameResults[i] = runMiniGame(data[1], conn);
                    break;


                    //This will signal the end of the game sequence to player 2. Player one will pass the existing game 
                    //results data to player 2;
                case "signalP2end":
                    console.log("A signal has been received to end the game sequence");
                    //displayResults(miniGameResults);
                    break;


                    //End the current minigame to move on to other minigame or menu
                case "signalP2gameOver":
                    console.log("A signal has been received to end the current minigame");
                    break;

                    //Signal from player 2 to player one which will send a welcome message initiating the game 
                case "signalP1connected":
                    console.log("A message has been received from a joined player showing successful connection...\n" + data[1]);
                    $("#startGame").slideDown();
                    $("#startGame").click(function () {
                        $("#startGame").slideUp();
                        runGameAsHost(3, conn);
                    });
                    break;

                default:
                    console.error(
                        "Data was sent to the data controller via conn.send, but there was no case setup to handle the data array identifier for data[0]. Ensure that you are sending data via an array where data[0] is a string identifier that has been defined in a data controller which will direct the data flow. "
                    );
                    console.error("Unhandled data[0] data: " + data[0]);
                    console.error("Unhandled data: " + data);
            }

        });
        return conn;
    }


    /**
     * Run Minigame abstracts out the work of how to handle running a mini game. When minigames are created to follow the given format that has been layed out, 
     * they will work seemlessly by simply adding them to the minigame string array and then adding a case statement here. After that, they will be up for random
     * selection and will be playable. 
     * Please make sure that the naming stays consistent here and that the game is designed such that it returns a game result object, and is called via a .runGame()
     * 
     * @param {*} gameName 
     * @param {*} conn 
     * @param {*} miniGameResult 
     */
    function runMiniGame(gameName, conn, miniGameResult) {
        console.log("Searching to link game: " + gameName);
        miniGameResult = new GameResult(0, 0, "");
        switch (gameName) {
            case "TicTacToe":
                newGame = new TicTacToe(conn, playerNumber);
                miniGameResult = newGame.runGame();
                break;
            case "Pong":
                newGame = new Pong(conn, playerNumber);
                miniGameResult = newGame.runGame();
                break;
            case "Game":
                newGame = new MiniGameName(conn, playerNumber);
                miniGameResult = newGame.runGame();
                break;
            case "CompBlock":
                newGame = new CompBlock(conn, playerNumber);
                miniGameResult = newGame.runGame();
                break;
            case "MiniGolf":
                newGame = new MiniGolf(conn, playerNumber);
                miniGameResult = newGame.runGame();
                break;
            case "MonsterBattle":
                newGame = new MonsterBattle(conn, playerNumber);
                miniGameResult = newGame.runGame();
                break;
            case "PastryPanic":
                newGame = new PastryPanic(conn, playerNumber);
                miniGameResult = newGame.runGame();
                break;
            case "RunningMan":
                newGame = new RunningMan(conn, playerNumber);
                miniGameResult = newGame.runGame();
                break;
            case "VirtualDDR":
                newGame = new VirtualDDR(conn, playerNumber);
                miniGameResult = newGame.runGame();
                break;
        }
        return miniGameResult;
    }



    /**
     * Join room must be completed after a room as already been created by player 1. Player one will then be
     * joined by a player who chooses to join the same game room as player 2. 
     */
    function joinRoom(apiKey) {
        this.connection;

        console.log("Attempting to join room " + apiKey);
        var connectedRoom = false;
        peer = new Peer({
            key: apiKey
        });

        peer.on("open", function (id) {
            pid = id;
        });
        conn = peer.connect(apiKey);
        conn.on("open", function () {
            $("#pleaseWait").slideDown();
            $("#gameTable").slideUp();
            console.log("Initiated Connection");
            globalConn = conn;
            conn.send(["signalP1connected", "I'm here and ready to play now"]);
            this.connection = conn;
            connected = true;
            playerNumber = 2;
            conn = setupConn(conn);
        });

    }

    /**
     * Create Room
     * This is triggered by player 1 craeting a room in the main menu. It will then listen for a player 2 joining
     * which is determined by the code above. 
     * 
     * @param {*} apiKey 
     */
    function createRoom(apiKey) {
        $("#gameTable").slideUp();
        $("#waitingPeers").slideDown();
        console.log("Creating room " + apiKey);
        var timeOut;

        peer = new Peer(apiKey, {
            key: apiKey
        });
        console.log("Waiting for connection");
        peer.on("connection", function (conn) {
            conn = setupConn(conn);
            globalConn = conn;
            //Listening on 'signalP1connected'
            playerNumber = 1;
            console.log("Received Connection");
        });

    }


    //Simple method to show the results of the result array in an alert. This can be modified in the future to make it better. 
    function displayResults(miniGameResults) {
        console.log("GAME OVER!");
        var outString = "End of Game Summary\n";
        for (i = 0; i < miniGameResults.length; i++) {
            outString += miniGameResults.toString();
        }
        alert(outString);
    }

    /**Determine Game
     * This works to randomly choose a game that has not already been chosen. 
     * 
     * @param {*} miniGames 
     */
    function determineGame(miniGames) {
        var chosenGame = 0;
        var validGame = false;
        while (validGame == false) {
            validGame = false;
            chosenGame = Math.floor(Math.random() * miniGames.length);
            var initialChosen = chosenGame;
            while (validGame == false) {
                if (miniGames[chosenGame] != "USEDGAME") {
                    validGame = true;

                } else {

                    if (chosenGame >= miniGames.length) {
                        chosenGame = 0;
                    } else if (chosenGame = initialChosen) {
                        return -1;
                    }
                    chosenGame++;
                }
            }
        }
        console.log("Chose Game Number: " + chosenGame);
        return chosenGame;
    }

    function miniGameReturnAction(gmRs) {
        miniGameResults[roundKeeper] = gmRs;
        runGameRound();
    }

    function endGames() {
        globalConn.send(["signalP2end", ""]);
        displayResults(miniGameResults);
    }

    function runGameRound() {
        console.log("Running Game Controller as host Round: " + i);
        chosenGame = determineGame(miniGames)


        if (chosenGame != -1) {
            console.log("Sharing chosen game with peer");
            globalConn.send(["runP2game", miniGames[chosenGame]]);
            alert("test");
            runMiniGame(miniGames[chosenGame], globalConn);
            miniGames[chosenGame] = "USEDGAME";
        } else if (i >= gameRounds) {
            endGames();
        } else {
            endGames();
        }
    }
    /**Run Game as host
     * 
     * This method may be thought to be the main method of the game. This works by running player one as a server
     * and constantly serving the second player with information seperately. The core processing is done on the player
     * 1 machine. 
     * 
     * @param {*} numberRounds 
     * @param {*} conn 
     */
    function runGameAsHost(numberRounds, conn) {
        //var miniGames = ["TicTacToe", "Pong", "Game", "CompBlock", "MiniGolf", "MonsterBattle", "PastryPanic",
        //"RunningMan", "VirtualDDR"
        //];
        var miniGames = ["TicTacToe"];
        //var miniGames = ["Game"];
        var miniGameResults = new Array(miniGames.length);
        for (i = 0; i < miniGames.length; i++) {
            miniGameResults[i] = new GameResult(0, 0, "");
        }
        var playerNumber = -1;
        var keepGoing = true;
        var roundKeeper = 0;
        var maxRounds = miniGames.length;
        var keepGoing = true;
        var chosenGame = 0;
        runGameRound();

    }

});