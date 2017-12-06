Game.next_levelState = function(game) {

};

//used as next level, unlock level and game over state
Game.next_levelState.prototype = {
    create:function(game) {
        imageManager.createImage(game, game.width/2, game.height/2, 'menuBackground', 0.15, 0.15, 0, false);
        
        levelScore[currentLevel] = score;   //update score for previous level
        currentLevel++                      //next level

        if(currentLevel <= finishLevel) {
            levelLocked[currentLevel] = 2;  //unlock next level
/*
            if(currentLevel != finishLevel+1 && gameOver == false) {
                continueB = buttonManager.createButton(game, "continue", true, game.width-28, 11, 55, 20, function() {
                    checkF = false;
                    buttonManager.buttonState(game, currentLevel, 'play');
                    //buttonManager.buttonState(game, currentLevel, 'boot_menu');
                }, buttonFrame.menu_button, 0.85, false);
            }
*/
            max_level = currentLevel;
            levelManager.updateDificulty(game);
        }

        playerStatsManager.printOveralStats(game, currentLifes, score, currentLevel, finishLevel);

        backB = buttonManager.createButton(game, "back", true, 18, 10, 30, 20, function() {
            buttonManager.buttonState(game, max_level, 'boot_menu');
        }, buttonFrame.menu_button, 0.85, false);
    }
};
