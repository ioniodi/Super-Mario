Game.boot_menuState = function(game) {

};

Game.boot_menuState.prototype = {
    create:function(game) {
        textManager.createText(game, 30, 50, 'loading...', colors.white, false);
        soundManager.playSound(game, backgroundS);
        game.state.start('menu');
	}
};
