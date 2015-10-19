var object = require("../../utils/object");

var exports = module.exports = function TextRender (conf) {
	var conf = object.merge(conf, exports.defaults);

	this.text = conf.text;
	this.size = conf.size;
	this.font = conf.font;
	this.textAlign = conf.textAlign;
	this.textBaseline = conf.textBaseline;
	this.fillStyle = conf.fillStyle;
	this.strokeStyle = conf.strokeStyle;
	this.lineWidth = conf.lineWidth;
};

exports.defaults = {
	text: "",
	size: 24,
	font: "sans-serif",
	textAlign: "center",
	textBaseline: "middle",
	fillStyle: "black",
	strokeStyle: null,
	lineWidth: 1
};

var proto = exports.prototype;

proto.render = function TextRender_render (ctx) {
	ctx.font = this.size + "px " + this.font;
	ctx.textAlign = this.textAlign;
	ctx.textBaseline = this.textBaseline;

	if (this.fillStyle) {
		ctx.fillStyle = this.fillStyle;
		ctx.fillText(this.text, 0, 0);
	}

	if (this.lineWidth > 0 && this.strokeStyle) {
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.strokeStyle;
		ctx.strokeText(this.text, 0, 0);
	}
};
