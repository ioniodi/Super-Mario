
/*PRINTS CONGRATULATIONS FOR FINISHING MY GAME! */
var WonGame=function(game){
};
    
WonGame.prototype.preload=function(){
        //adding.background();
        //adding win game message
        //button go back to menu !
    };

    WonGame.prototype.init=function(playerScore){
        this.playerScore=playerScore;
    };
    
    WonGame.prototype.create=function(){
        console.log('You  won game yay!');
        game.scale.setGameSize(800,600);
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        var WCX=game.world.centerX;
        var WCY=game.world.centerY;
        game.add.sprite(0,0,'marioBG'); 
        wonGameText=game.add.text(WCX,WCY-70,'CONGRATULATIONS YOU WON SCORE='+this.playerScore,{ fontSize: '25px', fill: '#000' });
        wonGameText.anchor.x=0.5;
        MenuButton=game.add.button(WCX-50,WCY,'redButton',GoBack,0,0,0);
        menuButtonText=game.add.text(WCX-45,WCY,'MainMenu',{ fontSize: '25px', fill: '#fef' });
        function GoBack(){
            game.state.start(MENU_STATE);
        }

};
