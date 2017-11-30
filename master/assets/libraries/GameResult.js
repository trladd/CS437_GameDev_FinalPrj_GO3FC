/**
 * Template game result file
 * 
 * This file will hold a class that will be common and returned in all game returns
 * The reason for having a common return type is so that all complexities of the games
 * are handled within the games themselves and the controller can treat all of the games
 * the same. 
 * 
 * For the most part, these simple outputs are all that we need for the main controller to 
 * be able to interpret the results of a game. This object will be created, worked on throughout
 * the game lifecycle as the developer wishes. The important part is that it gets passed back to
 * the controller. 
 * 
 * **** Methods ****
 * setValues(p1score, p2score, name, winner)
 * getPlayerOneScore()
 * getPlayerTwoScore()
 * getGameName()
 * getWinner()
 * setPlayerOneScore(newScore)
 * setPlayerTwoScore(newScore)
 * addPlayerOneScore(addition)
 * addPlayerTwoScore(addition)
 */

 function GameResult(p1score, p2score, name){
     this.playerOneScore = p1score;
     this.playerTwoScore = p2score;
     this.gameName = name;
     this.winner = -1;

     this.setValues = function(p1score, p2score, name, winner){
        this.playerOneScore = p1score;
        this.playerTwoScore = p2score;
        this.gameName = name;
        this.winner = winner;
     }

     this.getPlayerOneScore = function(){
         return this.playerOneScore;
     }

     this.getPlayerTwoScore = function(){
         return this.playerTwoScore;
     }

     this.getGameName = function(){
         return this.gameName;
     }

     this.getWinner = function(){
         return this.winner;
     }

     this.setGameName = function(newName){
         this.gameName = newName;
     }

     this.setWinner = function(newWinner){
         this.winner = newWinner;
     }

     this.setPlayerOneScore = function(newScore){
         this.playerOneScore = newScore;
     }

     this.addPlayerOneScore = function(addition){
         this.playerOneScore += addition;
     }

     this.setPlayerTwoScore = function(newScore){
         this.playerTwoScore = newScore;
     }

     this.addPlayerTwoScore = function(addition){
         this.playerTwoScore = addition
     }


 }