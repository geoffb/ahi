var lastTimestamp = 0;
var onUpdate = null;

exports.scale = 1;

exports.deltaTime = 0;

exports.start = function time_start () {
	exports.update(0);
};

exports.stop = function time_stop () {
	cancelAnimationFrame();
};

exports.update = function time_update (timestamp) {
	var dt = exports.deltaTime = timestamp - lastTimestamp;
	lastTimestamp = timestamp;
	if (onUpdate) {
		onUpdate(dt * exports.scale);
	}
	requestAnimationFrame(exports.update);
};

exports.onUpdate = function time_onUpdate (callback) {
	onUpdate = callback;
};
