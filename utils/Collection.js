var exports = module.exports = function Collection () {
	this.items = [];
	this._lookup = {};
};

var proto = exports.prototype;

proto.add = function (key, item) {
	var len = this.items.push(item);
	this._lookup[key] = len - 1;
};

proto.get = function (key) {
	var index = this._lookup[key];
	return this.items[index];
};

// TODO: Remove, etc
