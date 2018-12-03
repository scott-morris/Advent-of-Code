"use strict";

// Dependencies.

const safeRequire = require("./helpers/safe-require");
const testCases = require("./helpers/test-cases");

// Private.

const [ node, file, ...args ] = process.argv;

// Get the day from the arguments.
const filePath = args[0];

// Attempt to read the script for the given day.
const dayJS = safeRequire(__dirname, filePath);

if (!dayJS) {
	process.exit(0);
}

// Run tests first to confirm requirements have been met.
// If the tests do not pass, do not bother processing the real inputs.
testCases.run(dayJS.tests);

// If the tests pass, then try to run the actual functions.
dayJS.run();

process.exit(0);