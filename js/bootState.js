var BootState = {
	preload: function(){
        game.load.image('loadingBar','assets/loadingBar.png');
        game.load.image('marioBG', 'assets/cloudBG.jpeg');

        console.log('BOOTSTATE');
	},
	create: function(){
		game.state.start('PreloadState');
	}
}