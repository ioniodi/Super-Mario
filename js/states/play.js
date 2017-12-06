Game.playState = function(game) {

};

//var test;

Game.playState.prototype = {

    init:function(game) {
        checkP =false;
        checkT = false;
        checkB = false;
        checkF = false;
        currentBonus = 0;
        currentBonusScoreEffect = 1;
        checkPointX = 0;
        checkPointY = 0;
        teleportX = 0;
        teleportY = 0;
        nextFire = 0;
        enableEnemyPhysics = true;
        gameOver = false;
    },

    preload:function(game) {
        //game.stage.backgroundColor = levelColor[currentLevel];
        imageManager.createImage(game, game.width/2, game.height/2, 'gameBackground', 0.45, 0.65, 0, true);
        //load tilemap
        this.load.tilemap('level', 'assets/levels/' +level[currentLevel] +'.json', null, Phaser.Tilemap.TILED_JSON);
    },

    create:function(game) {
        backB = buttonManager.createButton(game, "back", true, 18, 10, 30, 20, function() {
            buttonManager.buttonState(game, max_level, 'boot_menu');
        }, buttonFrame.menu_button, 0.85, true);
        
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

        //create player
        player = game.add.sprite(startXY.x, startXY.y, 'player');
        this.physics.arcade.enable(player);
        player.body.gravity.y = 370;
        player.body.collideWorldBounds = true;
        player.animations.add('walkRight', [ 1, 2, 1, 0], 7, true);
        player.animations.add('walkLeft', [ 5, 6, 5, 4 ], 7, true);
        player.body.enable = true;
        player.goesRight = true;
        this.camera.follow(player);

        //create goombas
        goombas = game.add.group();
        goombas.enableBody = true;
        map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
        goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ], 2*extraDificulty, true);
        goombas.callAll('animations.play', 'animations', 'walk');
        goombas.setAll('body.bounce.x', 1);
        goombas.setAll('body.velocity.x', -20*extraDificulty);
        goombas.setAll('body.gravity.y', 500);

        //create fireball
        fireballs = game.add.group();
        fireballs.enableBody = true;
        map.createFromTiles(3, null, 'fireball', 'stuff', fireballs);
        fireballs.callAll('animations.add', 'animations', 'walk', [ 0, 1, 2 ], 4*extraDificulty, true);
        fireballs.callAll('animations.play', 'animations', 'walk');
        fireballs.setAll('body.bounce.x', 1);
        fireballs.setAll('body.velocity.x', -10*extraDificulty);
        fireballs.setAll('body.gravity.y', 0);

        //create stop sign
        stop_signs = game.add.group();
        stop_signs.enableBody = true;
        map.createFromTiles(5, null, 'stop_sign', 'stuff', stop_signs);
        stop_signs.alpha = visibleObject.false;

        //create mushrooms
        mushrooms = game.add.group();
        mushrooms.enableBody = true;
        map.createFromTiles(9, null, 'mushroom', 'stuff', mushrooms);
        mushrooms.setAll('body.bounce.x', 1);

        //create teleportB
        teleports = game.add.group();
        teleports.enableBody = true;
        map.createFromTiles(8, null, 'teleport', 'stuff', teleports);

        //create checkpoint
        checkpoints = game.add.group();
        checkpoints.enableBody = true;
        map.createFromTiles(7, null, 'checkpoint', 'stuff', checkpoints);

        finishs = game.add.group();
        finishs.enableBody = true;
        map.createFromTiles(6, null, 'finish', 'stuff', finishs);
        finishs.alpha = visibleObject.false;

        //create lives
        lives = game.add.sprite(game.width - 52, 2, 'lives');
        lives.frame = 5 - currentLifes;
        lives.fixedToCamera = true;

        firework = game.add.sprite(game.world.width-game.width/2, (game.height/2) - 13, 'firework');
        firework.scale.setTo(0.7, 0.7);
        firework.anchor.setTo(0.5, 0.5);
        firework.animations.add('fire');
        firework.visible = false;

        //create sprite and text for score and bonus
        score = game.add.sprite(scoreXY.x, scoreXY.y, 'score');
        score.scale.setTo(0.7, 0.7);
        score.fixedToCamera = true;
        score = 0;
        score_text = game.add.bitmapText(scoreXY.x+15, scoreXY.y+1, 'font', score, 12);
        score_text.text = score;
        score_text.fixedToCamera = true;

        bonus = game.add.sprite(bonusXY.x, bonusXY.y, 'bonus_star');
        bonus.scale.setTo(0.7, 0.7);
        bonus.fixedToCamera = true;
        bonus_type_text = game.add.bitmapText(bonusXY.x+15, bonusXY.y+1,'font', score, 12);
        bonus_type_text.fixedToCamera = true;
        bonus_type_text.text = "none  0";

        ufos = game.add.group();
        ufos.enableBody = true;
        map.createFromTiles(4, null, 'ufo', 'stuff', ufos);
        ufos.alpha = visibleObject.true;

        lasers = game.add.group();
        lasers.enableBody = true;
        lasers.createMultiple(50, 'laser');
        lasers.setAll('checkWorldBounds', true);
        lasers.setAll('outOfBoundsKill', true);

        soundManager.playSound(game, backgroundS);
        
        levelManager.createLevelInfo(game);
/*
        test = game.add.sprite(455, 150, 'test', 1);
        test.scale.setTo(0.2,0.2);
        test.animations.add('walk', [ 0, 1, 2 ,3], 8, true);
        //test.animations.add('walk', Phaser.Animation.generateFrameNames('assets/test/', 1, 4, '', 2), 10, true, false);
        test.animations.play('walk');
*/
    },

    update:function(game) {
        
        this.collisions(game);
        this.overlaps(game);

        this.playerMoves(game);
        this.bonusEffect(game);

        ufos.forEach(this.shoot, this);
        
        if(game.input.keyboard.isDown(Phaser.KeyCode.T) && gameOver == false) {
            player.x = 2030;
            player.y = 40
        }
        
        //mushroom effect
        //this.physics.arcade.collide(player, mushrooms);
        //this.physics.arcade.collide(mushrooms, layer);
    },

    //collisions
    collisions:function(game) {
        this.physics.arcade.collide(player, layer);
        this.physics.arcade.collide(goombas, layer);
        this.physics.arcade.collide(fireballs, layer);
    },

    //overlaps
    overlaps:function(game) {
        this.physics.arcade.overlap(player, coins, this.coinOverlap.bind(this));
        this.physics.arcade.overlap(player, mushrooms, this.mushroomOverlap.bind(this));
        this.physics.arcade.overlap(player, teleports, this.teleportOverlap.bind(this));
        this.physics.arcade.overlap(player, checkpoints, this.checkpointOverlap.bind(this));
        this.physics.arcade.overlap(player, finishs, this.finishOverlap.bind(this));
        this.enemyPhysics(enableEnemyPhysics);

        this.physics.arcade.overlap(stop_signs, goombas, this.stopOverlap.bind(this));
        this.physics.arcade.overlap(stop_signs, fireballs, this.stopOverlap.bind(this));

        this.physics.arcade.overlap(player, lasers, this.laserOverlap.bind(this));
    },

    enemyPhysics:function(game) {
        if(enableEnemyPhysics == true) {
            this.physics.arcade.overlap(player, goombas, this.goombaOverlap.bind(this));
            this.physics.arcade.overlap(player, fireballs, this.fireballOverlap.bind(this));
        }
        else {}
    },

    //player collects coins
    coinOverlap:function(player, coin) {
        if(currentBonus == bonus_type[0]) {
            soundManager.playSound(this, doubleCoinS);
        }
        else if(currentBonus != bonus_type[0]) {
            soundManager.playSound(this, coinS);
        }
        this.updateScore(this, 10);
        coin.kill();
    },

    updateScore:function(game, points) {
        score = score + (points * currentBonusScoreEffect);
        score_text.text = score;
    },

    //player killed or overlaps a goomba
    goombaOverlap:function(player, goomba) {
        if (player.body.touching.down) {
            goomba.animations.stop();
            goomba.frame = 2;
            if(currentBonus == bonus_type[1]) {
                soundManager.playSound(this, doubleKillS);
            }
            else if(currentBonus != bonus_type[1]) {
                soundManager.playSound(this, stompS);
            }
            goomba.body.enable = false;
            player.body.velocity.y = -80;
            this.time.events.add(Phaser.Timer.SECOND, function() {
                goomba.kill();
            });
            this.updateScore(this, 15);
        } else {
            this.playerLosesLife(this);
        }
    },

    //player killed by fireball
    fireballOverlap:function(player, fireball) {
        this.playerLosesLife(this);
    },

    stopOverlap:function(stop_sign, object) {
        object.body.velocity.x *= -1;
    },

    //life handler function
    playerLosesLife:function(game) {
        if(player.alpha == visibleObject.true) {
            currentLifes--;
            player.alpha = visibleObject.cheat;
            lives.frame = 5 - currentLifes;
            soundManager.playSound(this, deathS);
            player.animations.stop();
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.body.enable = false;

            game.time.events.add(Phaser.Timer.SECOND*1.3, function() {
                if(currentLifes > 0) {
                    game.setPlayerPosition(this);
                }
                else if(currentLifes <= 0) {
                    gameOver = true;
                    backgroundS.stop();
                    game.time.events.add(Phaser.Timer.SECOND, function() {
                        soundManager.playSound(this, game_overS);
                    });
                    game.time.events.add(Phaser.Timer.SECOND*5, function() {
                        game.state.start('next_level');
                    });
                }
            });

            if(score <= 0) {
                score = 0;
            }
            else if(score > 0) {
                score -= 5;
                score_text.text = score;
            }
        }
    },

    checkpointOverlap:function(player, checkpoint) {
        checkpoint.frame = 1;
        checkP = true;
        checkPointX = checkpoint.x;
        checkPointY = checkpoint.y;
    },

    //setPlayerPosition
    setPlayerPosition:function(game) {
        if(checkP == true) {
            this.setPlayer(game, checkPointX - 15, checkPointY - 10);
        }
        else if(checkP == false){
            this.setPlayer(game, startXY.x, startXY.y);
        }
        
        this.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            player.alpha = visibleObject.true;
        });
        player.goesRight = true;
        player.body.enable = true;
    },

    setPlayer:function(game, x, y) {
        player.x = x;
        player.y = y;
    },

    mushroomOverlap:function(player, mushroom) {
        checkB = true;
        mushroom.kill();
        currentBonus = bonus_type[Math.floor(Math.random() * bonus_type.length)];
        if(currentBonus == bonus_type[0] || currentBonus == bonus_type[1]) {
            currentBonusScoreEffect = 2;
        }
        else if(currentBonus == bonus_type[2]) {
            player.alpha = visibleObject.mid;
            enableEnemyPhysics = false;
        }
        timeLeft = 8;
    },

    //bonus effect
    bonusEffect:function(game) {
        if(checkB == true) {
            if(this.timer(game) == 0) {
                player.alpha = visibleObject.true;
                timeCounter = 0;
                timeLeft = 0;
                checkB = false;
                enableEnemyPhysics = true;
                currentBonus = "none";
                currentBonusScoreEffect = 1;
            }
            bonus_type_text.text = currentBonus +"   " +this.timer(game);
        }
        else {}
    },

    teleportOverlap:function(player, teleport) {
        teleport.kill();
        checkT = true;
        teleportX = teleport.x;
        teleportY = teleport.y;
        this.teleport(this);
    },

    teleport:function(game) {
        game.time.events.add(Phaser.Timer.SECOND*0.15, function() {
            player.body.enable = false;
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        });
        game.time.events.add(Phaser.Timer.SECOND*0.7, function() {
            soundManager.playSound(this, teleportS);
            game.setPlayer(this, teleportX + 230, teleportY - 100);
            player.body.enable = true;
        });
        checkT = false;
    },

    laserOverlap:function(player, laser) {
        if(player.alpha == visibleObject.true) {
            laser.kill();
            this.playerLosesLife(this);
        }
    },

    shoot:function(ufo) {
        if(player.body.enable == true && player.alpha == visibleObject.true)  {
            if(player.x >= ufo.x - ufoRange && player.x <= ufo.x + ufoRange) {
                if (this.time.now > nextFire && lasers.countDead() > 0) {
                    nextFire = this.time.now + fireRate;
            
                    var laser = lasers.getFirstDead();
                    laser.reset(ufo.x+3, ufo.y+3);

                    this.physics.arcade.moveToObject(laser, player, 80);
                    soundManager.playSound(this, laserS);
                }
            }
        }        
    },

    finishOverlap:function(player, finish) {
        if(player.body.onFloor() && this.input.keyboard.isDown(Phaser.KeyCode.DOWN) && checkF == false) {
            backgroundS.stop();
            player.body.enable = false;
            player.animations.stop();
            this.levelFinish(this);
        }
        else {}
    },

    //level finish
    levelFinish:function(game) {
        soundManager.playSound(game, stage_clearS);
        game.time.events.add(Phaser.Timer.SECOND*0.8, function() {
            soundManager.playSound(game, fireworkS);
            game.time.events.add(Phaser.Timer.SECOND*0.11, function() {
                firework.visible = true;
                firework.animations.play('fire', 9);
            });
        });
        game.time.events.add(Phaser.Timer.SECOND * 4, function() {
            game.state.start('next_level');
        });
    },

    //effect countdown timer
    timer:function(game) {
        timeCounter++;
        if(timeCounter == 90) {
            timeLeft--;
            timeCounter = 0;
        }
        return timeLeft;
    },

    //players movements and views
    playerMoves:function(game) {
        //if player is alive
        if (player.body.enable == true) {
            //player stops
            player.body.velocity.x = 0;
            
            if (game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {  //mario walks right
                player.body.velocity.x = -90;
                player.animations.play('walkLeft');
                player.goesRight = false;
            }
            else if (game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {    //mario walks left
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

            //player jumps
            if (game.input.keyboard.isDown(Phaser.KeyCode.UP) && player.body.onFloor()) {
                soundManager.playSound(this, jumpS);
                player.body.velocity.y = -190;
                player.animations.stop();
            }

            //change sprite view when jumps
            if (player.body.velocity.y != 0) {
                if (player.goesRight == true) {
                    player.frame = 0;
                }
                else if(player.goesRight == false) {
                    player.frame = 6;
                }
            }
        }
    },

////////////////////////////////////////////////////////////////////////
// extra
///////////////////////////////////////////////////////////////////////
    pause:function(game) {
        this.paused = true;
    },

    resume:function(game) {
        this.paused = false;
    },

    refresh:function() {
        location.reload();
    }
};
