var GameOver=function(game){
};
    
GameOver.prototype.preload=function(){
        //adding.background();
        //adding win game message
        //button go back to menu !
    };

    GameOver.prototype.init=function(playerScore){
        this.playerScore=playerScore;
    };

    GameOver.prototype.create=function(){
        game.scale.setGameSize(800,600);
        var WCX=800/2;
        var WCY=600/2;
        game.add.sprite(0,0,'marioBG'); 
        GameOverText=game.add.text(WCX,WCY-70,'GAMEOVER YOUR SCORE='+this.playerScore+'\n',{ fontSize: '25px', fill: '#000' });
        GameOverText.anchor.x=0.5;
        MenuButton=game.add.button(WCX-50,WCY,'redButton',GoBack,0,0,0);
        menuButtonText=game.add.text(WCX-45,WCY,'MainMenu',{ fontSize: '25px', fill: '#fef' });
        restartButton=game.add.button(WCX-50,WCY+50,'redButton',Restart,0,0,0);
        GameOverText=game.add.text(WCX,WCY+50,'Restart',{ fontSize: '25px', fill: '#fef' });
        GameOverText.anchor.x=0.5;
        function GoBack(){
            game.state.start(MENU_STATE);
        }
        function Restart(){
            RestartGame();
        }
};
