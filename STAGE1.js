var Stage1 = {
		preload: function() {

			this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
			this.load.spritesheet('goomba', 'assets/goomba.png',16, 16);
			this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
			this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
           		this.load.image('live','assets/emotion_heart.png');
            		this.load.spritesheet('goomba1', 'assets/goomba1.png',16, 16);
			game.load.tilemap('level', 'assets/super_mario_map_new.json', null,
					Phaser.Tilemap.TILED_JSON);
            //game sound
			this.load.audio('jump','audio/jump.wav');
			this.load.audio('coin','audio/coin.wav');
			this.load.audio('stomp','audio/stomp.wav');
            		this.load.audio('background','audio/bgm.mp3');
           		this.load.audio('door','audio/door.mp3');
				
		},
		
		create: function() {
			Phaser.Canvas.setImageRenderingCrisp(game.canvas);
			game.stage.backgroundColor = '#5c94fc';
			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');
            map.setCollisionBetween(3, 12, true, 'pipe');
			map.createLayer('background');
            pipe = map.createLayer('pipe');
            pipe.resizeWorld();
			layer = map.createLayer('solid');
			layer.resizeWorld();
			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations','spin',
					[ 0, 0, 1, 2 ], 3, true);
			coins.callAll('animations.play', 'animations','spin' );
			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);
            //new staff(goomba1)
           goomba1 = game.add.group();
			goomba1.enableBody = true;
			map.createFromTiles(1, null, 'new goomba', 'enemy', goomba1);
			goomba1.callAll('animations.add', 'animations', 'walkRight',[ 0, 1 ],2, true);
			goomba1.callAll('animations.play', 'animations', 'walkRight');
			goomba1.setAll('body.bounce.x', 1);
			goomba1.setAll('body.velocity.x', 60);
			goomba1.setAll('body.gravity.y', 50);
            
			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
           		player.animations.add('Teleport', [10],10,false);
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;
			//game sound
			jumpsound = game.add.sound('jump');
			coinsound = game.add.sound('coin');
			stompsound = game.add.sound('stomp');
            		doorsound = game.add.sound('door');
            		backgroundsound = game.add.sound('background');
            		backgroundsound.loop = true;
           		backgroundsound.play();
            		scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '10px', fill: 			'#000' });
            		scoreText.fixedToCamera = true;
            		limage=game.add.sprite(140,15,'emotion_heart');           
            		lcounter=game.add.text(158,20,'X'+lives,{font:'30px',fontSize: '8px',                   fill:'white'});
            		limage.fixedToCamera=true;
			lcounter.fixedToCamera=true;
            		if(lives==3){
				alert("Play!!!");
			}
            
            
            
            
   			game.camera.follow(player);
			cursors = game.input.keyboard.createCursorKeys();

		},

		update: function() {
			game.physics.arcade.collide(player,pipe,pipeOverlap);
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
            		game.physics.arcade.collide(goombas1, layer);
            		game.physics.arcade.overlap(player, goombas1, goombas1Overlap);
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
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}
				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
					jumpsound.play();
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
