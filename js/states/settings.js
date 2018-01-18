Game.settingsState = function(game) {
    
};

Game.settingsState.prototype = {
    create:function(game) {
        imageManager.createImage(game, game.width / 2, game.height / 2, 'menuBackground', 0.15, 0.15, 0, false);

        textManager.createText(game, game.width/2, 10, "Settings", colors.white, false);

        backB = buttonManager.createButton(game, "back", true, 18, 10, 30, 20, function() {
            buttonManager.buttonState(game, max_level, 'menu');
        }, buttonFrame.menu_button, 0.85, false);

        mute_text = textManager.createText(game, (game.width/2) + 30, 52, mute, colors.red, false);
        muteB = buttonManager.createButton(game, "mute:", true, game.width/2, 50, menuButtonSize.width - 40, menuButtonSize.height - 12, function() {
            clickS.play();
            mute_state = soundManager.soundControl(game);
            isMuteBPressed = true;
        }, buttonFrame.menu_button, 0.85, false);

        dificulty_text = textManager.createText(game, (game.width/2) + 57, (game.height/2) - 18, dificulty, colors.white, false);
        isDificultyBPressed = false;
        dificultyB = buttonManager.createButton(game, "Difficulty:", true, game.width/2, (game.height/2) - 20, menuButtonSize.width - 15, 20, function() {
            soundManager.playSound(game, clickS);

            if(isDificultyBPressed == false) {
                isDificultyBPressed = true;
                
                normalB = buttonManager.createButton(game, "normal", true, (game.width/2) - 50, game.height/2, menuButtonSize.width - 30, 20, function() {
                    soundManager.playSound(game, clickS);
                    dificulty = "normal";
                    isDificultyPressed = true;
                }, buttonFrame.menu_button, 0.85, false);
                hardB = buttonManager.createButton(game, "hard", true, game.width/2, game.height/2, menuButtonSize.width - 30, 20, function() {
                    soundManager.playSound(game, clickS);
                    dificulty = "hard";
                    isDificultyPressed = true;
                }, buttonFrame.menu_button, 0.85, false);
                survivalB = buttonManager.createButton(game, "survival", true, (game.width/2) + 50, game.height/2, menuButtonSize.width - 30, 20, function() {
                    soundManager.playSound(game, clickS);
                    dificulty = "survival";
                    isDificultyPressed = true;
                }, buttonFrame.menu_button, 0.85, false);
            }
            else {}
        }, buttonFrame.menu_button, 0.85, false);
/*
        selectSpriteB = buttonManager.createButton(game, "Sprites", true, game.width/2, (game.height/2) + 45, menuButtonSize.width - 15, 20, function() {
            soundManager.playSound(game, clickS);
        }, buttonFrame.menu_button, 0.85, false);
*/
    },

    update:function(game) {
        if(isDificultyPressed == true) {
            dificulty_text.visible = false;
            dificulty_text = textManager.createText(game, (game.width/2) + 57, (game.height/2) - 18, dificulty, colors.white, false);
            isDificultyPressed = false;
        }
        else {}

        if(isMuteBPressed == true) {
            mute_text.visible = false;
            mute_text = textManager.createText(game, (game.width/2) + 30, 52, mute_state, colors.red, false);
            isMuteBPressed = false;
        }
        else {}

        this.unlockCommands(game);
    },

    unlockCommands:function(game) {
        if(game.input.keyboard.isDown(Phaser.KeyCode.L)) {
            levelManager.controlLevels(game, 2);    //unlock all levels
        }
        if(game.input.keyboard.isDown(Phaser.KeyCode.S)) {
            //unlock all sprites
        }
    }
};
