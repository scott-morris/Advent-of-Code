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
	const failures = [];
	testCases.forEach((testCase, index) => {
		try {
			testCase();
		} catch (err) {
			failures.push({
				caseNumber: index + 1,
				message: err.message
			});
		}

		const percentDone = parseInt(((index+1) / testCases.length) * 100, 10);
		logger.line([`Testing... `.red.bold, colors.green(`${percentDone}%`)]);
	});

	if (failures.length) {
		logger.error(`\n\nTests Failed:`.red.bold);
		failures.forEach((fail) => {
			logger.error(`Test #${fail.caseNumber}:`.red, fail.message.white);
		});
		logger.error("");
		process.exit(0);
	}

	logger.loud("");
};

module.exports = {
	create,
	run
};