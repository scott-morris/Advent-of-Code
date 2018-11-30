"use strict";

// Libraries.

const colors = require("colors");

// Dependencies.

const logger = require("./helpers/logger");
const leftPad = require("./helpers/leftPad");
const safeRequire = require("./helpers/safeRequire");
const testCases = require("./helpers/testCases");

// Private.

const [ node, file, ...args ] = process.argv;

// Get the day from the arguments.
const day = args[0];
const dayJSpath = `./day${leftPad(day)}`;

// Attempt to read the script for the given day.
const dayJS = safeRequire(__dirname, dayJSpath);

if (!dayJS) {
	process.exit(0);
}

// Run tests first to confirm requirements have been met.
// If the tests do not pass, do not bother processing the real inputs.
testCases.run(dayJS.tests);

// If the tests pass, then try to run the actual functions.
dayJS.run();

process.exit(0);