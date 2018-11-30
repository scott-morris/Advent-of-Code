"use strict";

// Libraries.

const colors = require("colors");
const fs = require("fs");
const path = require("path");

// Dependencies.

const leftPad = require("./helpers/left-pad");
const logger = require("./helpers/logger");
const readSite = require("./helpers/read-site");
const render = require("./helpers/render");

// Constants.

const CWD = process.cwd();
const TEMPLATE_FOLDER = path.resolve(process.cwd(), "/template");
const TEMPLATE_FILES = [
	"index.js",
	"input.txt",
	"readme.md"
];

// Process Arguments.

const [ node, file, ...args ] = process.argv;

const day = args[0];
const year = args[1] || "2018";

// Compose the folder path.
const dayJSpath = `./day${leftPad(day)}`;
const outputFolderPath = path.resolve(CWD, dayJSpath);

// If the folder already exists, stop.
if (fs.existsSync(outputFolderPath)) {
	logger.warn(`The folder ${outputFolderPath} already exists. Exiting`.red.bold);
	process.exit(0);
}

(async () => {
	// Create the directory.
	fs.mkdir(outputFolderPath);

	// Attempt to read the description.
	const siteInfo = await readSite(year, day);

	// Create the rendering values.
	const renderOptions = Object.assign({}, siteInfo, {
		year,
		day
	});

	// For each file in the template folder, render them into the new folder.
	TEMPLATE_FILES.forEach((file) => {
		// Read the file.
		const filePath = path.join(CWD, TEMPLATE_FOLDER, file);
		logger.log(`Attempting to read ${filePath}`);
		const rawContent = fs.readFileSync(filePath, "utf8");

		// Render with settings.
		logger.log(`Rendering file`);
		const renderedContent = render(rawContent, renderOptions);

		// Output to new directory.
		const outputFilePath = path.join(outputFolderPath, file);
		logger.log(`Outputting rendered file to ${outputFilePath}`);
		fs.writeFileSync(outputFilePath, renderedContent, "utf8");
	});

	process.exit(0);
})();