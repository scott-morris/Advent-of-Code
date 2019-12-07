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

const parseLine = (string) => {
	// Get the data
	const [prequisite, step] = string.match(DATA_REGEX).splice(1);

	return { prequisite, step };
};

const addIfNotExist = (steps, key) => {
	steps[key] = steps[key] || {
		prequisites: [],
		worker: void 0
	};
};

const addLine = (string, steps) => {
	const { prequisite, step } = parseLine(string);

	addIfNotExist(steps, step);
	addIfNotExist(steps, prequisite);

	steps[step].prequisites.push(prequisite);

	return steps;
};

const processInput = (array) => {
	const steps = {};

	array.forEach(element => {
		addLine(element, steps);
	});

	return steps;
};

const determineNextStep = (processedSteps) => {
	let nextStep;

	Object.keys(processedSteps).sort().some((key) => {
		const step = processedSteps[key];

		if (0 === step.prequisites.length && void 0 === step.worker) {
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
		processedSteps[key].prequisites = value.prequisites.filter((prequisite) => prequisite !== step)
	});

	return processedSteps;
};

const ALPHABET_START = "A".charCodeAt(0);
const stepTime = (letter, baseTime = 60) =>
	baseTime + (letter.charCodeAt(0) - ALPHABET_START) + 1;

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
const solution2 = (input, answer1, { workerCount = 5, baseTime = 60 }) => {
	let data = processInput(input);
	let time = 1;
	const workers = Array.length(workerCount).map(() => ({
		step: void 0,
		until: void 0
	}));

	do {
		// Check to see if tasks are done.
		workers.forEach((worker, index) => {
			// If the worker isn't working or if they are still busy, skip.
			if (void 0 === worker.until || worker.until >= time) {
				return;
			}

			// Remove the step.
			data = removeStep(data, worker.step);

			// Reset the worker.
			workers[index] = {
				step: void 0,
				until: void 0
			};
		});

		// Assign tasks to available workers.
		workers.forEach((worker) => {
			// If the worker is busy, skip
			if (void 0 !== worker.step) {
				return;
			}

			// Find the next open step
			const nextStep = determineNextStep(data);
			if (void 0 === nextStep) {
				// If there are no steps ready, move along
				return;
			}
		});

		// Move the timeline forward.
		time++;
	} while (Object.keys(data).length);
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
		A: { prequisites: ["C"] },
		B: { prequisites: ["A"] },
		C: { prequisites: [] },
		D: { prequisites: ["A"] },
		E: { prequisites: ["B", "D", "F"] },
		F: { prequisites: ["C"] }
	}),
	testCases.create(determineNextStep, processInput(testData), `C`),
	() => {
		const testInput = {
			A: { prequisites: ["C"] },
			B: { prequisites: ["A"] },
			C: { prequisites: [] },
			D: { prequisites: ["A"] },
			E: { prequisites: ["B", "D", "F"] },
			F: { prequisites: ["C"] }
		};

		const expectedOutput = {
			A: { prequisites: [] },
			B: { prequisites: ["A"] },
			D: { prequisites: ["A"] },
			E: { prequisites: ["B", "D", "F"] },
			F: { prequisites: [] }
		};

		assert.deepEqual(removeStep(testInput, `C`), expectedOutput);
	},
	testCases.create(solution1, testData, `CABDFE`),
	testCases.create(stepTime, `A`, 61),
	testCases.create(stepTime, `Z`, 86),
	() => {
		assert.deepStrictEqual(solution2(testData, null, { workerCount: 2, baseTime: 0 }), 15);
	}
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