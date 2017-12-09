var Gameover = {

	preload: function(){
		game.load.audio('gaov', 'audio/game-over.mp3');
	},

	create: function(){
		gaov = game.add.audio('gaov');
		gaov.play();

		game.stage.backgroundColor = '#000000';

		var finalscoreText = game.add.text(80,150, 'Your score: ' + score, {fontSize: '10px', fill: '#fff'});

		var gameoverText = game.add.text(50,90, 'GAME OVER', {fontSize: '25px', fill: '#fff'});
		game.time.events.add(Phaser.Timer.SECOND * 5, function(){
			score = 0;
			game.state.start('Menu');
		});
	}
}