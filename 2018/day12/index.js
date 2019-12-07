// http://adventofcode.com/2018/day/12
"use strict"

// Libraries.

const assert = require("assert");

// Dependencies.

const getInput = require("../helpers/get-input");
const logger = require("../helpers/logger");
const testCases = require("../helpers/test-cases");

// Private.

const processRule = (rule) => {
	const [fullMatch, key, nextStep] = rule.match(/([.#]{5}) => ([.#])/);

	return {
		key,
		nextStep
	};
};

const processState = (rawState) => rawState
	.split("")
	.reduce((stateObj, char, index) => {
		stateObj[index] = char;
		return stateObj;
	}, {});

const reverseProcessState = (stateObj) => {
	const startIndex = Math.min.apply(null, Object.keys(stateObj));
	const endIndex = Math.max.apply(null, Object.keys(stateObj));

	let string = ``;
	for (let i = startIndex; i <= endIndex; i++) {
		string += stateObj[i] || `.`;
	}

	return {
		startIndex,
		string
	};
}

const processInput = (raw) => {
	// Process the state.
	const initialState = raw[0] // get the first line of the array
		.match(/initial state: (.*)$/)[1]; // get the dots and hashes

	// Deconstruct the string so we have negative indices.
	const state = initialState.split("").reduce((stateObj, char, index) => {
		stateObj[index] = char;
		return stateObj;
	}, {});
	// "abc" = { 0: "a", 1: "b", 2: "c" }

	// Process the rules.
	const rawRules = raw.splice(2); // remove the first two lines

	const rules = rawRules.reduce((rulesObj, rule) => {
		const processedRule = processRule(rule);
		rulesObj[processedRule.key] = processedRule.nextStep;
		return rulesObj;
	}, {});

	return {
		state,
		rules
	};
};

const getKey = ({ state, index }) => {
	let key = ``;
	for (let i = index - 2; i <= index + 2; i++) {
		key += state[i] || `.`
	}
	return key;
};

const iterate = (input) => {
	// Determine the boundaries.
	const start = Math.min.apply(null, Object.keys(input.state)) - 2;
	const end = Math.max.apply(null, Object.keys(input.state)) + 2;

	// Capture the non-changed state.
	const state = input.state;

	for (let index = start; index <= end; index++) {
		const key = getKey({ state, index });
		input.state[index] = input.rules[key] || `.`;
	}
};

// Solution #1
const solution1 = (rawInput) => {
	const input = processInput(rawInput);

	// twenty iterations
	for (let i = 0; i < 20; i++) {
		iterate(input);
	}
};

// Solution #2
const solution2 = (input, answer1) => {
	/* put code to solve for part #2 here. */
};

// Public

// Define the tests that need to pass before running.
const testData = [
	`initial state: #..#.#..##......###...###`,
	``,
	`...## => #`,
	`..#.. => #`,
	`.#... => #`,
	`.#.#. => #`,
	`.#.## => #`,
	`.##.. => #`,
	`.#### => #`,
	`#.#.# => #`,
	`#.### => #`,
	`##.#. => #`,
	`##.## => #`,
	`###.. => #`,
	`###.# => #`,
	`####. => #`
];


const tests = [
	testCases.create(processRule, "##.#. => .", { key: "##.#.", nextStep: "." }),
	testCases.create(getKey, { state: processState(`..#..`), index: -1 }, `.....`),
	testCases.create(getKey, { state: processState(`..#..`), index: 0 }, `....#`),
	testCases.create(getKey, { state: processState(`..#..`), index: 1 }, `...#.`),
	testCases.create(getKey, { state: processState(`..#..`), index: 10 }, `.....`),
	() => {
		const testInput = processInput(testData);
		iterate(testInput);

		const afterIteration = reverseProcessState(testInput.state);
		assert.deepEqual(afterIteration, {
			startIndex: -2,
			string: `..#...#....#.....#..#..#..#..`
		});
	},
	testCases.create(solution1, testData, 325)
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