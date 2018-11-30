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
const descPath = `./day${leftPad(day)}/readme.md`;
const fullDescPath = path.resolve(CWD, descPath);

// If the file doesn't exist, stop.
if (!fs.existsSync(fullDescPath)) {
	logger.warn(`The file ${fullDescPath} does not exist. Exiting`.red.bold);
	process.exit(0);
}

(async () => {
	// Attempt to read the description.
	const siteInfo = await readSite(year, day);

	// Create the rendering values.
	const renderOptions = Object.assign({}, siteInfo, {
		year,
		day
	});

	// Re-render the `readme.md` file into the folder.
	const filePath = path.join(CWD, TEMPLATE_FOLDER, "readme.md");
	logger.log(`Attempting to read ${filePath}`);
	const rawContent = fs.readFileSync(filePath, "utf8");

	// Render with settings.
	logger.log(`Rendering file`);
	const renderedContent = render(rawContent, renderOptions);

	// Output to new directory.
	logger.log(`Outputting rendered file to ${fullDescPath}`);
	fs.writeFileSync(fullDescPath, renderedContent, "utf8");

	logger.loud(`Updated ${fullDescPath}`.bold.green);
	process.exit(0);
})();