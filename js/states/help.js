Game.helpState = function(game) {
    
};
    
Game.helpState.prototype = {
    create:function(game) {
        imageManager.createImage(game, game.width / 2, game.height / 2, 'menuBackground', 0.15, 0.15, 0, false);
        textManager.createText(game, game.width/2, 10, "Help", colors.white, false);
        imageManager.createImage(game, game.width / 2, game.height / 2, 'instructions', 0.3, 0.3, 0, false);

        backB = buttonManager.createButton(game, "back", true, 18, 10, 30, 20, function() {
            buttonManager.buttonState(game, max_level, 'menu');
        }, buttonFrame.menu_button, 0.85, false);
    }
};
