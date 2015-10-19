var math = require("../math");

var tweens = [];

exports.create = function (target, props, duration, delay) {
	var from = {};
	for (var key in props) {
		from[key] = target[key];
	}
	tweens.push({
		target: target,
		from: from,
		to: props,
		duration: duration,
		elapsed: isNaN(delay) ? 0 : -delay
	});
};

exports.update = function (dt) {
	for (var i = tweens.length - 1; i >= 0; --i) {
		var tween = tweens[i];
		tween.elapsed += dt;
		if (tween.elapsed < 0) { continue; }
		var normal = math.clamp(tween.elapsed / tween.duration, 0, 1);
		for (var key in tween.from) {
			tween.target[key] = math.lerp(tween.from[key], tween.to[key], normal);
		}
		if (tween.elapsed >= tween.duration) {
			tweens.splice(i, 1);
		}
	}
};
