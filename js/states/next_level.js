Game.next_levelState = function(game) {

};

//used as next level, unlock level and game over state
Game.next_levelState.prototype = {
    create:function(game) {
        imageManager.createImage(game, game.width/2, game.height/2, 'background', 0.45, 0.65, 0, false);

        currentLevel++;
        levelLocked[currentLevel] = 2;
        levelScore[currentLevel] = 0;
        levelScore[currentLevel] = score;

        if(currentLevel <= finishLevel && gameOver == false) {
            buttonManager.createButton(game, "continue", true, game.width-28, 11, 55, 20, function() {
                checkF = false;
                buttonManager.buttonState(game, currentLevel, 'play');
            }, buttonFrame.menu_button, 0.85, false);
        }
        
        max_level = currentLevel;

        levelManager.updateDificulty(game);

        playerStatsManager.printOveralStats(game, currentLifes, score, currentLevel, finishLevel);

        buttonManager.createButton(game, "back", true, 18, 10, 30, 20, function() {
            buttonManager.buttonState(game, max_level, 'boot_menu');
        }, buttonFrame.menu_button, 0.85, false);
    }
};
