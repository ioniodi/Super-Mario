var textManager = new Object();

var text;

textManager.createText = function(game, x, y, text, text_color, check) {
    text = game.add.text(x, y, text, {
        font:"12px Arial", 
        fill:text_color, 
        align:"center"
    });
    text.fixedToCamera = check;
    text.anchor.setTo(0.5, 0.5);

    return text;
};
