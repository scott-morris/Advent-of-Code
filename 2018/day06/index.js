// http://adventofcode.com/2018/day/6
"use strict"

// Libraries.

const assert = require("assert");

// Dependencies.

const getInput = require("../helpers/get-input");
const logger = require("../helpers/logger");
const testCases = require("../helpers/test-cases");

// Private.

const decode = (line) => {
	const [x, y] = line
		.match(/(\d+), (\d+)/) // get the data
		.splice(1)             // remove the full match
		.map(Number);          // coerce into a number

	return { x, y };
};

const boundaries = (input) => {
	const x = input.map((coord) => coord.x);
	const y = input.map((coord) => coord.y);

	return {
		left: Math.min.apply(null, x),
		right: Math.max.apply(null, x),
		top: Math.min.apply(null, y),
		bottom: Math.max.apply(null, y)
	};
};

// Solution #1
const solution1 = (input) => {
	/* put code to solve for part #1 here. */
};

// Solution #2
const solution2 = (input, answer1) => {
	/* put code to solve for part #2 here. */
};

// Public

// Define the tests that need to pass before running.
const sampleData = [
	`1, 1`,
	`1, 6`,
	`8, 3`,
	`3, 4`,
	`5, 5`,
	`8, 9`
];

const tests = [
	testCases.create(decode, `1, 1`, { x: 1, y: 1 }),
	() => {
		const input = sampleData.map(decode);
		assert.deepEqual(boundaries(input), {
			top: 1,
			bottom: 9,
			left: 1,
			right: 8
		});
	},
	testCases.create(solution1, sampleData, 17)
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