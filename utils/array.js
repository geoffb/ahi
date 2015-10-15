exports.contains = function (arr, item) {
	var index = arr.indexOf(item);
	return index >= 0;
};

exports.remove = function (arr, item) {
	var index = arr.indexOf(item);
	if (index >= 0) {
		arr.splice(index, 1);
	}
};
