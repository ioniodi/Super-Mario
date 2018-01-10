    function randInt(maxNum){
       	 return Number.parseInt(Math.random() * maxNum);
    }

	function addBonus(){

   					var rndNum=randInt(100);
                    if (rndNum>50 && rndNum<=80 && score>0){
                        score*=2;
                        gameText.text=score+' ScoreDoubled ';
                        game.time.events.add(Phaser.Timer.SECOND,function(){
                           gameText.text=score; 
                        });
                    }    
    
}

    
