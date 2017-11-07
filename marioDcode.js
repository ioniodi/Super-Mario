var game = new Phaser.Game(256, 240, Phaser.CANVAS, '', {
	preload : preload,
	create : create,
	update : update,
}, false, false);


function preload() {
	//  We need this because the assets are on github pages
	//  Remove the next 2 lines if running locally
	game.load.baseURL = 'https://dimitragkena.github.io/SuperMario/';
	game.load.crossOrigin = 'anonymous';

	
	game.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16, 16);
	game.load.spritesheet('goomba', 'assets/goomba.png', 16, 16 );
	game.load.spritesheet('player', 'assets/marioblue.png', 16, 16);
	game.load.spritesheet('fcoins', 'assets/fcoins.png', 16, 16);

	game.load.tilemap('level', 'assets/marioD' +currentStage +'.json', null, Phaser.Tilemap.TILED_JSON);

	
	game.load.audio('jump', 'assets/audio/jump.wav', true);
        game.load.audio('coin', 'assets/audio/coin.wav', true);
        game.load.audio('stomp', 'assets/audio/stomp.wav', true);
	game.load.audio('background', ['assets/audio/bgm.mp3', 'assets/audio/bgm.ogg'], true);

	var score_text;
	var score = 0;
	var currentStage = 0;
	var stageColor = ['3399FF', '3399FF', '#33CCAA', '#33CCAA'];
	
	var startCor = {
		x:10,
		y:140
	}

	var scoreCor = {
		x:70,
		y:0
	}

	
	Phaser.Canvas.setImageRenderingCrisp(game.canvas);
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = stageColor[currentStage];


	map = game.add.tilemap('level');
	map.addTilesetImage('tiles', 'tiles');
	map.setCollisionBetween(10, 36, true, 'solid');
	map.createLayer('background');


	layer = map.createLayer('solid');
	layer.resizeWorld();


	coins = game.add.group();
	coins.enableBody = true;
	map.createFromTiles(2, null, 'fcoins', 'stuff', coins);
	coins.callAll('animations.add', 'animations', 'spin', [ 0, 1, 2, 3], 3, true);
	coins.callAll('animations.play', 'animations', 'spin');

		

	goombas = game.add.group();
	goombas.enableBody = true;
	map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
	goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ], 2, true);
	goombas.callAll('animations.play', 'animations', 'walk');
	goombas.setAll('body.bounce.x', 1);
	goombas.setAll('body.velocity.x', -20);
	goombas.setAll('body.gravity.y', 500);


	player = game.add.sprite(startCor.x, startCor.y, 'player');
	game.physics.arcade.enable(player);
	player.body.gravity.y = 370;
	player.body.collideWorldBounds = true;
	player.animations.add('walkRight', [ 0, 1, 2 ], 8, true);
	player.animations.add('walkLeft', [ 4, 5, 6 ], 8, true);
        player.goesRight = true;
        player.anchor.set(0.5);
        game.camera.follow(player);


	score = game.add.sprite(scoreCor.x, scoreCor.y, 'score');
        score.scale.setTo(0.7, 0.7);
        score.fixedToCamera = true;
        score = 0;
        score_text = game.add.bitmapText(scoreCor.x+15, scoreCor.y+1, 'font', '0', 12);
        score_text.fixedToCamera = true;

	
	jump = game.add.audio('jump', 0.08);
        coin = game.add.audio('coin', 0.12);
        stomp = game.add.audio('stomp', 0.12);	
	background = game.add.audio('background', 0.5);
        background.play();
	
	createStageInfo();


function update() {
	game.physics.arcade.collide(player, layer);
	game.physics.arcade.collide(goombas, layer);
	
	game.physics.arcade.overlap(player, coins, coinOverlap);

	score_text.text = score;
	
	playerMoves();
	teleportF(); 


}


function coinOverlap(player, coin) {
	score = score + 10;
	coin.kill();
}

function goombaOverlap(player, goomba) {
	if (player.body.touching.down) {
        goomba.animations.stop();
        goomba.frame = 2;
	}

	goomba.body.enable = false;
	player.body.velocity.y = -80;
}

function playerMoves() {
    if (player.body.enable == true) {
        player.body.velocity.x = 0;
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {  
            player.body.velocity.x = -90;
            player.animations.play('walkLeft');
            player.goesRight = false;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {  
            player.body.velocity.x = 90;
            player.animations.play('walkRight');
            player.goesRight = true;
        }
        else {  
            player.animations.stop();
            if (player.goesRight) {
                player.frame = 2;
        }
        else {
            player.frame = 4;
        }
}

if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.onFloor()) {
        jump.play();
        player.body.velocity.y = -190;
        player.animations.stop();
}

if (player.body.velocity.y != 0) {
        if (player.goesRight == true) {
            player.frame = 1;
        }
        else if(player.goesRight == false) {
            player.frame = 5;
        }
}

function createStageInfo() {
	if(firstGame == true) {
		info_text[currentStage].fixedToCamera = true;
                info_text[currentStage] = game.add.text(scoreCor.x, scoreCor.y+10, "score", {
                font: "12px Arial",
                fill: "#ffcc00",
                });
}


function teleportF() {
    if(checkTelport == false) {
        if(game.input.keyboard.isDown(Phaser.Keyboard.T)) {
            if(currentStage == 1) {
                player.x = 420;
                player.y = 20;
            }
            if(currentStage == 2) {
                player.x = 420;
                player.y = 20;
            }
            if(currentStage == 3) {
                player.x = 420;
                player.y = 20;
            }
            checkTelport = true;
        }
    }
}




