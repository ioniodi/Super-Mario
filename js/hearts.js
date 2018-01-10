
function heartPos(index){
   var heartPos={x:10+index*15,y:0};
    return heartPos;
}

function init_hearts(){

            this.pHearts=new Array(MAX_PLAYER_HEARTS);

            //dimiourgei tis kardies mas !
            for(var c=0;c<MAX_PLAYER_HEARTS;c++){
                var nextPos=heartPos(c);
               this.pHearts[c]=game.add.sprite(10+c*15,0,'lives');
                this.pHearts[c].fixedToCamera=true;
                this.pHearts[c].anchor.setTo(-0.5);
            }

            for(var c=0;c<playerhearts;c++){
                this.pHearts[c].frame=2;
            }
            for(var c=playerhearts;c<MAX_PLAYER_HEARTS;c++){
                if(c<0){
                    console.log("OUT OF BOUNDS");
                    return;
                }
                this.pHearts[c].frame=1;
            }

    }

        function update_hearts(){
            
            if(playerhearts>MAX_PLAYER_HEARTS)
            {
                playerhearts=MAX_PLAYER_HEARTS;
            }
            for(var c=0;c<playerhearts;c++){
                 this.pHearts[c].frame=2;
            }
            for(var c=playerhearts;c<MAX_PLAYER_HEARTS;c++){
                if(c<0){
                    c=0;
                    console.log("out of bounds");
                }
                this.pHearts[c].frame=1;
            }
        }

