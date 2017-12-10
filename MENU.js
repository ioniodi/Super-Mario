var Menu = {
	preload: function() {

		game.load.image('MENU', 'assets/MENU.png');
		game.load.image('STAGE1', 'assets/STAGE1.png');
		game.load.audio('tm', 'audio/Rio vs THe XX - Mia NyxtA pOu tAsteRi Mas laMpei oSo KaNeNa.mp3');
		},
		
		create: function() {
		
			tm = game.add.audio('tm');
			tm.play();

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);
			
			var menuPic = game.add.sprite(8, 8, 'MENU');

			var StageText = game.add.text(38, 150, 'STAGE1', {fontSize: '12px', fill: '#000'});
			var click1 = game.add.button(60, 197, 'STAGE1', function() {
			game.state.start('STAGE1');
			tm.stop();
		});
		click1.anchor.set(0.5, 0.5);
	}
}
