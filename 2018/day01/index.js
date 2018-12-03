// http://adventofcode.com/2018/day/1
"use strict"

// Dependencies.

const getInput = require("../helpers/get-input");
const logger = require("../helpers/logger");
const testCases = require("../helpers/test-cases");

// Private.

const MAX_LOOPS = 1000;

const updateValue = ({ value, change }) =>
	value + parseInt(change, 10);

const getDuplicateValues = (obj) => {
	// Deconstruct the object for analysis.
	const array = Object.keys(obj).reduce((newArray, key) => {
		newArray.push(obj[key]);
		return newArray;
	}, []);

	// Filter out values that were not duplicates.
	return array.filter((obj) => (void 0 !== obj.indexSecond));
};

const newValue = (value, indexFirst) => ({
	value,
	indexFirst,
	indexSecond: void 0
});

// Solution #1
const solution1 = (input) =>
	input.reduce((value, change) =>
		updateValue({ value, change }), 0);

// Solution #2
const solution2 = (input, answer1) => {
	const valueTracker = {
		duplicateFound: false,
		0: newValue(0, 0)
	};
	const numInputs = input.length;
	let duplicateValues = [];

	// Continuously loop over the values until a duplicate is found.
	for (let value = 0, loops = 0; (0 === duplicateValues.length && MAX_LOOPS >= loops); loops++) {
		input.forEach((change, index) => {
			// Calculate looped index
			let loopIndex = (loops * numInputs) + index + 1;

			// Update value
			value = updateValue({ value, change });

			// If this is the first time this value
			if (!valueTracker.hasOwnProperty(value)) {
				// Track where this value has been found the first time
				valueTracker[value] = newValue(value, loopIndex);
			} else if (void 0 === valueTracker[value].indexSecond) {
				// Flag that a duplicate has been found
				valueTracker[value].indexSecond = loopIndex;
				valueTracker.duplicateFound = true;
			}
		});

		duplicateValues = getDuplicateValues(valueTracker);
	}

	// Find the value with the earliest index.
	duplicateValues.sort((a, b) => a.indexSecond > b.indexSecond);

	return duplicateValues[0].value;
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