
var PreloadState={

    preload:function(){


        preload_Player();
              
        preload_Fire();
            
        preload_coins();
        
        game.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
            
        game.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
            
        game.load.spritesheet('heart','assets/lives.png'); 

        game.load.audio('GMusic',['audio/smb_main-theme.mp3']);
            
        game.load.audio('SCoin','audio/coin.wav');
            
        game.load.audio('Sjump','audio/jump.wav');
            
        game.load.audio('Sstomp','audio/stomp.wav');

        game.load.audio('collectMushroom',['audio/mushroomSpawn.mp3','audio/mushroomSpawn.ogg']);
            
           // game.load.audio('kissP','audio/kissPrincess.wav');

        game.load.audio('bonus',['audio/bonus.mp3','audio/bonus.ogg']);

        game.load.audio('MarioDeath',['audio/MarioDeath.mp3','audio/MarioDeath.ogg']);

        game.load.audio('kissP','audio/kiss1.wav');
            
        game.load.spritesheet('lives','assets/lives.png',9,8); 

        game.load.image('redButton','assets/redButton.png');

        game.load.spritesheet('levels','assets/levels.png',64,64);

        game.load.image('inviWall','assets/invisible_wall2.png');

        game.load.image('marioBG', 'assets/cloudBG.jpeg');

            questionBlock_preload();

            shroom_preload();

            pirana_preload();

            preload_ghost();

            preload_princess();

    }
    ,
    create:function(){

        Phaser.Canvas.setImageRenderingCrisp(game.canvas);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        cursors = game.input.keyboard.createCursorKeys();
       game.state.start(MENU_STATE,true,false); //change here
    }
    ,
    update:function(){
        
    }

};