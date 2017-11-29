var Gameover = {

	preload: function(){
		game.load.audio('go', 'audio/game-over.mp3');
	},

	create: function(){
		go = game.add.audio('go');
		go.play();

		game.stage.backgroundColor = '#000000';

		var gameoverText = game.add.text(110,120, 'GAME OVER', {fontSize: '40x', fill: '#fff'});
		game.time.events.add(Phaser.Timer.SECOND * 5, function(){
			game.state.start('Menu');
		});
	}
}