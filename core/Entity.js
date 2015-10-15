var components = {};
var prefabs = {};

var nextEntityId = 0;

var exports = module.exports = function Entity (conf) {
	this.id = nextEntityId++;

	this._componentKeys = [];

	for (var key in conf) {
		this.addComponent(key, conf[key]);
	}
};

exports.defineComponent = function Entity_defineComponent (key, ctor) {
	components[key] = ctor;
};

exports.defineComponents = function Entity_defineComponents (data) {
	for (var key in data) {
		exports.defineComponent(key, data[key]);
	}
};

exports.definePrefab = function (key, data) {
	prefabs[key] = data;
};

exports.definePrefabs = function (prefabData) {
	for (var key in prefabData) {
		exports.definePrefab(key, prefabData[key]);
	}
};

exports.fromPrefab = function (prefabKey) {
	var prefab = prefabs[prefabKey];
	return new exports(prefab);
};

var proto = exports.prototype;

proto.addComponent = function Entity_addComponent (key, conf) {
	if (components[key]) {
		var component = this[key] = new components[key](conf);
		component.entity = this;
		this._componentKeys.push(key);
	} else {
		console.warn("Missing component:", key);
	}
};

proto.callComponents = function Entity_callComponents (method, args) {
	var keys = this._componentKeys;
	for (var i = 0, j = keys.length; i < j; ++i) {
		var key = keys[i];
		var component = this[key];
		if (component[method]) {
			component[method].apply(component, args);
		}
	}
};
