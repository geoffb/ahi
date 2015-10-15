var images = require("../images");

var exports = module.exports = function SpriteRender (conf) {
	this.sourceX = conf.sourceX;
	this.sourceY = conf.sourceY;
	this.sourceWidth = conf.sourceWidth;
	this.sourceHeight = conf.sourceHeight;
};

var proto = exports.prototype;

proto.render = function SpriteRender_render (ctx) {
	var image = images.get("media/images/items2.png");
	ctx.drawImage(
		image,
		this.sourceX, this.sourceY,
		this.sourceWidth, this.sourceHeight,
		-this.sourceWidth / 2, -this.sourceHeight / 2,
		this.sourceWidth, this.sourceHeight
	);
};
