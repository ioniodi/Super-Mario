var buttonManager = new Object();

var button;

buttonManager.createButton = function(game, stringName, isMenuButton, x, y, w, h, callback, buttonFrame, buttonAlpha, check) {
    if(isMenuButton == false) {
        button = game.add.button(x, y, 'button', callback, this, buttonFrame, buttonFrame, 0);
    }
    else if(isMenuButton == true) {
        button = game.add.button(x, y, 'button', callback, this, 2, buttonFrame, buttonFrame);
    }

    button.width = w;
    button.height = h;
    button.frame = buttonFrame;
    button.alpha = buttonAlpha;
    button.fixedToCamera = check;
    button.anchor.setTo(0.5, 0.5);

    textManager.createText(game, button.x, button.y + 3, stringName, colors.white, check);

    return button;
};

buttonManager.buttonState = function(game, level, state) {
    soundManager.playSound(game, clickS);
    if(level >= 0) {
        currentLevel = level;
        game.time.events.add(Phaser.Timer.SECOND * 0.6, function() {
            game.state.start(state);
        });
    }
    else {}   
};
