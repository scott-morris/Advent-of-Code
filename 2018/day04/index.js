// http://adventofcode.com/2018/day/4
"use strict"

// Libraries.

const assert = require("assert");

// Dependencies.

const getInput = require("../helpers/get-input");
const logger = require("../helpers/logger");
const testCases = require("../helpers/test-cases");

// Private.

/* put private functions here */

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
	`[1518-11-01 00:00] Guard #10 begins shift`,
    `[1518-11-01 00:05] falls asleep`,
    `[1518-11-01 00:25] wakes up`,
    `[1518-11-01 00:30] falls asleep`,
    `[1518-11-01 00:55] wakes up`,
    `[1518-11-01 23:58] Guard #99 begins shift`,
    `[1518-11-02 00:40] falls asleep`,
    `[1518-11-02 00:50] wakes up`,
    `[1518-11-03 00:05] Guard #10 begins shift`,
    `[1518-11-03 00:24] falls asleep`,
    `[1518-11-03 00:29] wakes up`,
    `[1518-11-04 00:02] Guard #99 begins shift`,
    `[1518-11-04 00:36] falls asleep`,
    `[1518-11-04 00:46] wakes up`,
    `[1518-11-05 00:03] Guard #99 begins shift`,
    `[1518-11-05 00:45] falls asleep`,
    `[1518-11-05 00:55] wakes up`
];

const tests = [
	testCases.create(solution1, sampleData, 240)
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