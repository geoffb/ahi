var Vector2 = require("../../math/Vector2");

var exports = module.exports = function Transform (conf) {
	this.position = new Vector2(conf.x, conf.y);
	this.scale = new Vector2(conf.scaleX, conf.scaleY);
	this.rotation = conf.rotation || 0;
};

var proto = exports.prototype;

proto.translate = function (x, y) {
	var pos = this.position;
	pos.x += x;
	pos.y += y;
};

proto.render = function Transform_render (ctx) {
	var pos = this.position;
	ctx.translate(pos.x, pos.y);

	if (this.rotation > 0) {
		ctx.rotate(this.rotation);
	}

	var scale = this.scale;
	if (scale.x !== 1 || scale.y !== 1) {
		ctx.scale(scale.x, scale.y);
	}
};
