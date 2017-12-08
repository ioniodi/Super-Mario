var MENUS = {
	preload: function() {
		game.load.image('menu','assets/super_mario_menu.png');
		game.load.image('l1','assets/level1.png');
		game.load.image('l2','assets/level2.png');
	},
	create: function() {
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		var m=game.add.sprite(0,0,'menu');
		var b1=game.add.button(60,170,"l1",function(){
			game.state.start('STAGE1');
		});
		b1.anchor.set(0.5,0.5);
		var b2=game.add.button(180,170,"l2",function(){
			game.state.start('STAGE2');
		});
		b2.anchor.set(0.5,0.5);
	}
}