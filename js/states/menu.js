Game.menuState = function(game) {

};

Game.menuState.prototype = {
    init:function(game) {
        var c = 0;
        levelLocked[0] = 2; //level 0 is unlocked (frames: 2 green (yes) and 1 red (no))
        for(c=0; c<level.length; c++) {
            levelLocked[c+1] = 2;
            levelScore[c] = 0;
        }
    },

    create:function(game) {
        imageManager.createImage(game, game.width / 2, game.height / 2, 'background', 0.45, 0.65, 0, false);
        textManager.createText(game, game.width / 2, game.height / 4, "Welcome to my version \nof Super Mario", colors.white, false);

        playB = buttonManager.createButton(game,"Play", true, game.width / 3, (game.height / 2)+10, menuButtonSize.width, menuButtonSize.height, function() {
            buttonManager.buttonState(game, max_level, 'play');
        }, buttonFrame.menu_button, 0.85, false);
        
        levelsB = buttonManager.createButton(game, "Levels", true, 2.7*game.width / 4, (game.height / 2)+10, menuButtonSize.width, menuButtonSize.height, function() {
            buttonManager.buttonState(game, 0, 'choose_level');
        }, buttonFrame.menu_button, 0.85, false);
       
        helpB = buttonManager.createButton(game, "Help", true, game.width / 3, (game.height / 2) + 50, menuButtonSize.width, menuButtonSize.height, function() {
            buttonManager.buttonState(game, 0, 'help');
        }, buttonFrame.menu_button, 0.85, false);

        settingsB = buttonManager.createButton(game, "Settings", true, 2.7*game.width / 4, (game.height / 2) + 50, menuButtonSize.width, menuButtonSize.height, function() {
            buttonManager.buttonState(game, 0, 'settings');
        }, buttonFrame.menu_button, 0.85, false);

        //if you find where me is then change it
        textManager.createText(game, game.width - 26, game.height - 5, me, colors.white, false);

        levelManager.makeDificulty(game);
    } 
};
