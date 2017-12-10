var menu = {
	preload: function(){
		game.load.image('m','assets/menu.png');
		game.load.image('f','assets/first.png');
		game.load.image('s','assets/second.png');
	},
	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		var mn=game.add.sprite(0,0,'m');
		var but1=game.add.button(200,110,"f",function(){
			game.state.start('first');
		});
		but1.anchor.set(0.5,0.5);
		var but2=game.add.button(200,140,"s",function(){
			game.state.start('second');
		});
		but2.anchor.set(0.5,0.5);
	}
}