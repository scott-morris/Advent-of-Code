// http://adventofcode.com/2018/day/3
"use strict"

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
		right: (left + width - 1),
		top,
		bottom: (top + height - 1),
		width,
		height
	};
};

const addClaim = ({ fabric = [], claimString }) => {
	const claim = parseClaim(claimString);

	for (let rowIndex = claim.top; rowIndex <= claim.bottom; rowIndex++) {
		// Make sure that the row is an array
		fabric[rowIndex] = fabric[rowIndex] || [];

		for (let colIndex = claim.left; colIndex <= claim.right; colIndex++) {
			fabric[rowIndex][colIndex] = fabric[rowIndex][colIndex] || [];
			fabric[rowIndex][colIndex].push(claim.claimId);
		}
	}

	return fabric;
};

// Solution #1
const solution1 = (input) => {
	let fabric = [];
	let multiClaimCount = 0;

	// Add all of the claims.
	input.forEach((claimString) => {
		fabric = addClaim({ fabric, claimString });
	});

	// For each row, filter out undefined and single claims.
	fabric.forEach((row) => {
		if (void 0 !== row) {
			const multiClaims = row.filter((col) => (void 0 !== col && 1 !== col.length));
			multiClaimCount += multiClaims.length;
		}
	});

	return multiClaimCount;
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
		right: 7,
		top: 2,
		bottom: 5,
		width: 5,
		height: 4
	}),
	testCases.create(solution1, [
		`#1 @ 1,3: 4x4`,
		`#2 @ 3,1: 4x4`,
		`#3 @ 5,5: 2x2`
	], 4)
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