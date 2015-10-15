var exports = module.exports = function ShapeRender (conf) {
	this.points = conf.points || null;
	this.fillStyle = conf.fillStyle || "black";
	this.strokeStyle = conf.strokeStyle || null;
	this.lineWidth = conf.lineWidth || 1;
};

var proto = exports.prototype;

proto.render = function ShapeRender_render (ctx) {
	// Shape path
	var points = this.points;
	ctx.beginPath();
	ctx.moveTo(points[0], points[1]);
	for (var i = 2, j = points.length; i < j; i += 2) {
		ctx.lineTo(points[i], points[i + 1]);
	}
	ctx.closePath();

	// Fill
	if (this.fillStyle) {
		ctx.fillStyle = this.fillStyle;
		ctx.fill();
	}

	// Stroke
	if (this.lineWidth > 0 && this.strokeStyle) {
		ctx.strokeStyle = this.strokeStyle;
		ctx.lineWidth = this.lineWidth;
		ctx.stroke();
	}
};
