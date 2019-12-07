// Libraries.

import colors = require("colors");

/**
 * Convert a value to something easy to log on the console.
 * @param {*} value
 * @returns {String}
 */
const stringify = (value: any): string =>
	(typeof value === "object") ? JSON.stringify(value, null, "\t") : value

// Public.

const loud = console.log;

const log = (...args) => {
	if (process.env.VERBOSE) {
		loud.call(null, args);
	}
}

const logKeyValue = (key: string | object, value: any, depth: number = 0) =>
	(typeof key === "object") ?
		Object.keys(key).forEach((k) => logKeyValue(k, key[k], (depth + 1))) :
		loud(`${key}:`.red.bold, colors.green(stringify(value)));

/**
 * Consistently display the answers for AoC challenges.
 * @param {*} answer1
 * @param {*} answer2
 */
const displayResults = (answer1: any, answer2: any) => {
	loud("");
	logKeyValue("Answer #1", answer1)
	logKeyValue("Answer #2", answer2)
	loud("");
};


export = {
	log,
	loud,
	error: console.error,
	warn: console.warn,
	logKeyValue,
	displayResults
};