// http://adventofcode.com/2018/day/2
"use strict"

// Libraries.

const assert = require("assert");

// Dependencies.

const getInput = require("../helpers/get-input");
const logger = require("../helpers/logger");
const testCases = require("../helpers/test-cases");

// Private.

const stringHasExactly = (str, num) => {
	// Sort the characters to make it easier to count
	const sortedChars = str.split("").sort().join("");

	let charCount = 1;
	for (let i = 1; i < sortedChars.length; i++) {
		if (sortedChars[i-1] === sortedChars[i]) {
			// If this character is the same as the previous, increment
			charCount++;
		} else {
			// Otherwise, check to see if the count matches what we're looking for.
			if (charCount === num) {
				return true;
			}
			charCount = 1;
		}
	}

	// Do one last check to see if the last character matches the number we want.
	return (charCount === num);
};

const getDiff = (str1, str2) => {
	const result = {
		numDiff: 0,
		matchString: ``
	};

	for (let i=0; i < str1.length; i++) {
		if (str1[i] !== str2[i]) {
			result.numDiff++;
		} else {
			result.matchString += str1[i];
		}
	}

	return result;
};

// Solution #1
const solution1 = (input) => {
	let numHas2 = 0;
	let numHas3 = 0;

	input.forEach((str) => {
		const has2 = stringHasExactly(str, 2);
		const has3 = stringHasExactly(str, 3);

		if (stringHasExactly(str, 2)) { numHas2++ };
		if (stringHasExactly(str, 3)) { numHas3++ };
	});

	return numHas2 * numHas3;
};

// Solution #2
const solution2 = (input, answer1) => {
	for (let i = 0; i < input.length; i++) {
		const remaining = input.slice(i + 1);
		for (let j = 0; j < remaining.length; j++) {
			const diff = getDiff(input[i], remaining[j]);
			if (1 === diff.numDiff) {
				return diff.matchString;
			}
		}
	}
};

// Public

// Define the tests that need to pass before running.
const tests = [
	() => { assert.equal(stringHasExactly(`abcdef`, 2), false) },
	() => { assert.equal(stringHasExactly(`abcdef`, 3), false) },
	() => { assert.equal(stringHasExactly(`bababc`, 2), true) },
	() => { assert.equal(stringHasExactly(`bababc`, 3), true) },
	() => { assert.equal(stringHasExactly(`abbcde`, 2), true) },
	() => { assert.equal(stringHasExactly(`abbcde`, 3), false) },
	() => { assert.equal(stringHasExactly(`abcccd`, 2), false) },
	() => { assert.equal(stringHasExactly(`abcccd`, 3), true) },
	() => { assert.equal(stringHasExactly(`aabcdd`, 2), true) },
	() => { assert.equal(stringHasExactly(`aabcdd`, 3), false) },
	() => { assert.equal(stringHasExactly(`abcdee`, 2), true) },
	() => { assert.equal(stringHasExactly(`abcdee`, 3), false) },
	() => { assert.equal(stringHasExactly(`ababab`, 2), false) },
	() => { assert.equal(stringHasExactly(`ababab`, 3), true) },
	testCases.create(solution1, [
		`abcdef`,
		`bababc`,
		`abbcde`,
		`abcccd`,
		`aabcdd`,
		`abcdee`,
		`ababab`
	], 12),
	() => { assert.deepEqual(getDiff(`abcde`, `axcye`), { numDiff: 2, matchString: `ace` }) },
	() => { assert.deepEqual(getDiff(`fghij`, `fguij`), { numDiff: 1, matchString: `fgij` }) },
	testCases.create(solution2, [
		`abcde`,
		`fghij`,
		`klmno`,
		`pqrst`,
		`fguij`,
		`axcye`,
		`wvxyz`
	], `fgij`)
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