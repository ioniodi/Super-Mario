var menus={
	preload: function(){
		game.load.image('menu','assets/super_mario_menu.png');
		game.load.image('l1','assets/level1.png');
		game.load.image('l2','assets/level2.png');
	},
	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		var m=game.add.sprite(256,240,'menu');
		var button1=game.add.button(180,170,"l1",function(){
			game.state.start('stage1');
		});
		button1.anchor.set(0.5,0.5);
		var button2=game.add.button(180,200,"l2",function(){
			game.state.start('stage2');
		});
		button2.anchor.set(0.5,0.5);
	}
}
