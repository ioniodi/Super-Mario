var STAGE2 = {
	preload: function(){
		this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,16);
		this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
		this.load.spritesheet('koopa', 'assets/koopa.png', 16, 24);
		this.load.spritesheet('waluigi', 'assets/waluigi.png', 16, 16);
		this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
		this.load.spritesheet('teleporter', 'assets/teleporter.png', 16, 16);
		this.load.spritesheet('stone', 'assets/stone.png', 16, 16);
		game.load.tilemap('level', 'assets/super_mario_map.json', null,Phaser.Tilemap.TILED_JSON);
		this.load.audio('theme','audio/Super-Mario-Bros-Theme-Song.ogg');
		this.load.audio('collect','audio/coin.wav');
		this.load.audio('stomp','audio/stomp.wav');
		this.load.audio('jump','audio/jump.wav');
		this.load.audio('death','audio/death.ogg');
		this.load.audio('gameover','audio/gameover.ogg');
		this.load.image('go','assets/gameover.png');
		this.load.image('congrats','assets/congrats.gif');
	},
	create: function(){
		Phaser.Canvas.setImageRenderingCrisp(game.canvas);
		game.stage.backgroundColor = '#5c94fc';
		map = game.add.tilemap('level');
		map.addTilesetImage('tiles', 'tiles');
		map.setCollisionBetween(3, 12, true, 'solid');
		map.createLayer('background');
		layer = map.createLayer('solid');
		layer.resizeWorld();
		stones = game.add.group();
		stones.enableBody = true;
		map.createFromTiles(4, null, 'stone', 'stuff', stones);
		coins = game.add.group();
		coins.enableBody = true;
		map.createFromTiles(2, null, 'coin', 'stuff', coins);
		coins.callAll('animations.add', 'animations', 'spin',[ 0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		coins.callAll('animations.play', 'animations', 'spin');
		teleporters = game.add.group();
		teleporters.enableBody = true;
		map.createFromTiles(12, null, 'teleporter', 'stuff', teleporters);
		goombas = game.add.group();
		goombas.enableBody = true;
		map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
		goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],2, true);
		goombas.callAll('animations.play', 'animations', 'walk');
		goombas.setAll('body.bounce.x', 1);
		goombas.setAll('body.velocity.x', -20);
		goombas.setAll('body.gravity.y', 500);
		koopas = game.add.group();
		koopas.enableBody = true;
		map.createFromTiles(3, null, 'koopa', 'stuff', koopas);
		koopas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],2, true);
		koopas.callAll('animations.play', 'animations', 'walk');
		koopas.setAll('body.bounce.x', 1);
		koopas.setAll('body.velocity.x', -20);
		koopas.setAll('body.gravity.y', 500);
		player = game.add.sprite(16, game.world.height - 48, 'waluigi');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 370;
		player.body.collideWorldBounds = true;
		player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
		player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
		player.goesRight = true;
		game.camera.follow(player);
		score=game.add.text(16,8,'WALUIGI\n\t\t'+scorecount,{font:'8px emulogic' ,fontSize: '8px', fill: 'purple'} );
		score.fixedToCamera=true;
		cointext=game.add.text(96,8,'COINS\n\t\t'+coincount,{font:'8px emulogic' ,fontSize: '8px', fill: 'gold'} );
		cointext.fixedToCamera=true;
		livestext=game.add.text(176,8,'LIVES\n\t\t'+lives,{font:'8px emulogic' ,fontSize: '8px', fill: 'red'} );
		livestext.fixedToCamera=true;
		cursors = game.input.keyboard.createCursorKeys();
		music=game.add.audio('theme');
		music.loop=true;
		music.play();
	},
	update: function(){
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(goombas, layer);
		game.physics.arcade.collide(koopas, layer);
		game.physics.arcade.overlap(player, goombas, goombaOverlap);
		game.physics.arcade.overlap(player, koopas, koopaOverlap);
		game.physics.arcade.overlap(player, coins, coinOverlap);
		game.physics.arcade.overlap(player, teleporters, teleporterOverlap);
		game.physics.arcade.overlap(player, stones, stoneOverlap);
		jsound=game.add.audio('jump');
		if (player.body.enable) {
			player.body.velocity.x = 0;
			if (cursors.left.isDown) {
				player.body.velocity.x = -90;
				player.animations.play('walkLeft');
				player.goesRight = false;
			} else if (cursors.right.isDown) {
				player.body.velocity.x = 90;
				player.animations.play('walkRight');
				player.goesRight = true;
			} else {
				player.animations.stop();
				if (player.goesRight)
					player.frame = 0;
				else
					player.frame = 7;
			}
			if (cursors.up.isDown && player.body.onFloor()) {
				jsound.play();
				player.body.velocity.y = -190;
				player.animations.stop();
			}
			if (player.body.velocity.y != 0) {		
				if (player.goesRight)
					player.frame = 5;
				else
					player.frame = 12;
			}
		}
	}
}