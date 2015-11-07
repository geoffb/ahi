var math = require("../../math");

exports.moveToPoint = function (entity, x, y) {
	entity.transform.position.set(x, y);
};

exports.moveToEntity = function (entityA, entityB) {
	var pos = entityB.transform.position;
	exports.moveToPoint(entityA, pos.x, pos.y);
};

exports.distanceToPoint = function (entity, x, y) {
	var pos = entity.transform.position;
	return math.distance(pos.x, pos.y, x, y);
};

exports.distanceToEntity = function (entityA, entityB) {
	var pos = entityB.transform.position;
	return exports.distanceToPoint(entityA, pos.x, pos.y);
};

exports.getNearestEntity = function (entity, fn) {
	var matches = entity.world.getEntities(fn);
	if (matches.length > 0) {
		// Sort by distance from the target entity
		matches.sort(function (a, b) {
			var distA = exports.distanceToEntity(entity, a);
			var distB = exports.distanceToEntity(entity, b);
			return distA - distB;
		});
		return matches[0];
	} else {
		return null;
	}
};
