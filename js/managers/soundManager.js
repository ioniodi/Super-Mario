var soundManager = new Object();

var mute = "off";
var muteC = 0;
var sound;

soundManager.playSound = function(game, sound) {
    if(mute == "off") {
        sound.play();
    }
    else if(mute == "on") {
        sound.stop();
    }
};

soundManager.soundControl = function(game) {
    muteC++;
    if(muteC == 10000 || muteC < 0) {
        muteC = 0;
    }

    if(muteC % 2 == 0) {
        mute = "off";
    }
    else if(muteC % 2 == 1) {
        mute = "on";
    }

    game.time.events.add(Phaser.Timer.SECOND*0.3, function() {
        soundManager.playSound(game, backgroundS);
    });
    
    return mute;
};
