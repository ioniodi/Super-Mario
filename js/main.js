/*****************************************************
* By Jim
*****************************************************/

var game = new Phaser.Game(256, 240, Phaser.CANVAS, '', {
	preload : preload,
	create : create,
	update : update,
}, false, false);

//loads sprites from spritesheets
function preload() {

	//  We need this because the assets are on github pages
	//  Remove the next 2 lines if running locally
	//game.load.baseURL = 'https://DimitrisTria.github.io/SuperMario/';
	//game.load.crossOrigin = 'anonymous';

    //load sptites
	game.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16, 16);
	game.load.spritesheet('goomba', 'assets/sprites/enemies/goomba.png', 16, 16, 3);
	game.load.spritesheet('player', 'assets/sprites/player/player.png', 14, 16, 7);
	game.load.spritesheet('rotated_coin', 'assets/sprites/rotated_coin.png', 14, 16);
    game.load.spritesheet('fireball', 'assets/sprites/enemies/fireball.png', 15, 21);
    game.load.spritesheet('lives', 'assets/sprites/lives.png', 49, 8, 6);
    game.load.spritesheet('score', 'assets/sprites/score.png', 14, 16);
    game.load.spritesheet('bonus_star', 'assets/sprites/bonus_star.png', 16, 16);
    game.load.spritesheet('mushroom', 'assets/sprites/mushroom.png', 16, 16);
    game.load.spritesheet('checkpoint', 'assets/sprites/checkpoint.png', 16, 16);
    game.load.spritesheet('finish', 'assets/sprites/finish.png', 14, 14);

    //load tilemap
    game.load.tilemap('level', 'assets/levels/super_mario_map' +currentStage +'.json', null, Phaser.Tilemap.TILED_JSON);

    //load audio
    game.load.audio('jumpS', 'assets/audio/jump.wav', true);
    game.load.audio('coinS', 'assets/audio/smb_coin.wav', true);
    game.load.audio('stompS', 'assets/audio/smb_stomp.wav', true);
    game.load.audio('deathS', 'assets/audio/smb_mariodies.wav', true);
    game.load.audio('game_overS', 'assets/audio/smb_game_over.wav', true);
    game.load.audio('checkpointS', 'assets/audio/key.wav', true);
    game.load.audio('doubleCoinS', 'assets/audio/coin.wav', true);
    game.load.audio('doubleKillS', 'assets/audio/stomp.wav', true);
    game.load.audio('backgroundS', ['assets/audio/bgm.mp3', 'assets/audio/bgm.ogg'], true);

    game.load.bitmapFont('font', 'assets/sprites/font.png', 'assets/sprites/font.xml');
}

var kills = 0;
var score_text;
var score = 0;
var bonus_type_text;
var bonus_type = ["2x coins", "2x kills score", "invisible"];
var info_text = [];
var currentBonus = 0;
var currentBonusScoreEffect = 0;
var checkB = false;
var currentLifes = 5;
var enableEnemyPhysics = true;
var checkP = false;
var timeCounter = 0;
var timeLeft = 0;
var checkF = false;
var firstGame = true;
var checkTelport = false;

var currentStage = 2;
var stageColor = ['3399FF', '3399FF', '#33CCAA', '#33CCAA'];

var startCor = {
    x:10,
    y:140
}

var scoreCor = {
    x:70,
    y:0
}

var bonusCor = {
    x:120,
    y:0
}

function create() {
	Phaser.Canvas.setImageRenderingCrisp(game.canvas);
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = stageColor[currentStage];

    //Game stills run
    //this.stage.disableVisibilityChange = true;

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
	player = game.add.sprite(startCor.x, startCor.y, 'player');
	game.physics.arcade.enable(player);
	player.body.gravity.y = 370;
	player.body.collideWorldBounds = true;
	player.animations.add('walkRight', [ 0, 1, 2 ], 8, true);
	player.animations.add('walkLeft', [ 4, 5, 6 ], 8, true);
    player.goesRight = true;
    player.anchor.set(0.5);
    //camera follows player
    game.camera.follow(player);

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

    finishs = game.add.group();
    finishs.enableBody = true;
    map.createFromTiles(6, null, 'finish', 'stuff', finishs);
    finishs.alpha = 0.0001;

    //create lives
    lives = game.add.sprite(0, 0, 'lives');
    lives.frame = 5 - currentLifes;
    lives.fixedToCamera = true;

    //create sprite and text for score and bonus
    score = game.add.sprite(scoreCor.x, scoreCor.y, 'score');
    score.scale.setTo(0.7, 0.7);
    score.fixedToCamera = true;
    score = 0;
    score_text = game.add.bitmapText(scoreCor.x+15, scoreCor.y+1, 'font', '0', 12);
    score_text.fixedToCamera = true;
    bonus = game.add.sprite(bonusCor.x, bonusCor.y, 'bonus_star');
    bonus.scale.setTo(0.7, 0.7);
    bonus.fixedToCamera = true;
    bonus_type_text = game.add.bitmapText(bonusCor.x+15, bonusCor.y+1,'font', '0', 12);
    bonus_type_text.fixedToCamera = true;
    bonus_type_text.text = currentBonus = "none  0";

    //add audio
    jumpS = game.add.audio('jumpS', 0.08);
    coinS = game.add.audio('coinS', 0.12);
    stompS = game.add.audio('stompS', 0.12);
    deathS = game.add.audio('deathS', 0.2);
    game_overS = game.add.audio('game_overS', 0.2);
    checkpointS = game.add.audio('checkpointS', 0.4);
    doubleCoinS = game.add.audio('doubleCoinS', 0.12);
    doubleKillS = game.add.audio('doubleKillS', 0.12);
    backgroundS = game.add.audio('backgroundS', 0.5);
    backgroundS.play();

    createStageInfo();
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

    //level finish
    levelFinish();

    //teleport
    teleportF();
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
    if(player.body.onFloor() && game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && checkF == false) {
        backgroundS.stop();
        player.body.enable = false;
        alert('Level is finished :)\n\nPLayer status\n'
        +'kills: ' +kills +'\nscore: ' +score);
        checkF = true;
        timeLeft = 3;
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
            checkB = false;
            enableEnemyPhysics = true;
            currentBonus = "none";
            currentBonusScoreEffect = 0;
        }
        bonus_type_text.text = currentBonus +"   " +timer();
    }
}

function enemyPhysics() {
    if(enableEnemyPhysics == true) {
        game.physics.arcade.overlap(player, goombas, goombaOverlap);
        game.physics.arcade.overlap(player, fireballs, fireballOverlap);
    }
    else {}
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

/*life handler function*/
function playerLosesLife() {
    if(player.alpha == 1) {
        currentLifes--;
        player.alpha = 0.95;
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
                    alert('Game Over :(\n\nPLayer status\n'
                    +'kills: ' +kills +'\nscore: ' +score);
                    refresh();
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

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {  //mario walks right
            player.body.velocity.x = -90;
            player.animations.play('walkLeft');
            player.goesRight = false;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {    //mario walks left
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
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.onFloor()) {
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
       if(currentStage == 1) {
            player.x = 952;
            player.y = 161;
        }
        else if(currentStage == 2) {
            player.x = 406;
            player.y = 95;
        }
        else if(currentStage == 3) {
            player.x = 705;
            player.y = 96;
        }
    }
    else if(checkP == false){
        player.x = startCor.x;
        player.y = startCor.y;
    }

	game.paused = false;
	game.time.events.add(Phaser.Timer.SECOND * 0.3, function() {
		player.body.enable = true;
	});
    player.goesRight = true;

    game.time.events.add(Phaser.Timer.SECOND * 0.7, function() {
        player.alpha = 1;
    });
}

function createStageInfo() {
    if(firstGame == true) {
        if(currentStage == 0) {
            info_text[currentStage] = game.add.text(2, 10, "lives", {
                font: "12px Arial",
                fill: "#ffcc00"
            });
            info_text[currentStage].fixedToCamera = true;
            info_text[currentStage] = game.add.text(scoreCor.x, scoreCor.y+10, "score", {
                font: "12px Arial",
                fill: "#ffcc00",
            });
            info_text[currentStage].fixedToCamera = true;
            info_text[currentStage] = game.add.text(bonusCor.x, bonusCor.y+10, "bonus info", {
                font: "12px Arial",
                fill: "#ffcc00",
            });
            info_text[currentStage].fixedToCamera = true;
            info_text[currentStage] = game.add.text(20, 90, "collect coins\n to increase score", {
                font: "10 Arial",
                fill: "#ffcc00",
            });
            info_text[currentStage] = game.add.text(220, 100, "collect mushrooms\n to activate a bonus", {
                font: "10px Arial",
                fill: "#ffcc00",
            });
            info_text[currentStage] = game.add.text(380, 45, "when finish press\n the down arrow", {
                font: "11px Arial",
                fill: "#ffcc00",
            });
            info_text[currentStage] = game.add.text(450, 140, "finish", {
                font: "12px Arial",
                fill: "#ffcc00",
            });
        }
        else if(currentStage == 1) {
            info_text[currentStage] = game.add.text(932, 145, "checkpoint", {
                    font: "12px Arial",
                    fill: "#ffcc00",
            });
            info_text[currentStage] = game.add.text(2018, 125, "finish", {
                font: "12px Arial",
                fill: "#ffcc00",
            });
        }
        else if(currentStage == 2) {
            // info_text[currentStage] = game.add.text(100, 70, "New enemy called fireball\nthat can not be killed", {
                // font: "12px Arial",
                // fill: "#ff0000",
            // });
			info_text[currentStage] = game.add.text(game.world.width - 100, 45, "when finish press\n the down arrow", {
                font: "12px Arial",
                fill: "#ffcc00",
            });
            info_text[currentStage] = game.add.text(770, 160, "finish", {
                font: "12px Arial",
                fill: "#ffcc00",
            });
        }
        else if(currentStage == 3) {
            info_text[currentStage] = game.add.text(1571, 140, "finish", {
                font: "12px Arial",
                fill: "#ffcc00",
            });
        }
    }
}

function teleportF() {
    if(checkTelport == false) {
		//xaxa game.input.keyboard.isDown(Phaser.Keyboard.T)
        if(checkTelport == true) {
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

function levelFinish() {
    if(checkF == true && timeCounter >= 0 && timeLeft >= 0) {
        if(timer() == 0) {
            timeCounter = 0;
            timeLeft = 0;
            game.paused = true;
            nextLevel();
        }

        if(timeLeft > 0) {
           player.alpha = 1 - 1/timeLeft;
        }
    }
}

function nextLevel() {
    currentStage++;
    if(currentStage > 3) {
        alert("You have finished all stages\nWell Done\n");
        currentStage = 1;
    }
    else {
        refresh();
    }
}

/**********************************************************/

function pause() {
    game.paused = true;
}

function resume() {
    game.paused = false;
}

function refresh() {
    location.reload();
}

function onLoad() {
	alert('Welcome to the game');
}
