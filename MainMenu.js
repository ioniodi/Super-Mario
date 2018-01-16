var MainMenu = {

	preload: function() {

		game.load.image('background', 'assets/background_loading.png');
		game.load.image('lvl1', 'assets/button1.png');
		game.load.image('lvl2', 'assets/button2.png');

	},
	
	create: function() {

		var b1;
		var b2;

		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var mm = game.add.image(0, 0, 'background');
		//mm.scale.setTo(0.36,0.36);

		b1 = game.add.button(460 , 470, "lvl1", actionOnClick1, listener, this, function(){
			lives = 3;
			//game.state.start('Level1');
		});
		b1.alpha = 0.6;
		b1.anchor.set(0.5, 0.5);
		b1.onInputOver.add(listener, this);
		b1.onInputOut.add(listener1, this);
		
		b2 = game.add.button(930, 470, "lvl2", actionOnClick2, listener, this, function(){
			lives = 3;
			//game.state.start('Level2');
		});
		b2.alpha = 0.6;
		b2.anchor.set(0.5, 0.5);
		b2.onInputOver.add(listener, this);
		b2.onInputOut.add(listener1, this);

		function actionOnClick1 () {
    		game.state.start('Level1');
		}

		function actionOnClick2 () {
    		game.state.start('Level2');
		}

		function listener (b1, b2) {
			b1.alpha = 1;
			b2.alpha = 1;
		}

		function listener1 (b1, b2) {
			b1.alpha = 0.6;
			b2.alpha = 0.6;
		}	
	},

	update: function(){
		lives = 3;
	}
}	