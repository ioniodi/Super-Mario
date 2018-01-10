const endOfLvlID=5;
const inviWallsID=5; //51 55

function init_invisibleWalls(){

    inviWalls=game.add.group();
    inviWalls.enableBody=true;
    map.createFromTiles(inviWallsID,null,'inviWall','stuff',inviWalls);
    inviWalls.alpha=0.01;
    
    endOfLvl=game.add.group();
    endOfLvl.enableBody=true;
    map.createFromTiles(endOfLvlID,null,'inviWall','endlevel',endOfLvl);
    endOfLvl.alpha=0.01;
}

