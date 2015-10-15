var images = {};

exports.load = function (path) {
	var image = new Image();
	image.src = path;

	images[path] = image;
};

exports.get = function (path) {
	if (!images[path]) {
		exports.load(path);
	}
	return images[path];
};
