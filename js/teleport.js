
function init_teleports(){
    teleportTime=0; //mas epitrepsei na kanoume tp!
    teleports=game.add.group();
    teleports.enableBody=true;
    this.canTeleport=true;
    map.createFromTiles(5,null,'inviWall','teleport',teleports);
    teleports.alpha=0.01; 
    teleports.setAll('anchor.x',-0.5);
    teleports.sort('x');
    var pipecounter=0;
    var teleChildren=teleports.children;
    teleports.children.forEach(function(telesprite){  
        telesprite.id=pipecounter;
        
        if(telesprite.id % 2===0){
            telesprite.backId=-1;

            if(pipecounter+1 < teleChildren.length){
                telesprite.nextX=teleChildren[pipecounter+1].x;
                telesprite.nextY=teleChildren[pipecounter+1].y;           
             }
        }
        else{
            telesprite.backId=telesprite.id-1;
            telesprite.nextX=teleChildren[pipecounter-1].x;
            telesprite.nextY=teleChildren[pipecounter-1].y;
        }

        pipecounter++; 

    },this);
    
    this.teleportedId=-1; 
}

function teleportPlayer(){

    if(!canTeleport){
        game.time.events.add(Phaser.Timer.SECOND,function(){
            
            canTeleport=true;
        
        });
        return;
    }

    var telesprites=teleports.children;

    for(var c=0;c<telesprites.length;c++){

        if(game.physics.arcade.overlap(player,telesprites[c],function(player,telesprite){
            
                    player.x=telesprite.nextX;
            
                    player.y=telesprite.nextY;
                })){
                    canTeleport=false;
                    break;
                }
    }
    
    }
