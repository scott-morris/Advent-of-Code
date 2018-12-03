// http://adventofcode.com/2018/day/3
"use strict"

// Libraries.

const assert = require("assert");

// Dependencies.

const getInput = require("../helpers/get-input");
const logger = require("../helpers/logger");
const testCases = require("../helpers/test-cases");

// Private.

const CLAIM_REGEX = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/i

const parseClaim = (claim) => {
	const [ claimId, left, top, width, height ] = claim.match(CLAIM_REGEX)
		.splice(1) // remove the full match
		.map(num => parseInt(num, 10)); // convert all results to integers for calculation

	return {
		claimId,
		left,
		right: (left + width),
		top,
		bottom: (top + height),
		width,
		height
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
const tests = [
	testCases.create(parseClaim, `#123 @ 3,2: 5x4`, {
		claimId: `123`,
		left: 3,
		right: 8,
		top: 2,
		bottom: 6,
		width: 5,
		height: 4
	})
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