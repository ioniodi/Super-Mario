
// function preload_princess(){
//     this.levelEnded=false;
//     this.game.load.atlasJSONHash('princess','assets/princessPeach/princess.png','assets/princessPeach/princess.json');
//     this.princessSpawned=false;
// }

// function init_princess(posx,posy){
//     if(this.princessSpawned)return;
//     princessGroup=game.add.group();
// 	princessGroup.enableBody=true;
//     this.princessSpawned=true;
//     princess=game.add.sprite(posx,posy,'princess');
//     princessGroup.add(this.princess);
//     game.physics.arcade.enable(princess);
//     princess.body.velocity.x=-20;
//     princess.animations.add('wink',['winking1','winking2','winking1','winking2','walking2'],1,false);
//     princess.animations.add('kiss',Phaser.Animation.generateFrameNames('kiss',1,4),1,false);
//     princess.animations.play('wink');
//     princess.frame=6;
//     princess.kissed=false;
//     princess.anchor.setTo(0.5);
//     princess.y=princess.y-5;
// }

// function update_princess(){
//     if(!levelEnded)return;
//     if(!princess.kissed){
//         game.physics.arcade.overlap(player, princess, function(mplayer,mprincess){
//             mprincess.body.velocity.x=0;
//             princess.animations.play('kiss');
//             princess.kissed=true;
//             gameMusic.stop();
//             pKissSound.play();
//             if(princess.kissed){
//                 game.camera.fade('#000000');
//                 game.camera.onFadeComplete.addOnce(function () {
//                     levelEnded=false;
//                     load_next_map=true;
//                 }, this);
//                }
//         });
//     }
// }

function preload_princess(){
    this.levelEnded=false;
    this.game.load.atlasJSONHash('princess','assets/princessPeach/princess.png','assets/princessPeach/princess.json');
    this.princessSpawned=false;
}

function init_princess(){
    console.log('init princess');
    if(this.princessSpawned)return;
    princessGroup=game.add.group();
    princessGroup.enableBody=true;
    this.princessSpawned=true;
    console.log('groups creation !');
    map.createFromTiles(32, null, 'princess', 'stuff', princessGroup);
    princessGroup.callAll('animations.add','animations','wink',['winking1','winking2','winking1','winking2','walking2'],1,false);
    princessGroup.callAll('animations.add','animations','kiss',Phaser.Animation.generateFrameNames('kiss',1,4),1,false);
    princessGroup.callAll('animations.play','animations','wink');
    princessGroup.setAll('body.velocity.x',-20);
    princess=princessGroup.children[0];
    princess.frame=6;
    game.physics.arcade.enable(princess);
    princess.kissed=false;
    princess.anchor.setTo(0.5);
    console.log(princessGroup);
}

function update_princess(){
    if(!levelEnded)return;
    if(!princess.kissed){
        game.physics.arcade.overlap(player, princess, function(mplayer,mprincess){
            mprincess.body.velocity.x=0;
            princess.animations.play('kiss');
            princess.kissed=true;
            gameMusic.stop();
            pKissSound.play();
            if(princess.kissed){
                game.camera.fade('#000000');
                game.camera.onFadeComplete.addOnce(function () {
                    levelEnded=false;
                    load_next_map=true;
                }, this);
               }
        });
    }
}




