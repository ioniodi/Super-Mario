Game.settingsState = function(game) {
    
};

Game.settingsState.prototype = {
    create:function(game) {
        imageManager.createImage(game, game.width / 2, game.height / 2, 'background', 0.45, 0.65, 0, false);

        textManager.createText(game, game.width/2, 10, "Settings", colors.white, false);

        backB = buttonManager.createButton(game, "back", true, 18, 10, 30, 20, function() {
            buttonManager.buttonState(game, max_level, 'menu');
        }, buttonFrame.menu_button, 0.85, false);

        var dificultyB = buttonManager.createButton(game, "Difficulty {", true, game.width / 2, game.height / 2 + 11, menuButtonSize.width - 10, 20, function() {
            soundManager.playSound(game, clickS);
            var normalB = buttonManager.createButton(game, "normal", true, (game.width/2) + 55, (game.height/2) - 10, menuButtonSize.width - 30, 20, function() {
                soundManager.playSound(game, clickS);
                dificulty = 1;
                game.time.events.add(Phaser.Timer.SECOND*0.4, function() {
                    alert('dificulty set to: normal');
                });
            }, buttonFrame.menu_button, 0.85, false);
            var hardB = buttonManager.createButton(game, "hard", true, (game.width/2) + 55, (game.height/2) + 10, menuButtonSize.width - 30, 20, function() {
                soundManager.playSound(game, clickS);
                dificulty = 2;
                game.time.events.add(Phaser.Timer.SECOND*0.4, function() {
                    alert('dificulty set to: hard');
                });
            }, buttonFrame.menu_button, 0.85, false);
            var survivalB = buttonManager.createButton(game, "survival", true, (game.width/2) + 55, (game.height/2) + 30, menuButtonSize.width - 30, 20, function() {
                soundManager.playSound(game, clickS);
                dificulty = 3;
                game.time.events.add(Phaser.Timer.SECOND*0.4, function() {
                    alert('dificulty set to: survival');
                });
            }, buttonFrame.menu_button, 0.85, false);
        }, buttonFrame.menu_button, 0.85, false);
        
        var soundsB = buttonManager.createButton(game, "sounds", true, game.width/2, (game.height/2) + 60, menuButtonSize.width - 30, menuButtonSize.height - 10, function() {
            clickS.play();
            soundEnable = soundManager.soundControl(game);
        }, buttonFrame.menu_button, 0.85, false);
    }
};
