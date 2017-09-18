/**
 * 
 */
var loadState = {

	preload : function() {

	//  We need this because the assets are on github pages
		//  Remove the next 2 lines if running locally
		game.load.baseURL = 'https://ioniodi.github.io/Super-Mario/';
		game.load.crossOrigin = 'anonymous';
		
		game.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16, 16);
		game.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
		game.load.spritesheet('mario', 'assets/mario.png', 16, 16);
		game.load.spritesheet('coin', 'assets/coin.png', 16, 16);

	},

	create : function() {

		Phaser.Canvas.setImageRenderingCrisp(game.canvas)
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#5c94fc';

		game.state.start('menu');

		/*
		 * var nameLabel = game.add.text(0, 80, 'loadState: Press W to
		 * continue', { font : '15px Arial', fill : '#ffffff' });
		 * 
		 * 
		 * var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		 * wkey.onDown.addOnce(this.start, this);
		 */
	},
/*
 * start : function() { game.state.start('menu');
 *  }
 */

};
