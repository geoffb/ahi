var object = require("../../utils/object");

var exports = module.exports = function Camera (conf) {
	var conf = object.merge(conf, exports.defaults);

	this.width = conf.width;
	this.height = conf.height;
	this.target = null;
};

exports.defaults = {
	width: 1280,
	height: 720
};

var proto = exports.prototype;

proto.update = function (dt) {
	if (this.target) {
		var pos = this.entity.transform.position;
		pos.x = this.target.transform.position.x;
		pos.y = this.target.transform.position.y;
	}
};

proto.follow = function (target) {
	this.target = target;
};

Object.defineProperty(proto, "viewportX", {
	get: function () {
		return Math.round(this.entity.transform.position.x - this.width / 2);
	}
});

Object.defineProperty(proto, "viewportY", {
	get: function () {
		return Math.round(this.entity.transform.position.y - this.height / 2);
	}
});

Object.defineProperty(proto, "viewportAABB", {
	get: function () {
		return {
			x: this.viewportX,
			y: this.viewportY,
			width: this.width,
			height: this.height
		};
	}
});
