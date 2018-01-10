
/*
function create_pause() {

    var WCX=game.world.centerX;
    var WCY=game.world.centerY;

    // Create a label to use as a button
    pause_label = game.add.text(WCX-100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
    game.paused = true;

        // Then add the menu
    menu = game.add.sprite(WCX/2, WCY/2, 'menu');
    menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
     choiseLabel = game.add.text(WCX/2, WCY-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
     choiseLabel.anchor.setTo(0.5, 0.5);
    });

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause,this);
}
    // And finally the method that handels the pause menu
    function unpause(event){
        // Only act if paused
    }

    */