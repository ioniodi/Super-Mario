var playerStatsManager = new Object();

var say;

playerStatsManager.printOveralStats = function(game, lives, score, level, numOfLevels) {
    textManager.createText(game, game.width/2, 24, 'Your stats \n', colors.orange, false);
    //say = 'Congrats you have unlocked level: ' +level;
    if (level > numOfLevels || gameOver == true) {
        //say = 'End of game';
    }
    score = playerStatsManager.currentOveralScore(game, levelScore);
    textManager.createText(game, game.width/2,  game.height/2, '\n' +say +'\nlives: ' +lives +'\nscore: ' +score +'\n' +'\n', colors.white, false);
};

playerStatsManager.currentOveralScore = function(game, scoresArray) {
    var i = 0;
    var result = 0;
    for(i = 0; i < scoresArray.length; i++) {
        result = result + scoresArray[i];
    }
    return result;
};
