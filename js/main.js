
        var playerBonus=false;
        const PLAY_STATE='PlayState';
        const PRELOAD_STATE='PreloadState';
        const MENU_STATE='MenuState';
        const SELECT_MAP_STATE='selectMapState';
        const WON_GAME_STATE='WonGameState';
        const MAX_NUM_MAPS=2;
        const GAME_OVER_STATE='GameOver';
        const NEXT_MAP_LOADER_STATE='NextMapLoader';
        const BOOTSTATE='bootState';

        var game = new Phaser.Game(800,600, Phaser.CANVAS, '');
        //game.state.add('bootState',BootState);
        game.state.add(NEXT_MAP_LOADER_STATE,NextMapLoader);
        game.state.add('PlayState',PlayState);
        game.state.add('PreloadState',PreloadState);
        game.state.add('MenuState',MenuState);
        game.state.add('selectMapState',selectMapState);
        game.state.add('WonGameState',WonGame);
        game.state.add('GameOver',GameOver);
        game.state.start('PreloadState');
       // game.state.start('bootState'); 

