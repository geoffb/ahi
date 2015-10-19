exports.merge = function () {
	var merged = {};
	for (var i = arguments.length - 1; i >= 0; --i) {
		var toMerge = arguments[i];

		if (typeof toMerge != "object") { continue; }

		for (var key in toMerge) {
			var prop = toMerge[key];
			if (prop === undefined) { continue; }

			if (prop && typeof prop.concat == "function") {
				// An array
				merged[key] = prop.concat([]);
			} else if (prop && prop.constructor === Object) {
				// A merge-able object
				merged[key] = arguments.callee(prop, merged[key]);
			} else {
				// A scalar or un-mergeable object
				// WARNING: This will copy the reference to an object!
				merged[key] = prop;
			}
		}
	}
	return merged;
};
