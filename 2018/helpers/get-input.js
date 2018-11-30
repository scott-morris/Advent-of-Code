"use strict";

// Libraries.

const fs = require("fs");
const path = require("path");

// Private.
const CWD = process.cwd();

// Public.

/**
 * Read an input file for Advent of Code days. Based on whether it is a
 * multi-line file, return either the string value or an array of values.
 * @param {String} [directory] directory to look for the input file.
 * @return {Array|String}
 */
const getInput = (directory = CWD) => {
	const filePath = path.join(directory, "input.txt");
	const contents = fs.readFileSync(filePath, "utf8");

	// If the contents have multiple lines, return an array of values
	// split by the newline.
	return (contents.indexOf("\n") > -1) ?
		contents.split("\n") :
		contents;
};

module.exports = getInput;