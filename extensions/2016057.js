var level2 = {
	preload: function()
	{
			
		game.load.audio('endsound', 'audio/Hello darkness my old friend.mp3');
    	game.load.audio('endsound2', 'audio/Three Days Grace - Tell Me Why.mp3');
		game.load.audio('teleportSound', 'audio/teleportS.wav');
		game.load.bitmapFont('font','fonts/desyrel-pink.png','fonts/desyrel-pink.xml');
		game.load.audio('jump',['audio/jump.wav']);
		game.load.audio('themesong',['audio/bgm.ogg']);
		game.load.audio('stomp',['audio/stomp.wav']);
		game.load.audio('coin', ['audio/coin.wav']);
		game.load.audio('goomba',['audio/stomp.wav']);
		game.load.audio('ftou',['audio/door.wav']);
		game.load.audio('mushroombox',['audio/key.wav']);
		game.load.audio('gameover',['audio/gameover.ogg']);
		game.load.audio('key',['audio/key.wav']);
		game.load.audio('bravo',['audio/bravo.m4a']);


		this.load.spritesheet('princes', 'assets/Princes.jpg', 8,16);
		this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,16);
		this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
		this.load.spritesheet('ghost', 'assets/ghost.png', 16, 16);
		this.load.spritesheet('mario', 'assets/Herokid.png', 16, 16);
		this.load.spritesheet('marioUP', 'assets/mariopro.png', 16, 16);
		this.load.spritesheet('coin', 'assets/myfood.png', 15, 14);
		this.load.spritesheet('box','assets/box1.png', 16, 16);
		this.load.spritesheet('bonussprite', 'assets/mushroom.png', 16, 16);
		this.load.tilemap('level', 'assets/LaVL2.json', null,
			Phaser.Tilemap.TILED_JSON);
	},

	create: function()
	{
		Phaser.Canvas.setImageRenderingCrisp(game.canvas)
		game.scale.setGameSize(512, 240);
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);



		game.stage.backgroundColor = '#5c94fc';

		boxsound=game.add.audio('key');
		jumpsound=game.add.audio('jump');
		themesong=game.add.audio('themesong');
		coinsound=game.add.audio('coin');
		bravosound=game.add.audio('bravo');
		themesong.play();
		goombasound=game.add.audio('goomba');
		ftousound=game.add.audio('ftou');
		gameoversound=game.add.audio('gameover');
		teleportSound = game.add.audio('teleportSound');
		endsound = game.add.audio('endsound')
		endsound2 = game.add.audio('endsound2')

		map = game.add.tilemap('level');
		map.addTilesetImage('tiles', 'tiles');
		map.setCollisionBetween(3, 12, true, 'solid');
		map.setCollisionBetween(3, 12, true, 'pipe');
		map.createLayer('background');
		pipe = map.createLayer('pipe');
		pipe.resizeWorld();
			
		map.setCollisionBetween(3, 12, true, 'endlvl');
		endlvl = map.createLayer('endlvl');
		endlvl.resizeWorld();



		layer = map.createLayer('solid');
		layer.resizeWorld();

		mushroombonus = game.add.group();
		mushroombonus.enableBody = true;

		coins = game.add.group();
		coins.enableBody = true;
		map.createFromTiles(2, null, 'coin', 'stuff', coins);
		coins.callAll('animations.add', 'animations', 'spin',[ 0, 0, 1, 2 ], 3, true);
		coins.callAll('animations.play', 'animations', 'spin');



		goombas = game.add.group();
		goombas.enableBody = true;
		map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
		goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ], 2, true);
		goombas.callAll('animations.play', 'animations', 'walk');
		goombas.setAll('body.bounce.x', 1);
		goombas.setAll('body.velocity.x', -20);
		goombas.setAll('body.gravity.y', 500);
		princes = game.add.group();
	   	princes.enableBody = false;
		map.createFromTiles(29, null, 'princes', 'stuff', princes);

       	//new enemy(ghost)
       	ghost = game.add.group();
		ghost.enableBody = true;
		map.createFromTiles(26, null, 'ghost', 'enemy', ghost);
		ghost.callAll('animations.add', 'animations', 'walkRight',[ 0, 1 ], 15, true);
		ghost.callAll('animations.play', 'animations', 'walkRight');
		ghost.setAll('body.bounce.x', 1);
		ghost.setAll('body.velocity.x', 120);
		ghost.setAll('body.gravity.y', 40);


		player = game.add.sprite(16, game.world.height - 48, 'mario');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 370;
		player.body.collideWorldBounds = true;
		player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
		player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
		player.goesRight = true;

		game.camera.follow(player);

		cursors = game.input.keyboard.createCursorKeys();

		themesong.loopFull(0.5);

		scoretest = game.add.text(20, 20, 'Score: '+scorelvl1, { fontSize: '20px', fill: '#0019ff' });
		livestest = game.add.text(400, 20, 'Lives: '+lives, { fontSize: '20px', fill: '#0019ff'});
		livestest.fixedToCamera = true;
		scoretest.fixedToCamera = true;

		box = game.add.group();
		box.enableBody = true;
		map.createFromTiles(22 ,null,'box','stuff',box);
		box.callAll('animations.add', 'animations', 'switch', [0,1,2],3,true);
		box.callAll('animations.play','animations','switch');
		box.setAll('body.immovable',true);
			
		if(lives==3)
		{
			alert("Start Of Level--->Press OK to continue ");
		}
	},

	update: function() 
	{
		game.physics.arcade.collide(player,endlvl,endlvlOverlap);
		game.physics.arcade.collide(player,pipe,pipeOverlap);
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(goombas, layer);
		game.physics.arcade.overlap(player, goombas, goombaOverlap);
		game.physics.arcade.overlap(player, coins, coinOverlap);
		game.physics.arcade.collide(player, box, boxOverlap);
		game.physics.arcade.collide(mushroombonus, player, mushroombonusOverlap);

		game.physics.arcade.collide(ghost, layer);
	    game.physics.arcade.overlap(player, ghost, ghostOverlap);

		if (player.body.enable && plai) 
		{
			player.body.velocity.x = 0;
			if (cursors.left.isDown) 
			{
				player.body.velocity.x = -90;
				player.animations.play('walkLeft');
				player.goesRight = false;
			}
			else if (cursors.right.isDown) 
			{
				player.body.velocity.x = 90;
				player.animations.play('walkRight');
				player.goesRight = true;
			} 
			else 
			{
				player.animations.stop();
				if (player.goesRight)
					player.frame = 0;
				else
					player.frame = 7;
			}

			if (cursors.up.isDown && player.body.onFloor())
			{
				jumpsound.play();
				player.body.velocity.y = -190;
				player.animations.stop();
			}

			if (player.body.velocity.y != 0) 
			{
				if (player.goesRight)
					player.frame = 5;
				else
					player.frame = 12;
			}
		}
	}

}