
//this.game.world.setBounds(0, 0, this.game.width, this.game.height);

//analambanei na fortosei tin epomeni pista gia emas ! 

var NextMapLoader=function(game){
};

NextMapLoader.prototype.init=function(curLevel,playerScore){
        this.curLevel=curLevel;
        this.playerScore=playerScore;
};

NextMapLoader.prototype.create=function(){
            princessSpawned=false;
            if(this.curLevel+1>=MAX_LEVELS){
                this.game.state.start(WON_GAME_STATE,true,false,this.playerScore);
            }
            else{
                this.game.state.start(PLAY_STATE,true,false,this.curLevel+1);
            }
};
