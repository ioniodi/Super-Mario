var imageManager = new Object();

imageManager.createImage = function(game, x, y, spriteName, scaleX, scaleY, spriteFrame, check) {
	var image = game.add.image(x, y, spriteName);
	image.frame = spriteFrame;
	image.scale.setTo(scaleX, scaleY);
	image.anchor.setTo(0.5, 0.5);
	image.fixedToCamera = check;
};
