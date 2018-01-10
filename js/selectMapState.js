
const LEVEL_DIFF_ZSTARS=1
const LEVEL_DIFF_OSTARS=2
const LEVEL_DIFF_TSTARTS=3
const LEVEL_LOCKED_FRAME=4

var selectMapState=function(game){
}

selectMapState.prototype.preload=function(){
    game.stage.backgroundColor = '#cfcf23d';
};

selectMapState.prototype.create=function(){

    game.add.sprite(0,0,'marioBG');

    //DILOSEIS METABLITON 
    var WCX=400;
    var WCY=300;
    const MAX_MAPS=5; //μέγιστος αριθμος πιστών !
    const MAX_RENDER_ON_X=4 // megistos arithmos tiles pou mporei na kanei render ston aksonaX

    backButton=game.add.button(WCX,game.height-40,'redButton',GoBack,0,0,0);
    backButton.scale.setTo(0.5);
    game.add.text(WCX+20,game.height-40,'go back',{fontSize:'20px',fill:'#000'});

      //na pairno ta dedomena apo kana json ! 
      levelUnlocked=new Array(MAX_MAPS);
      var unclockedLevels=[];
      //tha to alaksoume na pairnei local storage ! 
      for(var c=0;c<MAX_MAPS;c++){
          levelUnlocked[c]=false;
      }

      
    levelUnlocked[0]=true;
    levelUnlocked[1]=true;

    renderSelectMapBlocks(MAX_RENDER_ON_X,MAX_MAPS);


//DILOSEIS SUNARTISEON EDO ! 

//kanei render tis epiloges gia tin pista mas !
function renderSelectMapBlocks(numOnRenderX,totalofBlocks){
    //diloseis metabliton !
   // var levelGroup=game.add.group();    
    var count=totalofBlocks; //p.x na zografisoume 11 tetragona !
    var helperVar=numOnRenderX;
    const TILE_WIDTH=64;
    const TILE_HEIGHT=64;
    var currentY=20;
    var totalcounts=0; //auksanetai kata 1 kafe fora pou zografizoume locked image i pista ! :D
    //diloseis sunartiseon !
    this.levelSprites=[];  
    while(count>0){ //efoson exoun apomeinei tiles na zografisoume ! 
        count-=numOnRenderX; // auta pou afairethikan tha zografiston kata mikos tou aksona X 
        
        if(count<0){
            numOnRenderX=count+helperVar;
        }//if

            for(var c=0;c<numOnRenderX;c++){
               
                var levelSprite=game.add.sprite(100+(c*TILE_WIDTH*1.7),currentY,'levels');
                if(levelUnlocked[totalcounts]){
                    levelSprite.frame=LEVEL_DIFF_OSTARS;    
                }
                else{
                    levelSprite.frame=LEVEL_LOCKED_FRAME;
                }
                
                levelSprite.inputEnabled=true;
                levelSprite.anchor.setTo(0.5,0);
                levelSprite.name=(totalcounts+1);
                levelSprite.nameId=(totalcounts);
                levelSprite.events.onInputDown.add(ClickedMap);
                this.levelSprites.push(levelSprite);
                totalcounts++;
            }
            currentY+=TILE_HEIGHT * 1.5;
    }

   /// return levelGroup;
}


    //gia na katalaboume se poio map patisame ! basika ! 
    function ClickedMap(sprite,pointer){ 

        sprite.alpha=0.5;

        game.time.events.add(Phaser.Timer.SECOND * 0.4 ,function(){
             sprite.alpha=1;
             if(levelUnlocked[sprite.nameId]){
                this.game.state.start(PLAY_STATE,true,false,sprite.nameId);
            }
        });           
    }
    
    function GoBack(){
        game.state.start('MenuState');
    }
};


selectMapState.prototype.update=function(){
    //tipora akoma :
};