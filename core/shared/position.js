var math = require("../../math");

exports.moveToPoint = function (entity, x, y) {
	entity.transform.position.set(x, y);
};

exports.moveToEntity = function (entityA, entityB) {
	var pos = entityB.transform.position;
	exports.moveToPoint(entityA, pos.x, pos.y);
};

exports.withinPointDistance = function (entity, x, y, distance) {
	var pos = entity.transform.position;
	return math.distance(pos.x, pos.y, x, y) <= distance;
};

exports.withinEntityDistance = function (entityA, entityB, distance) {
	var pos = entityB.transform.position;
	return exports.withinPointDistance(entityA, pos.x, pos.y, distance);
};

