// http://adventofcode.com/2018/day/1
"use strict"

// Dependencies.

const getInput = require("../helpers/get-input");
const logger = require("../helpers/logger");
const testCases = require("../helpers/test-cases");

// Private.

const updateValue = ({ value, change }) =>
	value + parseInt(change, 10);

// Solution #1
const solution1 = (input) =>
	input.reduce((value, change) =>
		updateValue({ value, change }), 0);

// Solution #2
const solution2 = (input, answer1) => {
	let value = 0;
	let firstDuplicate;
	const distinctValues = new Set([value]);

	for (;void 0 === firstDuplicate;) {
		input.forEach((change) => {
			value = updateValue({ value, change });
			if (void 0 === firstDuplicate && distinctValues.has(value)) {
				firstDuplicate = value;
			}
			distinctValues.add(value);
		});
	}

	return firstDuplicate;
};

// Public

// Define the tests that need to pass before running.
const tests = [
	testCases.create(updateValue, { value: 0, change: `+1` }, 1),
	testCases.create(updateValue, { value: 1, change: `-2` }, -1),
	testCases.create(updateValue, { value: -1, change: `+3` }, 2),
	testCases.create(updateValue, { value: 2, change: `+1` }, 3),
	testCases.create(solution1, ["+1", "+1", "+1"], 3),
	testCases.create(solution1, ["+1", "+1", "-2"], 0),
	testCases.create(solution1, ["-1", "-2", "-3"], -6),
	testCases.create(solution2, ["+1", "-1"], 0),
	testCases.create(solution2, ["+3", "+3", "+4", "-2", "-4"], 10),
	testCases.create(solution2, ["-6", "+3", "+8", "+5", "-6"], 5),
	testCases.create(solution2, ["+7", "+7", "-2", "-7", "-4"], 14)
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