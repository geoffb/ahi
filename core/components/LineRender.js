var object = require("../../utils/object");

var exports = module.exports = function (conf) {
	var conf = object.merge(conf, exports.defaults);

	this.points = conf.points;
	this.strokeStyle = conf.strokeStyle;
	this.lineWidth = conf.lineWidth;
	this.lineDash = conf.lineDash;
	this.lineDashOffset = conf.lineDashOffset;
	this.lineJoin = conf.lineJoin;
	this.lineCap = conf.lineCap;
};

exports.defaults = {
	points: [],
	strokeStyle: "black",
	lineWidth: 1,
	lineDash: null,
	lineDashOffset: 0,
	lineJoin: "miter",
	lineCap: "butt"
};

var proto = exports.prototype;

proto.clearPoints = function () {
	this.points.length = 0;
};

proto.addPoint = function (x, y) {
	this.points.push(x, y);
};

proto.render = function (ctx) {
	var points = this.points;
	var len = points.length;
	if (len < 4) { return; }

	ctx.beginPath();
	ctx.moveTo(points[0], points[1]);
	for (var i = 2; i < len; i += 2) {
		ctx.lineTo(points[i], points[i + 1]);
	}

	if (this.lineDash) {
		ctx.setLineDash(this.lineDash);
		ctx.lineDashOffset = this.lineDashOffset;
	}

	ctx.lineWidth = this.lineWidth;
	ctx.lineJoin = this.lineJoin;
	ctx.lineCap = this.lineCap;
	ctx.strokeStyle = this.strokeStyle;
	ctx.stroke();
};
