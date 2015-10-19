var math = require(".");
var Vector2 = require("./Vector2");

exports.testAABB = function (a, b) {
	return (
		a.x < (b.x + b.width) &&
		b.x < (a.x + a.width) &&
		a.y < (b.y + b.height) &&
		b.y < (a.y + a.height)
	);
};

exports.testPointRect = function (p, r) {
	return (
		p.x >= r.x &&
		p.y >= r.y &&
		p.x <= r.x + r.width &&
		p.y <= r.y + r.height
	);
};

exports.getMSV = function (a, b) {
	var msv = new Vector2();

	var aw = a.width / 2;
	var ah = a.height / 2;

	var bw = b.width / 2;
	var bh = b.height / 2;

	var tx = (b.x + bw) - (a.x + aw);
	var ty = (b.y + bh) - (a.y + ah);

	var ox = aw + bw - Math.abs(tx);
	var oy = ah + bh - Math.abs(ty);

	if (ox < oy) {
		msv.x = ox * math.sign(tx);
	} else {
		msv.y = oy * math.sign(ty);
	}

	return msv;
};
