var Game = {};

Game.bootState = function(game) {
    
};

var currentLifes = 5;
var score = 0;
var dificulty = 1;
var extraDificulty = 0;
var gameOver = false;
var soundEnable = true;

//level vars
var currentLevel = 0;
//var levelColor = ['3399FF', '3399FF', '#33CCAA', '#33CCAA'];
var level = ['super_mario_map0', 'super_mario_map1', 'super_mario_map2', 'super_mario_map3'];
var levelScore = [];
var levelLocked = [];
var finishLevel = level.length-1;
var max_level = currentLevel;

//text
var score_text;
var bonus_type_text;
var bonus_type = ["2x coins", "2x kills", "invisible"];

//check vars for events
var checkB = false;
var checkF = false;
var checkP = false;
var checkT = false;
var firstGame = true;

//bonus
var currentBonus = 0;
var currentBonusScoreEffect = 1;

var enableEnemyPhysics = true;
var timeCounter = 0;
var timeLeft = 0;

//useful for bonus
var checkPointX = 0;
var checkPointY = 0;
var teleportX = 0;
var teleportY = 0;

var startCor = {
    x:10,
    y:140
}

var scoreCor = {
    x:45,
    y:1
}

var bonusCor = {
    x:95,
    y:1
}

var colors = {
    white:"#FFFFFF",
    red:"#FF0000",
    green:"#00FF00",
    blue:"#0000FF",
    orange:"#FF9933"
}

var buttonFrame = {
    menu_button:0,
    red_button:1,
    green_button:2
}

var levelButtonSize = {
    width:30,
    height:30
}

var menuButtonSize = {
    width:80,
    height:30
}

var spritesSheet = {
    score:0,
    bonus:1,
    teleportD:2,
    teleportD:3,
    finish:4,
    mushroom:5
}

Game.bootState.prototype = {
    create:function(game) {
        game.state.start('load');
    }
};
