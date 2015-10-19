var Vector2 = require("../../math/Vector2");
var object = require("../../utils/object");

var exports = module.exports = function Transform (conf) {
	var conf = object.merge(conf, exports.defaults);

	this.position = new Vector2(conf.position.x, conf.position.y);
	this.scale = new Vector2(conf.scale.x, conf.scale.y);
	this.rotation = conf.rotation;
	this.worldSpace = conf.worldSpace;
};

exports.defaults = {
	position: {
		x: 0,
		y: 0
	},
	scale: {
		x: 1,
		y: 1
	},
	rotation: 0,
	worldSpace: true
};

var proto = exports.prototype;

proto.translate = function (x, y) {
	var pos = this.position;
	pos.x += x;
	pos.y += y;
};

proto.render = function Transform_render (ctx, offsetX, offsetY) {
	var pos = this.position;
	if (this.worldSpace) {
		var x = Math.round(pos.x + offsetX);
		var y = Math.round(pos.y + offsetY);
	} else {
		var x = Math.round(pos.x);
		var y = Math.round(pos.y);
	}

	ctx.translate(x, y);

	if (this.rotation > 0) {
		ctx.rotate(this.rotation);
	}

	var scale = this.scale;
	if (scale.x !== 1 || scale.y !== 1) {
		ctx.scale(scale.x, scale.y);
	}
};
