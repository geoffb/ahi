exports.sign = function (n) {
	return n > 0 ? 1 : n == 0 ? 0 : -1;
};

exports.clamp = function (n, a, b) {
	return Math.min(Math.max(n, a), b);
};

exports.lerp = function (a, b, normal, round) {
	return a + ((b - a) * normal);
};
