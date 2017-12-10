var first = {
	preload: function(){
		this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,16);
		this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
		this.load.spritesheet('monster', 'assets/monster.png', 16, 16);
		this.load.spritesheet('mario', 'assets/flash.png', 16, 16);
		this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
            	this.load.audio('music','audio/music.ogg');
            	this.load.audio('run','audio/run.ogg');
            	this.load.audio('coinsound','audio/coin_pick.ogg');
            	this.load.audio('onkill','audio/death.ogg');
            	this.load.audio('stompsound','audio/stomp.ogg');
            	this.load.audio('jump','audio/jump.wav');
            	this.load.image('headlives','assets/lives.png');
		this.load.tilemap('level', 'assets/super_mario_map.json', null,Phaser.Tilemap.TILED_JSON);
		this.load.image('win','assets/win.png');
		this.load.image('lose','assets/lose.png');
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

		coins = game.add.group();
		coins.enableBody = true;
		map.createFromTiles(2, null, 'coin', 'stuff', coins);
		coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2,3 ], 3, true);
		coins.callAll('animations.play', 'animations', 'spin');

		goombas = game.add.group();
		goombas.enableBody = true;
		map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
		goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
		goombas.callAll('animations.play', 'animations', 'walk');
		goombas.setAll('body.bounce.x', 1);
		goombas.setAll('body.velocity.x', -20);
		goombas.setAll('body.gravity.y', 500);
			
		monsters = game.add.group();
		monsters.enableBody = true;
		map.createFromTiles(3, null, 'monster', 'stuff', monsters);
		monsters.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
		monsters.callAll('animations.play', 'animations', 'walk');
		monsters.setAll('body.bounce.x', 1);
		monsters.setAll('body.velocity.x', -20);
		monsters.setAll('body.gravity.y', 500);
		
		player = game.add.sprite(16, game.world.height - 48, 'mario');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 370;
		player.body.collideWorldBounds = true;
		player.animations.add('walkRight', [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17 ], 50, true);
		player.animations.add('walkLeft', [ 35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18 ], 50, true);
		player.goesRight = true;
            
		game.camera.follow(player);

		cursors = game.input.keyboard.createCursorKeys();
            	music = game.add.audio('music');
            	music.play();
            	music.volume = 0.4;
            	run_sound = game.add.audio('run');
            	run_sound.volume = 2;
            	run_sound.play();
            	coin_sound = game.add.audio('coinsound');
            	onkillsound = game.add.audio('onkill');
            	onkillsound.volume = 3;
            	stompsound = game.add.audio('stompsound');
            	stompsound.volume = 2;
            	jumpsound = game.add.audio('jump');
            	jumpsound.volume = 0.2;
            	scoretext = game.add.text(0,0,"Score: "+score,{font: "Bold 21px serif",fill:"red",boundsAlignH:"center",boundsAlignV:"middle"});
            	scoretext.fixedToCamera = true ;
            	head = game.add.sprite(220,0,'headlives');
            	head.scale.setTo(0.15,0.15);
            	head.fixedToCamera = true;
            	livestext = game.add.text(210,10,lives+"x",{font: "Bold 55px serif",fill:"red",boundsAlignH:"center",boundsAlignV:"middle"});
            	livestext.fixedToCamera = true;
	},
	update: function(){
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(goombas, layer);
		game.physics.arcade.collide(monsters, layer);
		game.physics.arcade.overlap(player, goombas, goombaOverlap);
		game.physics.arcade.overlap(player, monsters, monsterOverlap);
		game.physics.arcade.overlap(player, coins, coinOverlap);
            	scoretext.text = 'Score '+score;
            	livestext.text = lives+"x";
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
					player.frame = 40;
				else
					player.frame = 41;
			}

			if (cursors.up.isDown && player.body.onFloor()) {
				player.body.velocity.y = -190;
                    		jumpsound.play();
				player.animations.stop();
			}

			if (player.body.velocity.y != 0) {
				if (player.goesRight)
					player.frame = 36;
				else
					player.frame = 37;
			}
		}
	}
}