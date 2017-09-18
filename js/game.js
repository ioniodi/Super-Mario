/**
 * 
 */
var game = new Phaser.Game(256, 240, Phaser.CANVAS, '');

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('lose', loseState);

game.state.start('load');
