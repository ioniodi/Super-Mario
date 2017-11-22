var soundManager = new Object();

var mute = false;
var muteC = 0;

soundManager.playSound = function(game, sound) {
    if(mute == false) {
        sound.play();
    }
    else if(mute == true) {
        sound.stop();
    }
};

soundManager.soundControl = function(game) {
    muteC++;
    if(muteC == 10000 || muteC < 0) {
        muteC = 0;
    }

    if(muteC % 2 == 0) {
        mute = false;
        game.time.events.add(Phaser.Timer.SECOND*0.4, function() {
            alert('mute: off');
        });
    }
    else if(muteC % 2 == 1) {
        mute = true;
        game.time.events.add(Phaser.Timer.SECOND*0.4, function() {
            alert('mute: on');
        });
    }

    game.time.events.add(Phaser.Timer.SECOND*0.4, function() {
        soundManager.playSound(game, backgroundS);
    });
    
    return mute;
};
