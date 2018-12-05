// http://adventofcode.com/2018/day/5
"use strict"

// Libraries.

const assert = require("assert");

// Dependencies.

const getInput = require("../helpers/get-input");
const logger = require("../helpers/logger");
const testCases = require("../helpers/test-cases");

// Private.

/**
 * Process single reaction
 * @param {String} polymer
 * @returns {String}
 */
const processReactions = (polymer) => {
	for (let char = "a".charCodeAt(0); char <= "z".charCodeAt(0); char++) {
		const lowerCase = String.fromCharCode(char);
		const upperCase = String.fromCharCode(char - 32);

		// Replace aA
		polymer = polymer.replace(new RegExp(`${lowerCase}${upperCase}`, "g"), ``);

		// Replace Aa
		polymer = polymer.replace(new RegExp(`${upperCase}${lowerCase}`, "g"), ``);
	}
	return polymer;
};

// Solution #1
const solution1 = (input) => {
	let processing = input;
	let initialValue;

	do {
		initialValue = processing;
		processing = processReactions(processing);
	} while (processing !== initialValue);

	return processing.length;
};

// Solution #2
const solution2 = (input, answer1) => {
	/* put code to solve for part #2 here. */
};

// Public

// Define the tests that need to pass before running.
const tests = [
	testCases.create(processReactions, `aA`, ``),
	testCases.create(processReactions, `abBA`, `aA`),
	testCases.create(processReactions, `abAB`, `abAB`),
	testCases.create(processReactions, `aabAAB`, `aabAAB`),
	testCases.create(solution1, `dabAcCaCBAcCcaDA`, 10)
];

// Run the functions.
const run = (input = getInput(__dirname)) => {
	const answer1 = solution1(input);
	const answer2 = solution2(input, answer1);

	// Display results.
	logger.displayResults(answer1, answer2);
};

module.exports = {
	tests,
	run
};