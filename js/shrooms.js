function shroom_preload(){
    this.game.load.spritesheet('shroom','assets/1upMushroom.png');
    this.shrooms=[];
}

function shroom_create(posx,posy){
      mushroom=game.add.sprite(posx,posy,'shroom');
      game.physics.arcade.enable(mushroom);
      mushroom.body.bounce.x=1;
      mushroom.body.velocity.x=60;
      mushroom.body.gravity.y=120;
      mushroom.goesRight=true;
      mushroom.events.onOutOfBounds.add(function(){
          mushroom.kill();
      }, this);
      shrooms.push(mushroom);
}

function shroom_update(){ 
     this.shrooms.forEach(function(shroom) {
        game.physics.arcade.collide(shroom, layer);
        game.physics.arcade.overlap(player,shroom,ShroomOverlap);
     }, this);
}
