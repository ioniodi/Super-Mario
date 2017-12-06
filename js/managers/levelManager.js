var levelManager = new Object();

var tempL = -1;

levelManager.controlLevels = function(game, operation) {
    var c = 0;
    levelLocked[0] = 2; //level 0 is unlocked (frames: 2 green (yes) and 1 red (no))
    for(c=1; c<level.length; c++) {
        levelLocked[c] = operation;
    }
};

levelManager.checkLevelAvailability = function(game, level, isAvailable) {
    if(isAvailable == 1) { //not available
        level = -1;
        tempL = 0; //logw arithmhshs spritesheet (blank)
    }
    else {
        tempL = level + 1; //logw arithmhshs spritesheet (preview of levels)
    }

    imageManager.createImage(game, game.width/2, (game.height/2) + 45, 'preview_levels', 0.8, 0.7, tempL, false);

    return level;
};

levelManager.makeDificulty = function(game) {
    if(dificulty == "normal") {
        currentLifes = 5;
        extraDificulty = 1;
    }
    if(dificulty == "hard") {
        currentLifes = 5;
        extraDificulty = 2.1;
    }
    else if(dificulty == "survival") {
        currentLifes = 1;
        extraDificulty = 1;
    }
};

levelManager.updateDificulty = function(game) {
    if(dificulty == "normal") {
        if(!currentLifes == 0) {
            currentLifes++;
        }
        else {}
    }

    if(currentLifes < 0) {
        currentLifes=0;
    }
    if(currentLifes > 5) {
        currentLifes=5;
    }
};

levelManager.createLevelInfo = function(game) {
    if(firstGame == true) {
        if(currentLevel == 0) {
            textManager.createText(game, game.width - 30, 20, "lives", colors.orange, true);
            textManager.createText(game, scoreXY.x+16, scoreXY.y+20, "score", colors.orange, true);
            textManager.createText(game, bonusXY.x+30, bonusXY.y+20, "bonus info", colors.orange, true);
            textManager.createText(game, 44, 90, "collect coins\n to increase score", colors.orange, false);
            textManager.createText(game, 155, 90, "teleports you \nafter 1 second", colors.orange, false);
            textManager.createText(game, 260, 110, "collect mushrooms\n to activate a bonus", colors.orange, false);
            textManager.createText(game, 420, 60, "when finish press\n the down arrow", colors.orange, false);
            textManager.createText(game, 463, 150, "finish", colors.orange, false);
        }
        else if(currentLevel == 1) {
            textManager.createText(game, 959, 151, "checkpoint", colors.red, false);
            textManager.createText(game, 2032, 131, "finish", colors.orange, false);
        }
        else if(currentLevel == 2) {
            textManager.createText(game, 785, 170, "finish", colors.orange, false);
        }
        else if(currentLevel == 3) {
            textManager.createText(game, 1583, 145, "finish", colors.orange, false);
        }
    }
    else {}
};
