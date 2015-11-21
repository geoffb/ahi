var images = {};

exports.load = function (path) {
	var image = new Image();
	image.src = path;
	image.ready = false;
	image.onload = function () {
		image.ready = true;
	};
	image.onerror = function () {
		console.warn("Failed to load image:", path);
	};
	images[path] = image;
};

exports.get = function (path) {
	if (!images[path]) {
		exports.load(path);
	}
	return images[path];
};
