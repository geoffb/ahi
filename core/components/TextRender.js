var exports = module.exports = function TextRender (conf) {
	this.text = conf.text || "";
	this.size = conf.size || 24;
	this.font = conf.font || "sans-serif";
	this.fillStyle = conf.fillStyle || "black";
	this.strokeStyle = conf.strokeStyle || null;
	this.lineWidth = conf.lineWidth || 1;
};

var proto = exports.prototype;

proto.render = function TextRender_render (ctx) {
	ctx.font = this.size + "px " + this.font;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

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
