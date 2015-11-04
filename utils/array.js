exports.contains = function (arr, item) {
	var index = arr.indexOf(item);
	return index >= 0;
};

exports.last = function (arr) {
	if (arr.length > 0) {
		return arr[arr.length - 1];
	} else {
		return null;
	}
};

exports.remove = function (arr, item) {
	var index = arr.indexOf(item);
	if (index >= 0) {
		arr.splice(index, 1);
	}
};
