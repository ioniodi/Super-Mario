var MenuState=function(game){
};
    
    MenuState.prototype.preload=function(){
        
    };

    MenuState.prototype.create=function(){

        game.scale.setGameSize(800,600);

        actionClick=function()
        {
           game.state.start(PLAY_STATE,true,false,randInt(1)); //to 2 deixnei apo pia pista tha ksekinisoume!
        }

        levelSelectClick=function(){
            game.state.start(SELECT_MAP_STATE); 
        }

        game.add.sprite(0,0,'marioBG'); 
        game.stage.backgroundColor = '#cfcf23d';

        var WCX=400;
        var WCY=300;
        const MAX_OPTIONS=2;
        const FONT_SIZE=20;

       gameText=game.add.text(WCX,0,' Choose Map',{ fontSize: '22px', fill: '#000' });
       
       button=new Array(MAX_OPTIONS);
       text=new Array(MAX_OPTIONS);
       var strings=['play','selMap'];
       functions=[actionClick,levelSelectClick,actionClick];

        //2 buttons,texts
      for(var c=0;c<button.length;c++){
            button[c]=game.add.button(WCX-70,WCY-50+c*40,'redButton',functions[c],2,1,0);
            button[c].scale.setTo(0.5);
            text[c]=game.add.text(WCX-60,WCY-50+c*40,strings[c],{fontSize:'20px',fill:'#000'});
      }

    };
    

    MenuState.prototype.update=function(){
                
    };


    






