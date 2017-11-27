var Game = {};

Game.bootState = function(game) {
    
};

var me = 'by jimtria';

var currentLifes = 5;
var score = 0;
var dificulty = "normal";
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

//check vars for events
var checkB = false;
var checkF = false;
var checkP = false;
var checkT = false;
var firstGame = true;
var enableEnemyPhysics = true;

//bonus
var currentBonus = 0;
var bonus_type = ["2x coins", "2x kills", "invisible"];
var currentBonusScoreEffect = 1;

//ufo
var ufoRange = 85;
var fireRate = 1450;
var nextFire;

//countdown timer
var timeCounter = 0;
var timeLeft = 0;

var checkPointX = 0;
var checkPointY = 0;
var teleportX = 0;
var teleportY = 0;

//buttons
var playB, levelsB, helpB, settingsB;
var level_zero_B, level_one_B, level_two_B, level_three_B
var continueB, dificultyB, normalB, hardB, survivalB, muteB;

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

var visibleObject = {
    true:1,
    cheat:0.99,
    mid:0.45,
    false:0.0001
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
