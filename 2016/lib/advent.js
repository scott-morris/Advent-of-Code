"use strict"
const fs = require("fs");
const colors = require("colors");

const fileName = (day) => `./inputs/advent_${(day < 10) ? "0" + day : day}.txt`;
const getInput = (day) => {
	let contents = fs.readFileSync(fileName(day), "utf8")
	return (contents.indexOf("\n") > -1) ? contents.split("\n") : contents
}

const stringify = (value) => (typeof value === "object") ? JSON.stringify(value) : value
const log = (key, value) => console.log(`${key}:`.red.bold, colors.green(stringify(value)))

const displayResults = (answer1, answer2) => {
	log("Answer #1", answer1)
	log("Answer #2", answer2)
}

module.exports = {
	fileName,
	getInput,
	log,
	displayResults
}