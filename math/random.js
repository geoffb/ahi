exports.range = function (min, max) {
	return Math.round(Math.random() * (max - min) + min);
};

exports.chance = function (chance) {
	return Math.random() <= chance;
};
