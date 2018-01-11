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
var level = ['super_mario_map0', 'super_mario_map1', 'super_mario_map2', '2015077'];
var levelScore = [];
var levelLocked = [];
var finishLevel = level.length-1;
var max_level = currentLevel;

//text
var score_text;
var time_event_text;

//check vars for events
var checkB;
var checkF;
var checkP;
var checkT;
var firstGame = true;
var enableEnemyPhysics;

//bonus
var bonus_type = ["2x coins", "2x kills", "invisible"];
var currentBonus;
var currentBonusScoreEffect;

//ufo
var ufoRange = 85;
var fireRate = 1450;
var nextFire;

//time vars
var timeCounter = 0;
var timeLeft = 0;
var gameTime = 0;
var gameTimeCounter = 0;

var checkPointX;
var checkPointY;
var teleportX;
var teleportY;

//boot state
var dificulty_text;
var mute_text;
var isDificultyPressed = false;
var isMuteBPressed = false;
var mute_state;
var isDificultyBPressed = false;

//buttons
var playB, levelsB, helpB, settingsB;
var level_zero_B, level_one_B, level_two_B, level_three_B
var continueB, dificultyB, normalB, hardB, survivalB, muteB;

var startXY = {
    x:10,
    y:140
}

var scoreXY = {
    x:45,
    y:1
}

var clockXY = {
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
/*
var spritesSheet = {
    score:0,
    bonus:1,
    teleportD:2,
    teleportD:3,
    finish:4,
    mushroom:5
}
*/
Game.bootState.prototype = {
    create:function(game) {
        game.state.start('load');
    }
};
