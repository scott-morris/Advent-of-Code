"use strict";

// Libraries.

const path = require("path");

// Public.

const safeRequire = (cwd, relPath) => {
	const fullPath = path.resolve(cwd, relPath);

	let resolved;
	try {
		resolved = require(fullPath);
	} catch (err) {
		console.error(`Error:`.red.bold, `${fullPath} was unable to be resolved`.white.bold);
	}

	return resolved;
};

module.exports = safeRequire;