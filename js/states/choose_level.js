Game.choose_levelState = function(game) {
    
};

Game.choose_levelState.prototype = {
    create:function(game) {
        currentLevel = -1;
        imageManager.createImage(game, game.width / 2, game.height / 2, 'menuBackground', 0.15, 0.15, 0, false);

        textManager.createText(game, game.width/2, 10, "Levels", colors.white, false);

        backB = buttonManager.createButton(game, "back", true, 18, 10, 30, 20, function() {
            buttonManager.buttonState(game, max_level, 'menu');
        }, buttonFrame.menu_button, 0.85, false);

        level_zero_B = buttonManager.createButton(game, "0", false, 40, 40, levelButtonSize.width, levelButtonSize.height, function() {
            soundManager.playSound(game, clickS);
            currentLevel = levelManager.checkLevelAvailability(game, 0, levelLocked[0]);
        }, levelLocked[0], 0.85, false);

        level_one_B = buttonManager.createButton(game, "1", false, 80, 40, levelButtonSize.width, levelButtonSize.height, function() {
            soundManager.playSound(game, clickS);
            currentLevel = levelManager.checkLevelAvailability(game, 1, levelLocked[1]);
        }, levelLocked[1], 0.85, false);
        
        level_two_B = buttonManager.createButton(game, "2", false, 120, 40, levelButtonSize.width, levelButtonSize.height, function() {
            soundManager.playSound(game, clickS);
            currentLevel = levelManager.checkLevelAvailability(game, 2, levelLocked[2]);
        }, levelLocked[2], 0.85, false);

        level_three_B = buttonManager.createButton(game, "3", false, 160, 40, levelButtonSize.width, levelButtonSize.height, function() {
            soundManager.playSound(game, clickS);
            currentLevel = levelManager.checkLevelAvailability(game, 3, levelLocked[3]);
        }, levelLocked[3], 0.85, false);
        
        playB = buttonManager.createButton(game, "play", true, game.width - 18, 10, 30, 20, function() {
            buttonManager.buttonState(game, currentLevel, 'play');
        }, buttonFrame.menu_button, 0.85, false);

        levelManager.makeDificulty(game);
    }
};
