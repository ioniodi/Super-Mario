var Menu = {
	preload: function() {

		game.load.image('Menu', 'assets/Menu.png');
		game.load.image('Stage1', 'assets/Stage1.png');
		game.load.image('Stage2', 'assets/Stage2.png');

		game.load.audio('mm', 'audio/Menu.mp3');
	},

	create: function() {
		
		mm = game.add.audio('mm');
		mm.loop = true;
		mm.play();

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var menuPic = game.add.sprite(8, 8, 'Menu');

		var StageText = game.add.text(38, 150, 'Stage1', {fontSize: '12px', fill: '#000'});
		var click1 = game.add.button(60, 197, 'Stage1', function() {
			game.state.start('Stage1');
			mm.stop();
		});
		click1.anchor.set(0.5, 0.5);

		var StageText = game.add.text(120, 150, 'Stage2', {fontSize: '12px', fill: '#000'});
		var click2 = game.add.button(140, 197, 'Stage2', function() {
			game.state.start('Stage2');
			mm.stop();
		});
		click2.anchor.set(0.5, 0.5);
	}
}