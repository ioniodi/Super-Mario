var S2 = {
	preload: function() {
	
		this.load.spritesheet('tiles', 'tileset/tileset_2.png', 16, 16);
		this.load.spritesheet('goomba', 'assets/goomba3.png', 16, 16);
		this.load.spritesheet('mario', 'assets/mario2.png', 16, 16);
		this.load.spritesheet('coin', 'assets/coin3.png', 16, 16);
		this.load.spritesheet('lava','assets/lava.png',16,16);
	
		this.load.tilemap('level', 'maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
	
		this.load.image('mushroom','assets/mushroom.png',16,16);//Manitari
		this.load.image('badmush','assets/badmush.png',16,16);
		this.load.image('door2', 'assets/door2.png',16,16);
		this.load.image('star', 'assets/star.png',16,16);
	
		this.load.audio('jump', 'audio/jump.wav');
		this.load.audio('stars', 'audio/stars.wav');	
		this.load.audio('stomp', 'audio/stomp.wav');	
		this.load.audio('game_over', 'audio/game_over.wav');
		this.load.audio('mush', 'audio/mushroom.wav');
		this.load.audio('badmusha', 'audio/badmusha.wav');
		this.load.audio('theme', 'audio/theme1.mp3');
		this.load.audio('glin', 'audio/coin.wav');
		this.load.audio('dies','audio/dies.wav');
		this.load.audio('lavas', 'audio/lava.wav');
		this.load.audio('end', 'audio/end1.wav');
		this.load.audio('man', 'audio/man.wav');
	},
	
	create: function() {

		menus.stop();	
		theme = game.add.audio('theme');
		theme.play('',0,1,true);
		game_over = game.add.audio('game_over');	
		Phaser.Canvas.setImageRenderingCrisp(game.canvas)
	
		game.stage.backgroundColor = '#3e6419';
	
				
		map = game.add.tilemap('level'); //Map
		map.addTilesetImage('tiles', 'tiles');
		map.setCollisionBetween(3, 12, true, 'solid');
		map.createLayer('background');
	
		layer = map.createLayer('solid');
		layer.resizeWorld();
	
		coins = game.add.group();
		coins.enableBody = true;
		map.createFromTiles(2, null, 'coin', 'stuff', coins);
		coins.callAll('animations.add', 'animations', 'spin',
				[ 0, 0, 1, 2 ], 3, true);
		coins.callAll('animations.play', 'animations', 'spin');

		lava = game.add.group();
		lava.enableBody = true;
		map.createFromTiles(22, null, 'lava', 'stuff', lava);
		lava.callAll('animations.add', 'animations', 'stay', [0,1,2], 3, true);
		lava.callAll('animations.play', 'animations', 'stay');
		lava.setAll('body.immovable', true);
	
		goombas = game.add.group();
		goombas.enableBody = true;
		map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
		goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
				2, true);
		goombas.callAll('animations.play', 'animations', 'walk');
		goombas.setAll('body.bounce.x', 1);
		goombas.setAll('body.velocity.x', -20);
		goombas.setAll('body.gravity.y', 500);

		door2 = game.add.group();
		door2.enableBody = true;
		map.createFromTiles(3, null, 'door2', 'stuff', door2);
	
	
		player = game.add.sprite(16, game.world.height - 230, 'mario');

		star = game.add.sprite(2570, game.world.height - 220,'star');
		stars = game.add.group(); 
		star.enableBody = true;
		game.physics.arcade.enable(star);
	
		if(mushflag == false){
			mushroom = game.add.sprite(830, game.world.height - 273,'mushroom');
			mushrooms = game.add.group(); //Manitari
			mushroom.enableBody = true;
			game.physics.arcade.enable(mushroom);
	
			badmush = game.add.sprite(2640, game.world.height - 224,'badmush');
			badmushs = game.add.group(); //Manitari
			badmush.enableBody = true;
			game.physics.arcade.enable(badmush);
		}
				
	
		game.physics.arcade.enable(player);
		player.body.gravity.y = 370;
		player.body.collideWorldBounds = true;
		player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
		player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
		player.goesRight = true;
	
		game.camera.follow(player);
	
		cursors = game.input.keyboard.createCursorKeys();
		text = game.add.text(10, 5, "SCORE:  "+score, style); //Keimeno score
		text.fixedToCamera=true;
		livestext = game.add.text(10, 30, "LIVES: "+lives, style2);//Keimeno gia lives
		livestext.fixedToCamera=true;
				
	},
	
	update: function() {
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(goombas, layer);
		game.physics.arcade.collide(lava, layer);
		game.physics.arcade.collide(player,door2, door2collide);
		game.physics.arcade.collide(player,mushroom,mushroomOverlap);
		game.physics.arcade.collide(player,badmush,badmushOverlap);
		game.physics.arcade.collide(player,star,starCollide2);
		game.physics.arcade.overlap(goombas, lava, lavaO);
		game.physics.arcade.overlap(player,lava,lavaOverlap)
		game.physics.arcade.overlap(player, goombas, goombaOverlap);
		game.physics.arcade.overlap(player, coins, coinOverlap);
				
				
		if (player.body.enable) {
			player.body.velocity.x = 0;
			if (cursors.left.isDown) {
				player.body.velocity.x = -100;
				player.animations.play('walkLeft');
				player.goesRight = false;
			} else if (cursors.right.isDown) {
				player.body.velocity.x = 100;
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
				jump = game.add.audio('jump');
				jump.play();
				player.body.velocity.y = -220;
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