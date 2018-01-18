Game.loadState = function(game) {

};

Game.loadState.prototype = {
    
    init:function(game) {
		this.input.maxPointers = 1;
        //this.stage.disableVisibilityChange = true;

        levelManager.controlLevels(game, 1);
        playerStatsManager.resetScores(game, 0);
    },
    
    //loads sprites from spritesheets
    preload:function(game) {
        //  We need game because the assets are on github pages
        //  Remove the next 2 lines if running locally
        //game.load.baseURL = 'https://DimitrisTria.github.io/SuperMario/';
        //game.load.crossOrigin = 'anonymous';
        
        textManager.createText(game, 30, 50, 'loading...', colors.white, false);

        //load sprites
        game.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16, 16);
        game.load.spritesheet('goomba', 'assets/sprites/enemies/goomba.png', 16, 16, 3);
        game.load.spritesheet('player', 'assets/sprites/player/alien.png', 14, 16, 7);
        game.load.spritesheet('rotated_coin', 'assets/sprites/rotated_coin.png', 14, 16);
        game.load.spritesheet('fireball', 'assets/sprites/enemies/fireball.png', 15, 21);
        game.load.spritesheet('lives', 'assets/sprites/left_lives.png', 49, 8, 6);
        game.load.spritesheet('checkpoint', 'assets/sprites/checkpoint.png', 10, 16);
        game.load.spritesheet('firework', 'assets/sprites/firework.png', 241, 244, 10);
        game.load.spritesheet('button', 'assets/sprites/button.png', 100, 50);
        game.load.spritesheet('score', 'assets/sprites/score.png', 14, 16);
        game.load.spritesheet('clock', 'assets/sprites/clock.png', 17, 17);
        game.load.spritesheet('mushroom', 'assets/sprites/mushroom.png', 16, 16);
        game.load.spritesheet('finish', 'assets/sprites/finish.png', 14, 14);
        game.load.spritesheet('teleport', 'assets/sprites/teleport.png', 16, 16);
        game.load.spritesheet('stop_sign', 'assets/sprites/stop_sign.png', 14, 14);
        game.load.spritesheet('ufo', 'assets/sprites/enemies/ufo.png', 18, 18);
        game.load.spritesheet('laser', 'assets/sprites/purple_ball.png');

        //load images
        game.load.image('menuBackground', 'assets/images/menuBackground.jpg');
        game.load.image('gameBackground', 'assets/images/gameBackground.png');
        game.load.spritesheet('preview_levels', 'assets/images/preview_levels.png', 208, 194, 5);
        game.load.image('instructions', 'assets/images/instructions.png');

        //load audio
        game.load.audio('jumpS', 'assets/audio/jump.wav', true);
        game.load.audio('coinS', 'assets/audio/smb_coin.wav', true);
        game.load.audio('stompS', 'assets/audio/smb_stomp.wav', true);
        game.load.audio('deathS', 'assets/audio/death.wav', true);
        game.load.audio('stage_clearS', 'assets/audio/smb_stage_clear.wav', true);
        game.load.audio('game_overS', 'assets/audio/smb_game_over.wav', true);
        game.load.audio('doubleCoinS', 'assets/audio/coin.wav', true);
        game.load.audio('doubleKillS', 'assets/audio/stomp.wav', true);
        game.load.audio('backgroundS', ['assets/audio/bgm.mp3', 'assets/audio/bgm.ogg'], true);
        game.load.audio('clickS', 'assets/audio/click.wav', true);
        game.load.audio('teleportS', 'assets/audio/teleport.wav', true);
        game.load.audio('fireworkS', 'assets/audio/firework_explosion.wav', true);
        game.load.audio('laserS', 'assets/audio/laser.wav', true);
        game.load.audio('mushroomSound', 'assets/audio/mushroomSound.wav', true);

        game.load.bitmapFont('font', 'assets/sprites/font.png', 'assets/sprites/font.xml');

        //game.load.atlasJSONHash('test', 'assets/sprites/unused/test.png', 'assets/test.json');
    },

    create:function(game) {
        Phaser.Canvas.setImageRenderingCrisp(game.canvas);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //add audio
        jumpS = game.add.audio('jumpS', 0.05);
        coinS = game.add.audio('coinS', 0.09);
        stompS = game.add.audio('stompS', 0.13);
        deathS = game.add.audio('deathS', 0.55);
        stage_clearS = game.add.audio('stage_clearS', 0.15);
        game_overS = game.add.audio('game_overS', 0.2);
        checkpointS = game.add.audio('checkpointS', 0.4);
        doubleCoinS = game.add.audio('doubleCoinS', 0.09);
        doubleKillS = game.add.audio('doubleKillS', 0.09);
        backgroundS = game.add.audio('backgroundS', 0.5);
        backgroundS.loopFull();
        clickS = game.add.audio('clickS');
        teleportS = game.add.audio('teleportS', 0.7);
        fireworkS = game.add.audio('fireworkS', 0.7);
        laserS = game.add.audio('laserS', 0.055);
        mushroomSound = game.add.audio('mushroomSound', 0.35);

        game.state.start('boot_menu');
    }
};
