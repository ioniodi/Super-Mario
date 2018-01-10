
const MAX_PLAYER_HEARTS=7;

var FATHER=true; // admin :) 


function preload_Player(){
        game.load.spritesheet('Allien','assets/playerpurple.png',16,22);
}

    function init_Player(){
        hurtable=true;
        playerhearts=5;
        freezeplayer=false;
        player=game.add.sprite(16,game.world.height-48,'Allien');
        player.anchor.setTo(0.5);  //και θέτουμε το origin στο κέντρο του!    
        game.physics.arcade.enable(player);
        player.body.gravity.y = 370;
        player.body.collideWorldBounds = true;
        player.animations.add('walkRight', [9,10],10, true);
        player.goesRight = true;
        player.hurtable=true;
        player.freeze=false;
        game.camera.follow(player);
    }

    function freezePlayer(){
        this.freeze=true;
    }

    function endOfLevelOverlap(player,endLevel){
        player.body.velocity.x=0;
    }

    function handle_collisions(){
        
            game.physics.arcade.collide(player, layer);
            game.physics.arcade.collide(player,piranaPipes);
            game.physics.arcade.overlap(player, goombas, goombaOverlap);
            game.physics.arcade.overlap(player, coins, coinOverlap);
            game.physics.arcade.overlap(player,endOfLvl,endOfLevelOverlap);
            
            //if(freezeplayer){
            game.physics.arcade.overlap(player,endOfLvl,function(player,end){
                init_princess();
                freezeplayer=true;
                levelEnded=true;
            });
       // }
    }

    function update_Player(){ 

            player_events();
        
            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                  fire_shoot();
            }
        
        handle_collisions();
    }

    function player_events(){  

        if(this.freezeplayer){
            player.animations.stop();
            return;
        }

            if (player.body.enable) {
				player.body.velocity.x = 0;
                
				if (cursors.left.isDown){
                    player.animations.play('walkRight');
					player.goesRight = false;
                    player.scale.setTo(-1,1);
                    player.body.velocity.x = -90;
                    
				} else if (cursors.right.isDown) {

					player.animations.play('walkRight');
                    player.goesRight = true;
                    player.scale.setTo(1,1);
                    player.body.velocity.x = 90;
				}
                
                else{
                   // player.animations.stop();
                    player.frame=0;

					if (player.goesRight){
                        player.scale.setTo(1,1);
                    }
				  
				     else 
                    {
                         player.scale.setTo(-1,1);
                    }	
                }

				if (cursors.up.isDown && (player.body.onFloor() || player.body.touching.down)) {
                    player.body.velocity.y = -190;
                    player.frame=2;
                    player.animations.stop();
                    Sjump.play();
                }
                
                else if(cursors.down.isDown && !cursors.right.isDown && !cursors.left.isown){
                    //kane ton paikti na skipsi!
                        if(teleportPlayer()==false){
                            player.animations.stop();
                            player.frame=3;
                        }    
                }

				if (player.body.velocity.y != 0){ 
				}
			}
            
        }