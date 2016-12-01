const fs = require("fs");
const colors = require("colors");

const fileName = (day) => `./inputs/advent_${(day < 10) ? "0" + day : day}.txt`;
const getInput = (day) => fs.readFileSync(fileName(day), "utf8");
const getInputArray = (day) => fs.readFileSync(fileName(day), "utf8").split("\n");

const stringify = (value) => (typeof value === "object") ? JSON.stringify(value) : value
const log = (key, value) => console.log(`${key}:`.red.bold, (typeof value === "object") ? JSON.stringify(value).green : colors.green(value))

const displayResults = (answer1, answer2) => {
	log("Answer #1", answer1)
	log("Answer #2", answer2)
}


module.exports = {
	fileName,
	getInput,
	getInputArray,
	log,
	displayResults
}