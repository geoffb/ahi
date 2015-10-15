var exports = module.exports = function Vector2 (x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

var proto = exports.prototype;

proto.clone = function () {
	return new exports(this.x, this.y);
};

proto.set = function (x, y) {
	this.x = x;
	this.y = y;
	return this;
};

proto.add = function (v) {
	this.x += v.x;
	this.y += v.y;
	return this;
};

proto.subtract = function (v) {
	this.x -= v.x;
	this.y -= v.y;
	return this;
};

proto.scale = function (s) {
	this.x *= s;
	this.y *= s;
	return this;
};

proto.normalize = function () {
	var magnitude = this.magnitude;
	if (magnitude === 0) {
		return this;
	} else {
		return this.scale(1 / magnitude);
	}
};

proto.invert = function () {
	return this.scale(-1);
};

proto.zero = function () {
	this.x = 0;
	this.y = 0;
	return this;
};

Object.defineProperty(proto, "magnitude", {
	get: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
});
