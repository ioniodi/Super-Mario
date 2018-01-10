
var mapNames=['super_mario_map1','super_mario_map2'];
const TILE_WIDTH=16;
const TILE_HEIGHT=16;
var load_next_map=false;

//apla fortonoei ena map apo to paixnidi mas ! 
function LoadLevel(lvl){
    this.game.load.tilemap('level', 'assets/'+mapNames[lvl]+'.json', null,
    Phaser.Tilemap.TILED_JSON);
}

function RestartGame(){ 
    this.game.state.start(PLAY_STATE,true,false,PlayState.prototype.getLevel());//start->restart
}

function loadNextMap(){
    var nextLevel=PlayState.prototype.getNextLevel();
    this.game.state.start(PLAY_STATE,true,false,nextLevel);
}

/*
dimiourgei to tilemap mas
orizei me poia tiles tou solid mporoume na kanoume collide!
dimiourgei ta layers mas einai 3 (solid,background,stuff,teleport)
*/
//3-12  7 24
function createMap(lvl){
    this.map =this.game.add.tilemap('level');
    this.map.addTilesetImage('tiles', 'tiles');
    this.map.setCollisionBetween(7, 24, true, 'solid');
    this.layer = map.createLayer('solid');
    this.layer.resizeWorld();
    this.map.createLayer('background');

}