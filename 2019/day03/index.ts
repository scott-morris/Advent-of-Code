// Imports.

import getInput = require("../helpers/get-input");
import logger = require("../helpers/logger");
import processData = require("./process-data");

// Get inputs.

const rawInput = getInput(__dirname);
const input = processData(rawInput);

// Set answers.

const answer1 = "n/a";
const answer2 = "n/a";

// Display results.

logger.displayResults(answer1, answer2);