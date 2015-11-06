var math = require("../../math");

exports.stop = function (entity) {
	entity.rigidBody.velocity.zero();
};

exports.moveTowardEntity = function (entityA, entityB, speed) {
	var posA = entityA.transform.position;
	var posB = entityB.transform.position;
	var velX = math.sign(posB.x - posA.x) * speed;
	var velY = math.sign(posB.y - posA.y) * speed;
	entityA.rigidBody.velocity.set(velX, velY);
};
