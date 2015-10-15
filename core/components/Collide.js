var exports = module.exports = function Collide (conf) {
	this.offsetX = conf.offsetX || 0;
	this.offsetY = conf.offsetY || 0;
	this.width = conf.width || 1;
	this.height = conf.height || 1;
	this.trigger = conf.trigger || false;
};

var proto = exports.prototype;

proto.getBounds = function () {
	var pos = this.entity.transform.position;
	var x = pos.x + this.offsetX - this.width / 2;
	var y = pos.y + this.offsetY - this.height / 2;
	return {
		x: x,
		y: y,
		width: this.width,
		height: this.height,
		right: x + this.width,
		bottom: y + this.height
	};
};

proto.renderGizmo = function (ctx) {
	var x = Math.round(this.offsetX - this.width / 2);
	var y = Math.round(this.offsetY - this.height / 2);
	ctx.strokeStyle = "lightgreen";
	ctx.lineWidth = 2;
	ctx.strokeRect(x, y, this.width, this.height);
};
