"use strict";

const objectForEach = (obj, cb) =>
	Object.keys(obj).forEach((key, index, array) =>
		cb(obj[key], key, index, array)
	);

module.exports = objectForEach;