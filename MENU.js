var MENU = {
	preload: function() {
		game.load.image('GameMenu','assets/GameMenu.png');
		game.load.image('LEVEL1','assets/LEVEL1.png');
		game.load.image('LEVEL2','assets/LEVEL2.png');
	},
	create: function() {
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		var m=game.add.sprite(0,0,'GameMenu');
		var key1=game.add.button(50,150,"LEVEL1",function(){
			game.state.start('Ground1');
		});
		key1.anchor.set(0.5,0.5);
		var key2=game.add.button(50,170,"LEVEL2",function(){
			game.state.start('Ground2');
		});
		key2.anchor.set(0.5,0.5);
	}
}