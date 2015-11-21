var Vector2 = require("../../math/Vector2");
var object = require("../../utils/object");
var images = require("../images");

var exports = module.exports = function SpriteRender (conf) {
	var conf = object.merge(conf, exports.defaults);
	this.origin = new Vector2(conf.origin.x, conf.origin.y);
	this.width = conf.width;
	this.height = conf.height;
	this.imagePath = conf.imagePath;
};

exports.defaults = {
	origin: {
		x: 0,
		y: 0
	},
	width: 1,
	height: 1,
	imagePath: null
};

var proto = exports.prototype;

proto.render = function SpriteRender_render (ctx) {
	if (!this.imagePath) { return; }
	var image = images.get(this.imagePath);
	ctx.drawImage(
		image,
		this.origin.x, this.origin.y, this.width, this.height,
		-this.width / 2, -this.height / 2, this.width, this.height
	);
};
