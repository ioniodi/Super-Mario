var Stage2 = {
		preload: function() {

			this.load.spritesheet('tiles', 'assets/tiles2.png', 16, 16);
			this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
			this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
			this.load.spritesheet('coin', 'assets/coin2.png', 16, 16);
			this.load.spritesheet('portal', 'assets/portal1.png', 16, 16);
			this.load.spritesheet('crab', 'assets/crab.png', 28, 16);
			this.load.spritesheet('door', 'assets/door.png', 16, 32);
			this.load.image('coincounter', 'assets/coincounter.png');
			this.load.image('lives', 'assets/lives.png');


			game.load.tilemap('level', 'assets/SMM2.json', null, Phaser.Tilemap.TILED_JSON);

			this.load.audio('music2', 'audio/underground.mp3');
			this.load.audio('CoinK', 'audio/coin.wav');
			this.load.audio('jump', 'audio/jump-super.wav');
			this.load.audio('stomp', 'audio/stomp.wav');
			this.load.audio('mariodie', 'audio/mario-die.wav');
			this.load.audio('oneup', 'audio/1-up.wav');
			this.load.audio('portals', 'audio/portal.mp3');
			this.load.audio('stageclear', 'audio/stageclear.wav');
		},
		
		create: function() {
			music = game.add.audio('music2');
				music.loop = true;
				music.play();

			Phaser.Canvas.setImageRenderingCrisp(game.canvas)

			game.stage.backgroundColor = '#100000';

			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');

			map.createLayer('background');

			layer = map.createLayer('solid');
			layer.resizeWorld();

			portal2 = game.add.sprite(758, game.world.height - 200, 'portal');
			game.physics.arcade.enable(portal2);
			portal2.body.gravity.y = 0;
			portal2.body.enable = true;
			portal2.animations.add('spin', [ 0, 1, 2], 6, true);
			portal2.animations.play('spin');

			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin', [ 0, 1, 2, 1 ], 4, true);
			coins.callAll('animations.play', 'animations', 'spin');

			crab = game.add.group();
			crab.enableBody = true;
			map.createFromTiles(22, null, 'crab', 'stuff', crab);
			crab.callAll('animations.add', 'animations', 'walk', [ 0, 1 ], 3, true);
			crab.callAll('animations.play', 'animations', 'walk');
			crab.setAll('body.bounce.x', 1);
			crab.setAll('body.velocity.x', -70);
			crab.setAll('body.gravity.y', 500);

			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ], 3, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -50);
			goombas.setAll('body.gravity.y', 500);

			door2 = game.add.sprite(1888, game.world.height - 208, 'door');
			game.physics.arcade.enable(door2);
			door2.body.gravity.y = 0;
			door2.body.enable = true;

			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;

			game.camera.follow(player);

			cursors = game.input.keyboard.createCursorKeys();

			stomp = game.add.audio('stomp');
			portals = game.add.audio('portals');
			stageclear = game.add.audio('stageclear');

			CoincountText = game.add.text( 10, 16, 'x ' + Coincount, { fontSize: '10px', fill: '#fff'});
			CoincountText.fixedToCamera = true;
			coincounter = game.add.sprite( 0, 16, 'coincounter');
			coincounter.fixedToCamera = true;

			scoreText = game.add.text( 0, 6, 'Score: ' + score, { fontSize: '10px', fill: '#fff'});
			scoreText.fixedToCamera = true;
			
			livesheart = game.add.sprite( 110, 5, 'lives' );
			livesheart.fixedToCamera = true;
			livesText = game.add.text( 130, 8, "x " + lives, { fontSize: '10px', fill: '#fff'});
			livesText.fixedToCamera = true;

			WorldText = game.add.text( 200, 6, 'World: 1 - 2', { fontSize: '10px', fill: '#fff'});
			WorldText.fixedToCamera = true;

		},

		update: function() {
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.collide(crab, layer);
			game.physics.arcade.overlap(player, door2, door2Overlap);
			game.physics.arcade.overlap(player, crab, crabOverlap);
			game.physics.arcade.overlap(player, portal2, portal2Overlap);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);

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
					if (player.goesRight){
						player.frame = 0;
					}
					else{
						player.frame = 7;
					}
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
					jump = game.add.audio('jump');
					jump.play();
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
