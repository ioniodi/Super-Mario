var Ground3 = {
	preload: function(){
		var style = { font: "bold 32px Arial",fill: "#fff", boundsAlignH: "center", boundsAlignV: "top" }; 
		text = game.add.text(0, 0, "LEVEL 3", style);
 text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
		text.setTextBounds(0, 50, 800, 150); 
		this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,16);
		this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
		this.load.spritesheet('turtle', 'assets/turtle.png', 16, 24);
		this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
		this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
		this.load.spritesheet('flag', 'assets/flag.png', 16, 16);
		this.load.spritesheet('blackhole', 'assets/teleport.png', 16, 16);
		this.load.tilemap('level', 'assets/supermario_tilemaplevel3.json', null,
					Phaser.Tilemap.TILED_JSON);

		game.load.audio('themesong','audio/bgm.ogg');
		game.load.audio('coins', 'audio/coin.wav');
		game.load.audio('stomp', 'audio/stomp.wav');
		game.load.audio('jumps', 'audio/jump.wav'); 
		game.load.audio('mariodies', 'audio/death.wav');
		game.load.image('GameOver','assets/GameOver.png');
	},
	create: function(){
		Phaser.Canvas.setImageRenderingCrisp(game.canvas);
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.stage.backgroundColor = '#3a4119';

		map = game.add.tilemap('level');
		map.addTilesetImage('tiles', 'tiles');
		map.setCollisionBetween(3, 12, true, 'solid');

		map.createLayer('background');

		layer = map.createLayer('solid');
		layer.resizeWorld();

		coins = game.add.group();
		coins.enableBody = true;
		map.createFromTiles(2, null, 'coin', 'stuff', coins);
		coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 1, 2, 3, 4, 5, 6, 7 ], 8, true);
		coins.callAll('animations.play', 'animations', 'spin');
			
		flags = game.add.group();
		flags.enableBody = true;
		map.createFromTiles(9, null, 'flag', 'stuff',flags);
		blackholes = game.add.group();
		blackholes.enableBody = true;
		map.createFromTiles(14, null, 'blackhole', 'stuff',blackholes);
		goombas = game.add.group();
		goombas.enableBody = true;
		map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
		goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
		goombas.callAll('animations.play', 'animations', 'walk');
		goombas.setAll('body.bounce.x', 1);
		goombas.setAll('body.velocity.x', -20);
		goombas.setAll('body.gravity.y', 500);
		turtles=game.add.group();
		turtles.enableBody = true;
		map.createFromTiles(3, null, 'turtle', 'stuff', turtles);
		turtles.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],2, true);
		turtles.callAll('animations.play', 'animations', 'walk');
		turtles.setAll('body.bounce.x', 1);
		turtles.setAll('body.velocity.x', -20);
		turtles.setAll('body.gravity.y', 500);

		player = game.add.sprite(16, game.world.height - 48, 'mario');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 370;
		player.body.collideWorldBounds = true;
		player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
		player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
		player.goesRight = true;

		game.camera.follow(player);

		cursors = game.input.keyboard.createCursorKeys();
		scoreString = 'Score : ';
		scoreText = game.add.text(10, 10, scoreString + score, { font: '12px Arial', fill: '#fff' });
		scoreText.fixedToCamera=true;
		livesString = 'Lives : ';
		 livesText = game.add.text(100, 10, livesString + lives, { font: '12px Arial', fill: '#fff' });
		livesText.fixedToCamera=true;
		coinsString = 'Coins : ';
		coinsText = game.add.text(190, 10, coinsString + coinsss, { font: '12px Arial', fill: '#fff' });
		coinsText.fixedToCamera=true;
			
		theme= game.add.audio('themesong');
		theme.loop=true;

    
		theme.play();
	},
	update: function(){
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(goombas, layer);
		game.physics.arcade.collide(turtles, layer);
		game.physics.arcade.overlap(player, goombas, goombaOverlap);
		game.physics.arcade.overlap(player, turtles, turtleOverlap);
		game.physics.arcade.overlap(player, coins, coinOverlap);
		game.physics.arcade.overlap(player, flags, flagOverlap);
		game.physics.arcade.overlap(player, blackholes, blackholeOverlap);
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
				jumper=game.add.audio('jumps');
			  	jumper.play();
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