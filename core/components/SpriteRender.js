var Vector2 = require("../../math/Vector2");
var object = require("../../utils/object");
var images = require("../images");

var exports = module.exports = function SpriteRender (conf) {
	var conf = object.merge(conf, exports.defaults);
	this.origin = new Vector2(conf.origin.x, conf.origin.y);
	this.anchor = new Vector2(conf.anchor.x, conf.anchor.y);
	this.width = conf.width;
	this.height = conf.height;
	this.imagePath = conf.imagePath;
};

exports.defaults = {
	origin: {
		x: 0,
		y: 0
	},
	anchor: {
		x: 0.5,
		y: 0.5
	},
	width: 1,
	height: 1,
	imagePath: null
};

var proto = exports.prototype;

proto.render = function SpriteRender_render (ctx) {
	if (!this.imagePath) { return; }
	var image = images.get(this.imagePath);

	var destX = -Math.round(this.width * this.anchor.x);
	var destY = -Math.round(this.height * this.anchor.y);

	ctx.drawImage(
		image,
		this.origin.x, this.origin.y, this.width, this.height,
		destX, destY, this.width, this.height
	);
};
