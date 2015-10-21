var QuadTree = require("../math/QuadTree");
var collision = require("../math/collision");
var Entity = require("./Entity");
var stage = require("./stage");
var time = require("./time");
var Collection = require("../utils/Collection");
var tween = require("./tween");

// Core components and prefabs
Entity.defineComponents(require("./components"));
Entity.definePrefabs(require("./prefabs"));

var exports = module.exports = function Engine (width, height) {
	this.width = width;
	this.height = height;

	this.entities = new Collection();

	this.renderGizmos = true;

	this._lastElapsed = 0;

	this._quadTree = new QuadTree(0, 0, width, height);

	this._collisionEntities = [];
	this._renderEntities = [];

	stage.init(width, height);

	this._initCamera(width, height);

	time.onUpdate(this.update.bind(this));
};

var proto = exports.prototype;

proto.addEntity = function Engine_addEntity (entity) {
	this.entities.add(entity.id, entity);
};

proto.start = function Engine_start () {
	time.start();
};

proto.stop = function Engine_stop () {
	time.stop();
};

proto.update = function Engine_update (dt) {
	this._preUpdate(dt);
	this._updateEntities(dt);
	this._collideEntities();
	this._render();
};

proto._initCamera = function (width, height) {
	var cam = this.camera = Entity.fromPrefab("camera");
	cam.camera.width = width;
	cam.camera.height = height;
	this.addEntity(cam);
};

proto._preUpdate = function Engine__preUpdate (dt) {
	this._renderEntities.length = 0;
	this._collisionEntities.length = 0;
	this._quadTree.clear();
	tween.update(dt);
};

proto._updateEntities = function Engine__updateEntities (dt) {
	var camBounds = this.camera.camera.viewportAABB;
	var entities = this.entities.items;
	var quadTree = this._quadTree;
	var collisionEntities = this._collisionEntities;
	var renderEntities = this._renderEntities;

	for (var i = 0, j = entities.length; i < j; ++i) {
		var entity = entities[i];
		entity.callComponents("update", [dt]);

		if (
			!entity.transform.worldSpace ||
			collision.testPointRect(entity.transform.position, camBounds)
		) {
			renderEntities.push(entity);
		}

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
	var ctx = stage.getContext();
	var cam = this.camera;
	var camBounds = cam.camera.viewportAABB;

	stage.fill("cornflowerblue");

	var entities = this._renderEntities;

	entities.sort(function (a, b) {
		if (a.transform.layer === b.transform.layer) {
			return a.transform.layerOrder - b.transform.layerOrder;
		} else {
			return a.transform.layer - b.transform.layer;
		}
	});

	for (var i = 0, j = entities.length; i < j; ++i) {
		var entity = entities[i];
		ctx.save();
		entity.callComponents("render", [ctx, -camBounds.x, -camBounds.y]);
		if (this.renderGizmos) {
			entity.callComponents("renderGizmo", [ctx]);
		}
		ctx.restore();
	}

	if (this.renderGizmos) {
		this._renderGizmos(ctx, -camBounds.x, -camBounds.y);
	}
};

proto._renderGizmos = function Engine__renderGizmos (ctx, offsetX, offsetY) {
	ctx.save();
	ctx.globalAlpha = 0.85;
	this._renderQuadTreeGizmo(ctx, this._quadTree, offsetX, offsetY);
	ctx.restore();
};

proto._renderQuadTreeGizmo = function Engine__renderQuadTreeGizmo (ctx, quadTree, offsetX, offsetY) {
	if (quadTree.children.length > 0) {
		for (var i = 0; i < quadTree.children.length; ++i) {
			this._renderQuadTreeGizmo(ctx, quadTree.children[i], offsetX, offsetY);
		}
	} else {
		var x = Math.round(quadTree.x + offsetX);
		var y = Math.round(quadTree.y + offsetY);

		ctx.strokeStyle = "pink";
		ctx.lineWidth = 2;
		ctx.strokeRect(x, y, quadTree.width, quadTree.height);

		ctx.fillStyle = "pink";
		ctx.fillRect(x, y, 35, 25);

		ctx.fillStyle = "white";
		ctx.textBaseline = "top";
		ctx.font = "16px monospace";
		ctx.fillText(quadTree.depth + "/" + quadTree.rectangles.length, x + 2, y + 2);
	}
};
