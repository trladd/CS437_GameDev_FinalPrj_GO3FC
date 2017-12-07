var current_height;
var lowest_height;
var min_height;
var gameText;

function loadGame() //loads the game
{


    drawPlatforms();
}

var hyperjumper = {
    forwardMotion: 0,
    currentHeight: -40,
    highestHeight: -40,
    leftPosition: 160,
    leftAcceleration: 0,
    descending: false,
    initialize: function () {
        $("start").href = "javascript:return false;";
        hyperjumper = new Element('div', {
            'id': 'jumper'
        });
        score = $("score");
        jumper.inject(gameText);
        moojumper.jump();
        
    } 
