// Imports.

import computeWithParameters = require("./compute-with-parameters");
import getInput = require("../helpers/get-input");
import logger = require("../helpers/logger");
import processData = require("./process-data");
import findValue = require("./find-value");

// Get inputs.

const rawInput = getInput(__dirname);
const input = processData(rawInput);

// Set answers.

const answer1 = computeWithParameters(input, 12, 2);
const answer2 = findValue(19690720, input);

// Display results.

logger.displayResults(answer1, answer2);