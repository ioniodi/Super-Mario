
function preload_goombas(){
	game.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
	//game.load.image('inviWalls','assets/invisible_wall2.png');
}

function init_goombas(){

			goombas = game.add.group();
			goombas.enableBody = true;    
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);
			goombas.setAll('body.velocity.y',-10);
			goombas.setAll('anchor.x',0.5);
}


function platform_overlap(AIgroup){

	game.physics.arcade.overlap(AIgroup,inviWalls,function(enemy,wall){
			enemy.body.velocity.x=-enemy.body.velocity.x;
		  });
}

function update_goombas(){
	game.physics.arcade.collide(goombas, layer);
	    game.physics.arcade.overlap(goombas,goombas,function(goomba1,goomba2){
		 goomba2.body.velocity.x*=-1.0001;
	});

	platform_overlap(goombas);
}



