


const QUESTION_BLOCK='questionBlock';
const QUESTION_BLOCK_ID=17; // ? 

function questionBlock_preload(){
     this.game.load.atlasJSONHash('questionBlock','assets/QuestionBlock.png','assets/QuestionBlock.json');
}

function init_questionBlock(){
    
    questionGroup=game.add.group();
    questionGroup.enableBody=true;


    map.createFromTiles(QUESTION_BLOCK_ID, null, 'questionBlock', 'solid', questionGroup);
    
    questionGroup.setAll('body.immovable',true);
    questionGroup.setAll('body.moves',false);

    questionGroup.callAll('animations.add', 'animations', 'flash',Phaser.Animation.generateFrameNames('questionBlock',1,3),
             2, true);
    questionGroup.callAll('animations.add','animations','pick',['Block']); 

    questionGroup.callAll('animations.play','animations','flash');

}

function questionBoxCollision(player,questionBoxSprite){

    if(player.body.touching.up && questionBoxSprite.name!='O'){    

        questionBoxSprite.animations.play('pick');        

        questionBoxSprite.name='O';

        shroom_create(questionBoxSprite.x,questionBoxSprite.y-15);
    }

}

//check overlap with the player ! 
function update_questionBlock(){
    game.physics.arcade.collide(player,questionGroup,questionBoxCollision);
}