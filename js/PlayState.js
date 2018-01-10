const MAX_LEVELS=2;

var PlayState=function(game){
    this.pauseGame=false;
};

PlayState.prototype.preload=function(){
    LoadLevel(this.level);
};

//arxiki sunartisi tis PHASER kaleitai prin tin preload ! me autin mporeis na peraseis orismata se ena STATE
PlayState.prototype.init=function(level){
    this.level=level;
};

PlayState.prototype.getLevel=function(){
    return this.level;
};

//na balo kai elenxo gia ta oria diladi min afiseis to game na parei pista pou den uparxei!
PlayState.prototype.AdvanceLevel=function(){
    this.level++;
};

//dimiourgei to PlAYSTATE MAS ! 
PlayState.prototype.create=function(){

    console.log('PS->\n');
    console.log('this.level->',this.level);

    game.scale.setGameSize(256,240);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#5c94fc'; 

    createMap(this.level);
      score=0;
      gameText=null;
      gameMusic=null;
      playerhearts=5;

      gameMusic=game.add.audio('GMusic');
      
      gameMusic.loop=true;
      
      gameMusic.play();
    
      SCoin=game.add.audio('SCoin',0.3,false);   

      pickShroom=game.add.audio('collectMushroom',0.3,false);
      
      //player sounds
      Sjump=game.add.audio('Sjump',0.2,false);
      
      Sstomp=game.add.audio('Sstomp',0.3,false);

      pKissSound=game.add.audio('kissP',0.2,false);
    
      gameText=game.add.text(147,0,'0',{ fontSize: '11px', fill: '#ff1' });
      
      gameText.fixedToCamera=true;

       init_invisibleWalls();

       init_questionBlock();
         
       init_coins();
               
       init_fire();

       init_Player();
               
       init_goombas();
         
       init_piranas();
    
       init_ghosts();
       
       init_hearts();

       init_bullets();

       init_teleports();

       console.log('PS->END_CREATE');
};


PlayState.prototype.update=function(){

    if(load_next_map){
        load_next_map=false;
        princessSpawned=false;
        game.state.start(NEXT_MAP_LOADER_STATE,true,false,this.level,score);
    }

   update_piranas();

   shroom_update();

   update_questionBlock();

   update_Player();
    
   player_events();

   update_goombas();
        
   update_fireShoots();

   update_hearts();

   update_piranas();

   update_ghosts();

   update_princess();
};


    
        
    