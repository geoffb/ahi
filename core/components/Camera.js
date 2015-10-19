var exports = module.exports = function Camera (conf) {
	this.width = conf.width || 640;
	this.height = conf.height || 480;
	this.target = null;
};

var proto = exports.prototype;

proto.update = function (dt) {
	// this.entity.transform.translate(1, 0);
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

// TODO:
// Follow target
// Pan to location
// set/respect bounds
// SHAKE!!
// etc
