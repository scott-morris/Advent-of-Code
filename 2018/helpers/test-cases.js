"use strict";

// Libraries.

const assert = require("assert");
const colors = require("colors");

// Dependencies.

const logger = require("./logger");

// Public.

const create = (fn, input, output) => {
	return () => { assert.deepEqual(fn(input), output) };
};

const run = (testCases) => {
	testCases.forEach((testCase, index) => {
		try {
			testCase();
		} catch (err) {
			logger.error(`\n\nTest Case ${index + 1} Failed:`.red.bold);
			logger.error(err.message.white);
			logger.error("");
			process.exit(0);
		}

		const percentDone = parseInt(((index+1) / testCases.length) * 100, 10);
		logger.line([`Testing... `.red.bold, colors.green(`${percentDone}%`)]);
	});
	logger.loud("");
};

module.exports = {
	create,
	run
};