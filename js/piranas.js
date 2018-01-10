
const PIRANAS_TILED_ID=4;
const PIRANA_PLANT='piranaPlant';

function pirana_preload(){
	this.game.load.atlasJSONHash('piranaPlant','assets/PiranaPlant.png','assets/PiranaPlant.json');
	this.game.load.spritesheet('pipe', 'assets/pipe.png');
}

function init_piranas(){

		piranaGroup=game.add.group();
		piranaGroup.enableBody=true;
		piranaPipes=game.add.group();
		piranaPipes.enableBody=true;

		 map.createFromTiles(PIRANAS_TILED_ID, null, 'piranaPlant', 'stuff', piranaGroup);
		 map.createFromTiles(22,null,'pipe','pipes',piranaPipes);

		piranaGroup.callAll('animations.add', 'animations', 'eat',['eat0','eat1'],2,true);	
		piranaGroup.callAll('animations.play','animations','eat');
		piranaGroup.setAll('anchor.x',-0.5);
		piranaGroup.setAll('body.velocity.y',5);
		piranaGroup.setAll('anchor.y',0);
		piranaGroup.setAll('body.immovable',true);
		piranaPipes.setAll('body.immovable',true);
		piranaPipes.setAll('anchor.y',0.5);

		 var sprite=piranaGroup.children;

		 sprite.forEach(function(plant){
				game.physics.arcade.enable(plant);
				plant.body.enable=true;
				plant.goesDown=true;
				plant.initialYPos=plant.y;			
			},this);

		}

function update_piranas(){

	var sprite=piranaGroup.children;

	sprite.forEach(function(plant){
		if(plant.y>plant.initialYPos+15){
			plant.body.velocity.y=-5;
		}else if(plant.y<=plant.initialYPos-6){
			game.physics.arcade.collide(player,plant,plantOverlap); //overlap
			plant.body.velocity.y=0;
			game.time.events.add(Phaser.Timer.SECOND * (3+randInt(2))  , function(){            
					plant.body.velocity.y=5;
				});
		}
	}
	, this);
}





