var S1 = {
	preload: function() {
	
		//  We need this because the assets are on github pages
		//  Remove the next 2 lines if running locally
		//this.load.baseURL = 'https://p16bouk.github.io/Super-Mario/';
		//this.load.crossOrigin = 'anonymous';
		this.load.spritesheet('tiles', 'tileset/tileset1.png', 16, 16);
		this.load.spritesheet('goomba', 'assets/goomba2.png', 16, 16);
		this.load.spritesheet('mario', 'assets/mario2.png', 16, 16);
		this.load.spritesheet('coin', 'assets/coin2.png', 16, 16);
		this.load.spritesheet('snake','assets/enemy.png',28,31); //Snake enemy
	
		game.load.tilemap('level', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
	
		this.load.image('mushroom','assets/mushroom.png',16,16);//Manitari
		this.load.image('badmush','assets/badmush.png',16,16);
		this.load.image('door1', 'assets/door1.png',16,16);
		this.load.image('star', 'assets/star.png',16,16);
	
		this.load.audio('jump', 'audio/jump.wav');	
		this.load.audio('stomp', 'audio/stomp.wav');	
		this.load.audio('game_over', 'audio/game_over.wav');
		this.load.audio('stars', 'audio/stars.wav');
		this.load.audio('mush', 'audio/mushroom.wav');
		this.load.audio('fs','audio/snake.wav');
		this.load.audio('badmusha', 'audio/badmusha.wav');
		this.load.audio('theme', 'audio/theme1.mp3');
		this.load.audio('glin', 'audio/coin.wav');
		this.load.audio('dies','audio/dies.wav');
		this.load.audio('lvl', 'audio/lvl.wav');
		this.load.audio('man', 'audio/man.wav');
	},
	
	create: function() {
		menus.stop();	
		theme = game.add.audio('theme');
		theme.play('',0,1,true);	
		Phaser.Canvas.setImageRenderingCrisp(game.canvas)
	
		game.stage.backgroundColor = '#340026';
	
				
		map = game.add.tilemap('level'); //Map
		map.addTilesetImage('tiles', 'tiles');
		map.setCollisionBetween(3, 12, true, 'solid');
		map.createLayer('background');
	
		layer = map.createLayer('solid');
		layer.resizeWorld();
	
		coins = game.add.group();
		coins.enableBody = true;
		map.createFromTiles(2, null, 'coin', 'stuff', coins);
		coins.callAll('animations.add', 'animations', 'spin', [ 0, 0, 1, 2 ], 3, true);
		coins.callAll('animations.play', 'animations', 'spin');
	
		goombas = game.add.group();
		goombas.enableBody = true;
		map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
		goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ], 2, true);
		goombas.callAll('animations.play', 'animations', 'walk');
		goombas.setAll('body.bounce.x', 1);
		goombas.setAll('body.velocity.x', -20);
		goombas.setAll('body.gravity.y', 500);

		door1 = game.add.group();
		door1.enableBody = true;
		map.createFromTiles(3, null, 'door1', 'stuff', door1);

		star = game.add.sprite(2608, game.world.height - 100,'star');
		stars = game.add.group(); 
		star.enableBody = true;
		game.physics.arcade.enable(star);
	
		//Snake Enemy
		snake = game.add.group();
	
		snake.enableBody = true;
		map.createFromTiles(22, null, 'snake', 'stuff', snake);
		snake.callAll('animations.add', 'animations', 'walk', [ 0, 1, 2, 3, 4, 5 ], 6, true);
		snake.callAll('animations.play', 'animations', 'walk');
		snake.setAll('body.bounce.x', 1);
		snake.setAll('body.velocity.x', -20);
		snake.setAll('body.gravity.y', 500);
	
	
		player = game.add.sprite(16, game.world.height - 230, 'mario');
	
		if(mushflag == false){
			mushroom = game.add.sprite(2680, game.world.height - 399,'mushroom');
			mushrooms = game.add.group(); //Manitari
			mushroom.enableBody = true;
			game.physics.arcade.enable(mushroom);
	
			badmush = game.add.sprite(3520, game.world.height - 290,'badmush');
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
		game.physics.arcade.collide(player,door1, door1collide);
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(goombas, layer);
		game.physics.arcade.collide(snake, layer);
		game.physics.arcade.collide(player,mushroom,mushroomOverlap);
		game.physics.arcade.collide(player,badmush,badmushOverlap);
		game.physics.arcade.collide(player,star,starCollide1);
		game.physics.arcade.overlap(player, goombas, goombaOverlap);
		game.physics.arcade.overlap(player, coins, coinOverlap);
		game.physics.arcade.overlap(player, snake, snakeOverlap);
				
				
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