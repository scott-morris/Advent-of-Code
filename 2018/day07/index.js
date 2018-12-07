// http://adventofcode.com/2018/day/7
"use strict"

// Libraries.

const assert = require("assert");

// Dependencies.

const getInput = require("../helpers/get-input");
const logger = require("../helpers/logger");
const objForEach = require("../helpers/object-for-each");
const testCases = require("../helpers/test-cases");

// Private.
const DATA_REGEX = /^Step ([A-Z]) must be finished before step ([A-Z]) can begin\.$/;

const parseLine = (string, prequisites) => {
	// Get the data
	const [prequisite, step] = string.match(DATA_REGEX).splice(1);

	return { prequisite, step };
};

const addIfNotExist = (prequisites, key) => {
	prequisites[key] = prequisites[key] || [];
};

const addLine = (string, prequisites) => {
	const { prequisite, step } = parseLine(string);

	addIfNotExist(prequisites, step);
	addIfNotExist(prequisites, prequisite);

	prequisites[step].push(prequisite);

	return prequisites;
};

const processInput = (array) => {
	const prequisites = {};

	array.forEach(element => {
		addLine(element, prequisites);
	});

	return prequisites;
};

const determineNextStep = (processedSteps) => {
	let nextStep;

	Object.keys(processedSteps).sort().some((key) => {
		if (0 === processedSteps[key].length) {
			nextStep = key;
			return true;
		}
	});

	return nextStep;
};

const removeStep = (processedSteps, step) => {
	// Remove the key
	delete processedSteps[step];

	// Remove the entry from all other steps
	objForEach(processedSteps, (value, key) => {
		processedSteps[key] = value.filter((prequisite) => prequisite !== step)
	});

	return processedSteps;
};

// Solution #1
const solution1 = (input) => {
	let data = processInput(input);
	let output = ``;

	do {
		const nextStep = determineNextStep(data);
		output += nextStep;

		data = removeStep(data, nextStep);
	} while (Object.keys(data).length);

	return output;
};

// Solution #2
const solution2 = (input, answer1) => {
	/* put code to solve for part #2 here. */
};

// Public

// Define the tests that need to pass before running.
const testData = [
	`Step C must be finished before step A can begin.`,
    `Step C must be finished before step F can begin.`,
    `Step A must be finished before step B can begin.`,
    `Step A must be finished before step D can begin.`,
    `Step B must be finished before step E can begin.`,
    `Step D must be finished before step E can begin.`,
    `Step F must be finished before step E can begin.`
];

const tests = [
	testCases.create(parseLine, `Step C must be finished before step A can begin.`, { prequisite: "C", step: "A" }),
	testCases.create(processInput, testData, {
		A: ["C"],
		B: ["A"],
		C: [],
		D: ["A"],
		E: ["B", "D", "F"],
		F: ["C"]
	}),
	testCases.create(determineNextStep, processInput(testData), `C`),
	() => {
		const testInput = {
			A: ["C"],
			B: ["A"],
			C: [],
			D: ["A"],
			E: ["B", "D", "F"],
			F: ["C"]
		};

		const expectedOutput = {
			A: [],
			B: ["A"],
			D: ["A"],
			E: ["B", "D", "F"],
			F: []
		};

		assert.deepEqual(removeStep(testInput, `C`), expectedOutput);
	},
	testCases.create(solution1, testData, `CABDFE`)
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