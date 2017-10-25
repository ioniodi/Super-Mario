/*****************************************************
* By Jim
*****************************************************/

var game = new Phaser.Game(256, 240, Phaser.AUTO, '', {
	preload : preload,
	create : create,
	update : update
}, false, false);

var kills = 0;
var score_text;
var score = 0;
var bonus_type_text;
var bonus_type = ["2x coins", "2x kills score", "invisible"];
var info_text;
var currentBonus = 0;
var currentBonusScoreEffect = 0;
var checkB = false;
var currentLifes = 5;
var enableEnemyPhysics = true;
var checkP = false;
var timeCounter = 0;
var timeLeft = 0;
var checkF = false;

var currentStage = 2;
var stageColor = ['#3399FF', '#33CCAA', '#33CCAA'];

//loads sprites from spritesheets
function preload() {

	//  We need this because the assets are on github pages
	//  Remove the next 2 lines if running locally
	this.load.baseURL = 'https://dimitristria.github.io/SuperMario/';
	this.load.crossOrigin = 'anonymous';

    //load sptites
	this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16, 16);
	this.load.spritesheet('goomba', 'assets/sprites/goomba.png', 16, 16, 3);
	this.load.spritesheet('player', 'assets/sprites/player.png', 14, 16, 7);
	this.load.spritesheet('rotated_coin', 'assets/sprites/rotated_coin.png', 14, 16, 4);
    this.load.spritesheet('fireball', 'assets/sprites/fireball.png', 15, 21);
    this.load.spritesheet('lives', 'assets/sprites/lives.png', 49, 8, 6);
    this.load.spritesheet('score', 'assets/sprites/score.png', 14, 16);
    this.load.spritesheet('bonus_star', 'assets/sprites/bonus_star.png', 16, 16);
    this.load.spritesheet('mushroom', 'assets/sprites/mushroom.png', 16, 16);
    this.load.spritesheet('checkpoint', 'assets/sprites/checkpoint.png', 16, 16, 2);
    this.load.spritesheet('finish', 'assets/sprites/finish.png', 14, 14);
    
    //load tilemap
    this.load.tilemap('level', 'assets/levels/super_mario_map' +currentStage +'.json', null, Phaser.Tilemap.TILED_JSON);
    
    //load audio
    this.load.audio('jumpS', 'audio/jump.wav', true);
    this.load.audio('coinS', 'audio/smb_coin.wav', true);
    this.load.audio('stompS', 'audio/smb_stomp.wav', true);
    this.load.audio('deathS', 'audio/smb_mariodies.wav', true);
    this.load.audio('game_overS', 'audio/smb_game_over.wav', true);
    this.load.audio('checkpointS', 'audio/key.wav', true);
    this.load.audio('doubleCoinS', 'audio/coin.wav', true);
    this.load.audio('doubleKillS', 'audio/stomp.wav', true);
    this.load.audio('backgroundS', 'audio/bgm.mp3', true);
    
    this.load.bitmapFont('font', 'assets/sprites/font.png', 'assets/sprites/font.xml');
}

function create() {
	Phaser.Canvas.setImageRenderingCrisp(game.canvas);
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = stageColor[currentStage - 1];

    //create map
	map = game.add.tilemap('level');
	map.addTilesetImage('tiles', 'tiles');
	map.setCollisionBetween(10, 36, true, 'solid');
	map.createLayer('background');

    //create layer
	layer = map.createLayer('solid');
	layer.resizeWorld();

    //create coins
	coins = game.add.group();
	coins.enableBody = true;
	map.createFromTiles(2, null, 'rotated_coin', 'stuff', coins);
	coins.callAll('animations.add', 'animations', 'spin', [ 0, 1, 2, 3], 3, true);
	coins.callAll('animations.play', 'animations', 'spin');

    //create goombas
	goombas = game.add.group();
	goombas.enableBody = true;
	map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
	goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ], 2, true);
	goombas.callAll('animations.play', 'animations', 'walk');
	goombas.setAll('body.bounce.x', 1);
	goombas.setAll('body.velocity.x', -20);
	goombas.setAll('body.gravity.y', 500);

    //create player
	player = game.add.sprite(10, game.world.height - 100, 'player');
	game.physics.arcade.enable(player);
	player.body.gravity.y = 370;
	player.body.collideWorldBounds = true;
	player.animations.add('walkRight', [ 0, 1, 2 ], 8, true);
	player.animations.add('walkLeft', [ 4, 5, 6 ], 8, true);
    player.goesRight = true;
    player.anchor.setTo(0.5);
    //camera follows player
    game.camera.follow(player);
    
    //keyboard input
	cursors = game.input.keyboard.createCursorKeys();
    
    //create fireball
    fireballs = game.add.group();
	fireballs.enableBody = true;
	map.createFromTiles(3, null, 'fireball', 'stuff', fireballs);
	fireballs.callAll('animations.add', 'animations', 'walk', [ 0, 1, 2 ], 4, true);
	fireballs.callAll('animations.play', 'animations', 'walk');
	fireballs.setAll('body.bounce.x', 1);
	fireballs.setAll('body.velocity.x', -10);
	fireballs.setAll('body.gravity.y', 0);
    
    //create mushrooms
    mushrooms = game.add.group();
	mushrooms.enableBody = true;
	map.createFromTiles(9, null, 'mushroom', 'stuff', mushrooms);
    
    //create checkpoint
    checkpoints = game.add.group();
    checkpoints.enableBody = true;
    map.createFromTiles(7, null, 'checkpoint', 'stuff', checkpoints);
//    checkpoints.x = 0;
//    checkpoints.y = 0;
    
    finishs = game.add.group();
    finishs.enableBody = true;
    map.createFromTiles(6, null, 'finish', 'stuff', finishs);
    finishs.alpha = 0.0001;
    
    //create lives
    lives = game.add.sprite(0, 0, 'lives');
    lives.frame = 5 - currentLifes;
    lives.fixedToCamera = true;
    
    //create score sprite
    score = game.add.sprite(70, 0, 'score');
    score.scale.setTo(0.7, 0.7);
    score.fixedToCamera = true;
    
    //create bonus spite
    bonus = game.add.sprite(122, 0, 'bonus_star');
    bonus.scale.setTo(0.7, 0.7);
    bonus.fixedToCamera = true;
    
    //add audio
    jumpS = this.add.audio('jumpS', 0.08);
    coinS = this.add.audio('coinS', 0.12);
    stompS = this.add.audio('stompS', 0.12);
    deathS = this.add.audio('deathS', 0.2);
    game_overS = this.add.audio('game_overS', 0.2);
    checkpointS = this.add.audio('checkpointS', 0.4);
    doubleCoinS = this.add.audio('doubleCoinS', 0.12);
    doubleKillS = this.add.audio('doubleKillS', 0.12);
    backgroundS = this.add.audio('backgroundS', 0.5);
    backgroundS.play();
    
    //score and bonus text
    score = 0;
    score_text = game.add.bitmapText(85, 1, 'font', '0', 12);
    score_text.fixedToCamera = true;
    bonus_type_text = game.add.bitmapText(135, 1,'font', '0', 12);
    bonus_type_text.fixedToCamera = true;
    bonus_type_text.text = currentBonus = "none   0";
    
    createStageInfo();
}

function createStageInfo() {
    if(currentStage == 2) {
        info_text = game.add.text(100, 70, "New enemy called fireball\nthat can not be killed", {
            font: "12px Arial",
            fill: "#ff0000",
        });
    }
}

function update() {
    /*collisions*/
	game.physics.arcade.collide(player, layer);
	game.physics.arcade.collide(goombas, layer);
    game.physics.arcade.collide(fireballs, layer);
    game.physics.arcade.collide(mushrooms, layer);
    game.physics.arcade.collide(checkpoints, layer);
    game.physics.arcade.collide(finishs, layer);
    
    /*overlaps*/
    game.physics.arcade.overlap(player, coins, coinOverlap);
    game.physics.arcade.overlap(player, mushrooms, mushroomOverlap);
    game.physics.arcade.overlap(player, checkpoints, checkpointOverlap);
    game.physics.arcade.overlap(player, finishs, finishOverlap);
    enemyPhysics(enableEnemyPhysics);
    
    //update score
    score_text.text = score;
    
    //bonus effects
    bonusEffect();
    
    //player movement
    playerMoves();
    
    levelFinish();
}

/*player collects coins*/
function coinOverlap(player, coin) {
    if(currentBonus == bonus_type[0]) {
        doubleCoinS.play();
    }
    else if(currentBonus != bonus_type[0]) {
        coinS.play();
    }
    score = score + 10 + currentBonusScoreEffect;
	coin.kill();
}

/*player killed or overlaps a goomba*/
function goombaOverlap(player, goomba) {
	if (player.body.touching.down) {
        goomba.animations.stop();
        goomba.frame = 2;
        if(currentBonus == bonus_type[1]) {
            doubleKillS.play();
        }
        else if(currentBonus != bonus_type[1]) {
            stompS.play();
        }
        goomba.body.enable = false;
		player.body.velocity.y = -80;
        kills++;
        game.time.events.add(Phaser.Timer.SECOND, function() {
			goomba.kill();
		});
        score = score + 15 + currentBonusScoreEffect;
	} else {
        playerLosesLife();
	}
}

/*player killed by fireball*/
function fireballOverlap(player, fireball) {
    playerLosesLife();
}

function mushroomOverlap(player, mushroom) {
    checkB = true;
    mushroom.kill();
    currentBonus = bonus_type[Math.floor(Math.random() * bonus_type.length)];
    //currentBonus = bonus_type[1];
    timeLeft = 8;
}

function checkpointOverlap(player, checkpoint) {
    checkpoint.frame = 1;
    checkP = true;
}

function finishOverlap(player, finish) {
    if(player.body.onFloor() && cursors.down.isDown && checkF == false) {
        backgroundS.stop();
        alert('Level is finished:(\n\n Press the f5 or the restart game button '
        +'to start over!\n\nPLayer status\n'
        +'kills: ' +kills +'\ncoins: ' +score);
        checkF = true;
        timeLeft = 5;
    }
}

//effect
function bonusEffect() {
    if(checkB == true) {
        if(currentBonus == bonus_type[0]) {
            currentBonusScoreEffect = 10;
        }
        else if(currentBonus == bonus_type[1]) {
            currentBonusScoreEffect = 15;
        }
        else if(currentBonus == bonus_type[2]) {
            player.alpha = 0.4;
            enableEnemyPhysics = false;
        }
        
        if(timer() == 0) {
            player.alpha = 1;
            timeCounter = 0;
            timeLeft = 0;
            currentBonus = "none";
            checkB = false;
            enableEnemyPhysics = true;
            currentBonusScoreEffect = 0;
        }
        bonus_type_text.text = currentBonus +"   " +timer();
    }
}

//effect countdown timer
function timer() {
    timeCounter++;
    if(timeCounter == 90) {
        timeLeft--;
        timeCounter = 0;
    }
    return timeLeft;
}

function enemyPhysics() {
    if(enableEnemyPhysics == true) {
        game.physics.arcade.overlap(player, goombas, goombaOverlap);
        game.physics.arcade.overlap(player, fireballs, fireballOverlap);
    }
}

function levelFinish() {
    if(checkF == true) {
        if(timer() == 0) {
            timeCounter = 0;
            timeLeft = 0;
            game.paused = true;
        }
        player.alpha = 1 - 1/timeLeft;
    }
}

/*life handler function*/
function playerLosesLife() {
    if(player.alpha == 1) {
        currentLifes--;
        player.alpha = 0.99;
        lives.frame = 5 - currentLifes;
        //backgroundS.stop();
        deathS.play();
        player.animations.stop();
        player.body.enable = false;
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        game.time.events.add(Phaser.Timer.SECOND * 2.5, function() {
            if(currentLifes > 0) {
                checkPoint();
            }
            if(currentLifes <= 0) {
                backgroundS.stop();
                game.time.events.add(Phaser.Timer.SECOND, function() {
                    game_overS.play();
                });
                game.time.events.add(Phaser.Timer.SECOND * 5, function() {
                    game.paused = true;
                    alert('Game Over :(\n\n Press the f5 or the restart game button '
                    +'to start over!\n\nPLayer status\n'
                    +'kills: ' +kills +'\ncoins: ' +score);
                });
            }
        });
        score -= 5;
        if(score < 0) {
            score = 0;
        }
    }
}

/*players movements and views*/
function playerMoves() {
    /*if player is alive*/
    if (player.body.enable == true) {
		//mario stops
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {  //mario walks right
            player.body.velocity.x = -90;
            player.animations.play('walkLeft');
            player.goesRight = false;
        }
        else if (cursors.right.isDown) {    //mario walks left
            player.body.velocity.x = 90;
            player.animations.play('walkRight');
            player.goesRight = true;
        }
        else {  //optikh gwnia gia to ean stamathsei analoga me th poreia tou
            player.animations.stop();
            if (player.goesRight) {
                player.frame = 2;
            }
            else {
                player.frame = 4;
            }
        }

        //mario jumps
        if (cursors.up.isDown && player.body.onFloor()) {
            jumpS.play();
            player.body.velocity.y = -190;
            player.animations.stop();
        }

        //change sprite view when jumps
        if (player.body.velocity.y != 0) {
            if (player.goesRight == true) {
                player.frame = 1;
            }
            else if(player.goesRight == false) {
                player.frame = 5;
            }
        }
	}
}

//checkpoints
function checkPoint() {
    if(checkP == true) {
       if(currentStage == 1 && player.x > 952) {
            player.x = 952;
            player.y = 161;
        }
        else if(currentStage == 2 && player.x > 406) {
            player.x = 406;
            player.y = 95;
        }
        else if(currentStage == 3 && player.x > 704) {
            player.x = 705;
            player.y = 96;
        }
    }
    else if(checkP == false){
        player.x = 10;
        player.y = game.world.height - 100;
    }

    game.paused = false;
    player.body.enable = true;
    player.goesRight = true;
    
    game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
        player.alpha = 1;
    });
}

/**********************************************************/

function pause() {
    game.paused = true;
	if(player.body.enable == true) {			
		alert('Game is paused\n\n press Ok to continue');
	}
    game.paused = false;
}

function restart() {
	if(player.body.enable == false) {
        location.reload();
	}
}

function onLoad() {
	alert('Welcome to the game');
}
