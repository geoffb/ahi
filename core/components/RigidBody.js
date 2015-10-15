var Vector2 = require("../../math/Vector2");

// TODO: Gravity should be variable, probably
var GRAVITY = 1 / 1000;

var exports = module.exports = function RigidBody (conf) {
	this.acceleration = new Vector2();
	this.velocity = new Vector2(conf.velocityX, conf.velocityY);
	this.bounce = new Vector2(
		isNaN(conf.bounceX) ? 0 : conf.bounceX,
		isNaN(conf.bounceY) ? 0 : conf.bounceY
	);
	this.mass = 1;
	this.force = new Vector2();
	this.gravity = isNaN(conf.gravity) ? 1 : conf.gravity;
};

var proto = exports.prototype;

proto.update = function (dt) {
	var pos = this.entity.transform.position;

	var lastAccel = this.acceleration.clone();

	var accel = new Vector2(this.force.x / this.mass, this.force.y / this.mass);

	this.velocity.x += accel.x * dt;
	this.velocity.y += accel.y * dt;

	var gravity = GRAVITY * this.gravity * dt / 2;
	this.velocity.y += gravity;

	pos.x += this.velocity.x * dt;
	pos.y += this.velocity.y * dt;

	this.velocity.y += gravity;
};
