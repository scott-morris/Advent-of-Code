"use strict";

// Libraries.

const colors = require("colors");
const readline = require("readline");

// Private.

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

/**
 * Convert a value to something easy to log on the console.
 * @param {*} value
 * @returns {String}
 */
const stringify = (value) =>
	(typeof value === "object") ? JSON.stringify(value, null, "\t") : value

// Public.

const loud = console.log;

const log = (...args) => {
	if (process.env.VERBOSE) {
		loud.call(null, args);
	}
}

const logKeyValue = (key, value) =>
	(typeof key === "object") ?
		Object.keys(key).forEach((k) => logKeyValue(k, key[k], depth+1)) :
		loud(`${key}:`.red.bold, colors.green(stringify(value)));

/**
 * Consistently display the answers for AoC challenges.
 * @param {*} answer1
 * @param {*} answer2
 */
const displayResults = (answer1, answer2) => {
	loud("");
	logKeyValue("Answer #1", answer1)
	logKeyValue("Answer #2", answer2)
};

/**
 * Update a persistent line instead of adding newlines.
 * This is useful for progress bars, etc.
 * @param {Array<String>} values
 */
const line = (values) => {
	readline.clearLine(rl, 0);
	readline.cursorTo(process.stdout, 0);
	values.forEach(val => rl.write(val));
};

module.exports = {
	log,
	loud,
	error: console.error,
	warn: console.warn,
	logKeyValue,
	displayResults,
	line
};