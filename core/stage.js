var canvas = null;
var ctx = null;

exports.init = function (width, height) {
	canvas = document.createElement("canvas");
	exports.resize(width, height);
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
};

exports.resize = function (width, height) {
	canvas.width = width;
	canvas.height = height;
};

exports.clear = function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

exports.fill = function (fillStyle) {
	ctx.fillStyle = fillStyle;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};

exports.getContext = function () {
	return ctx;
};
