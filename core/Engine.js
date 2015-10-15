var QuadTree = require("../math/QuadTree");
var collision = require("../math/collision");
var Entity = require("./Entity");
var stage = require("./stage");
var time = require("./time");

// Core components (Transform, etc)
Entity.defineComponents(require("./components"));

var exports = module.exports = function Engine () {
	this.entities = [];

	this.renderGizmos = true;

	this._lastElapsed = 0;

	this._quadTree = new QuadTree(0, 0, 640, 480);
	this._collisionEntities = [];

	stage.init(640, 480);

	time.onUpdate(this.update.bind(this));
};

var proto = exports.prototype;

proto.addEntity = function Engine_addEntity (entity) {
	this.entities.push(entity);
};

proto.start = function Engine_start () {
	time.start();
};

proto.stop = function Engine_stop () {
	time.stop();
};

proto.update = function Engine_update (dt) {
	this._preUpdate();
	this._updateEntities(dt);
	this._collideEntities();
	this._render();
};

proto._preUpdate = function Engine__preUpdate () {
	this._collisionEntities.length = 0;
	this._quadTree.clear();
};

proto._updateEntities = function Engine__updateEntities (dt) {
	var entities = this.entities;
	var quadTree = this._quadTree;
	var collisionEntities = this._collisionEntities;

	for (var i = 0, j = entities.length; i < j; ++i) {
		var entity = entities[i];
		entity.callComponents("update", [dt]);

		if (entity.collide) {
			collisionEntities.push(entity);
			var pos = entity.transform.position;
			var body = entity.rigidBody;
			var bounds = entity.collide.getBounds();
			if (bounds.x < 0) {
				pos.x += Math.abs(bounds.x);
				body.velocity.x *= -body.bounce.x;
			} else if (bounds.right > 640) {
				pos.x -= bounds.right - 640;
				body.velocity.x *= -body.bounce.x;
			}
			if (bounds.y < 0) {
				pos.y += Math.abs(bounds.y);
				body.velocity.y *= -body.bounce.y;
			} else if (bounds.bottom > 480) {
				pos.y -= bounds.bottom - 480;
				body.velocity.y *= -body.bounce.y;
			}

			var bounds = entity.collide.getBounds();
			bounds.id = entity.id;
			quadTree.insert(bounds);
		}
	}
};

proto._collideEntity = function (entity) {
	var bounds = entity.collide.getBounds();
	var neighbors = this._quadTree.retrieve(bounds);
	for (var i = 0, j = neighbors.length; i < j; ++i) {
		var neighbor = neighbors[i];
		if (
			neighbor.id !== entity.id &&
			collision.testAABB(bounds, neighbor)
		) {
			if (entity.collide.trigger) {
				// TODO: Pass colliding entity
				entity.callComponents("triggerStay");
			} else {
				var msv = collision.getMSV(bounds, neighbor);
				msv.invert();
				entity.transform.translate(msv.x, msv.y);
				if (msv.x !== 0) {
					entity.rigidBody.velocity.x *= -1 * entity.rigidBody.bounce.x;
				} else {
					entity.rigidBody.velocity.y *= -1 * entity.rigidBody.bounce.y;
				}
			}
		}
	}
};

proto._collideEntities = function Engine__collideEntities () {
	var entities = this._collisionEntities;
	for (var i = 0, j = entities.length; i < j; ++i) {
		this._collideEntity(entities[i]);
	}
};

proto._render = function Engine__render () {
	var entities = this.entities;
	stage.fill("cornflowerblue");
	var ctx = stage.getContext();
	for (var i = 0, j = entities.length; i < j; ++i) {
		var entity = entities[i];
		ctx.save();
		entity.callComponents("render", [ctx]);
		if (this.renderGizmos) {
			entity.callComponents("renderGizmo", [ctx]);
		}
		ctx.restore();
	}
	if (this.renderGizmos) {
		this._renderGizmos(ctx);
	}
};

proto._renderGizmos = function Engine__renderGizmos (ctx) {
	ctx.save();
	ctx.globalAlpha = 0.85;
	this._renderQuadTreeGizmo(ctx, this._quadTree);
	ctx.restore();
};

proto._renderQuadTreeGizmo = function Engine__renderQuadTreeGizmo (ctx, quadTree) {
	if (quadTree.children.length > 0) {
		for (var i = 0; i < quadTree.children.length; ++i) {
			this._renderQuadTreeGizmo(ctx, quadTree.children[i]);
		}
	} else {
		ctx.strokeStyle = "pink";
		ctx.lineWidth = 2;
		ctx.strokeRect(quadTree.x, quadTree.y, quadTree.width, quadTree.height);

		ctx.fillStyle = "pink";
		ctx.fillRect(quadTree.x, quadTree.y, 35, 25);

		ctx.fillStyle = "white";
		ctx.textBaseline = "top";
		ctx.font = "16px monospace";
		ctx.fillText(quadTree.depth + "/" + quadTree.rectangles.length, quadTree.x + 2, quadTree.y + 2);
	}
};
