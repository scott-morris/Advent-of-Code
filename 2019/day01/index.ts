import getFuelRequired = require("./get-fuel-required");
import getCompoundedFuel = require("./get-compounded-fuel");
import getInputAsNumber = require("../helpers/get-input-as-number");
import logger = require("../helpers/logger");

const input = getInputAsNumber(__dirname);

const answer1 = input.reduce((sum: number, input: number) => sum + getFuelRequired(input), 0);
const answer2 = input.reduce((sum: number, input: number) => sum + getCompoundedFuel(input), 0);

logger.displayResults(answer1, answer2);