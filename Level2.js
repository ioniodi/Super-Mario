var Level2 = {
		preload:function(){

			//Audio
			game.load.bitmapFont('font','assets/font3.png','assets/font3.xml');
			game.load.audio('gameover', ['audio/gameover.ogg']);
			game.load.audio('death',['audio/death.ogg']);
			game.load.audio('coin',['audio/coin.mp3']);
			game.load.audio('theme song',['audio/dragonballZTheme.ogg']);
			game.load.audio('jump',['audio/jump.wav']);
			game.load.audio('mysteryboxhit',['audio/mysteryboxhit.wav']);
			game.load.audio('supersaiyan',['audio/supersaiyan.ogg']);
			game.load.audio('stomp',['audio/stomp.wav']);
			game.load.audio('portalsound', ['audio/portalsound.ogg']);
			

			//  We need this because the assets are on github pages
			//  Remove the next 2 lines if running locally
			this.load.baseURL = 'https://dhmhtrhsd.github.io/Super-Mario/';
			this.load.crossOrigin = 'anonymous';

			this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
			this.load.spritesheet('portalbox', 'assets/portal1.png', 18,
					46);
			this.load.spritesheet('mysterybox', 'assets/mysterybox.png', 16,
					16);
			this.load.spritesheet('mushroomsprite', 'assets/mushroomsprite.png', 16,
					16);
			this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
			this.load.spritesheet('dragonball', 'assets/dragonballfinal.png', 20, 29);
			this.load.spritesheet('coin', 'assets/dragonballCoinSprite1.png', 16, 16);
			this.load.spritesheet('frieza', 'assets/frieza.png', 43, 49);
			this.load.spritesheet('water', 'assets/water.png', 16, 16);
			this.load.tilemap('level', 'assets/P2016141.json', null,
					Phaser.Tilemap.TILED_JSON);

		},

		create: function(){

			game.scale.setGameSize(512, 240);
			finishcheck = 0;
			this.camera.flash(000000, 2000);
			themesnd = game.add.audio("theme song");
			themesnd.loopFull(0.3);		//theme song	
			mysteryboxhitsnd = game.add.audio("mysteryboxhit");
			supersaiyansnd = game.add.audio("supersaiyan");			
			deathsnd = game.add.audio("death");			//death sound
			gameoversnd = game.add.audio("gameover");
			jumpsnd = game.add.audio("jump");
			portalsnd = game.add.audio("portalsound");

			Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			game.stage.backgroundColor = '#191970';

			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');

			map.createLayer('background');

			layer = map.createLayer('solid');
			layer.resizeWorld();
			
			portalbox = game.add.group();
			portalbox.enableBody = true;
			map.createFromTiles(26,null,'portalbox','stuff',portalbox);
			portalbox.callAll('animations.add', 'animations', 'still', [0],1,true);
			portalbox.callAll('animations.play','animations','still');
			portalbox.setAll('body.immovable',true);

			mysterybox = game.add.group();
			mysterybox.enableBody = true;
			map.createFromTiles(22,null,'mysterybox','stuff',mysterybox);
			mysterybox.callAll('animations.add', 'animations', 'shine', [0,1,2],3,true);
			mysterybox.callAll('animations.play','animations','shine');
			mysterybox.setAll('body.immovable',true);

			mushroom = game.add.group();
			mushroom.enableBody = true;

			water = game.add.group();
			water.enableBody = true;
			map.createFromTiles(31, null, 'water', 'stuff', water);
			

			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 1, 2, 3, 4 ], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');

			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', 20);
			goombas.setAll('body.gravity.y', 500);

			frieza = game.add.group();
			frieza.enableBody = true;
			map.createFromTiles(27, null, 'frieza', 'stuff', frieza);
			frieza.callAll('animations.add', 'animations', 'walkRight', [0], 1, true);
			frieza.callAll('animations.add', 'animations', 'walkLeft', [1], 1, true);
			frieza.callAll('animations.play', 'animations', 'walkLeft');
			frieza.setAll('body.bounce.x', 1);
			frieza.setAll('body.velocity.x', 1);
			frieza.setAll('body.gravity.y', 500);

			player = game.add.sprite(16, game.world.height - 61, 'dragonball');
			game.physics.arcade.enable(player);
			player.body.setSize(16,29);
			player.body.collideWorldBounds = true;
			player.goesRight = true;
			player.animations.add('mushroomSuper', [8, 1, 8, 1], 4, true);
			player.animations.add('walkRight', [4, 0], 5, true);
			player.animations.add('walkLeft', [2, 3], 5, true);
			player.animations.add('walkRightSuper', [11, 7], 5, true);
			player.animations.add('walkLeftSuper', [9, 10], 5, true);	

			if(ascent == 0){
				player.body.gravity.y = 370;
			}
			else{
				player.body.gravity.y = 250;
			}

			player.body.enable = false;
			level2Text = game.add.bitmapText(150,85,'font', 'Level 2',55);
			level2Text.fixedToCamera = true;
			game.time.events.add(Phaser.Timer.SECOND * 3, function() {
						level2Text.destroy();
						player.body.enable = true;
					});

			game.camera.follow(player);
			scoreText = game.add.bitmapText(16,16,'font', 'Score: '+score,16);
			scoreText.fixedToCamera = true;
			//scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '22px', fill: '#A04242' });
			livesText = game.add.bitmapText(416,16,'font', 'Lives : '+lives,16);
			livesText.fixedToCamera = true;
			//livesText = game.add.text(405, 16, 'Lives: '+lives, { fontSize: '22px', fill: '#A04242'});
			cursors = game.input.keyboard.createCursorKeys();
			//game.input.onDown.add(fade, this);

		},

		update: function() {
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.collide(frieza, layer);
			game.physics.arcade.collide(player, mysterybox, mysteryboxOverlap);
			game.physics.arcade.collide(mushroom, player, mushroomOverlap);
			game.physics.arcade.overlap(player, water, waterOverlap);
			game.physics.arcade.overlap(frieza, layer, friezaHit);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
			game.physics.arcade.overlap(portalbox, player, portalboxOverlap);
			game.physics.arcade.overlap(player, frieza, friezaOverlap);




		if(ascent == 0){
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
						player.frame = 3;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					jumpsnd.volume = 0.1;
					jumpsnd.play();
					player.body.velocity.y = -190;
					player.animations.stop();
				}	

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 4;
					else
						player.frame = 5;

				}
			}
		}
			else if(ascent == 1){
				if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeftSuper');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRightSuper');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 7;
					else
						player.frame = 10;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					jumpsnd.volume = 0.1;
					jumpsnd.play();
					player.body.velocity.y = -190;
					player.animations.stop();
				}	

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 11;
					else
						player.frame = 12;
				}
			}
		}
	}
}
