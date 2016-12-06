"use strict"
if (typeof Promise === 'undefined') { require('native-promise-only'); }

const fs = require("fs")
const colors = require("colors")
const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const fileName = (day) => `./inputs/advent_${(day < 10) ? "0" + day : day}.txt`
const getInput = (day) => {
	let contents = fs.readFileSync(fileName(day), "utf8")
	return (contents.indexOf("\n") > -1) ? contents.split("\n") : contents
}

const stringify = (value) => (typeof value === "object") ? JSON.stringify(value) : value
const log = (key, value) => console.log(`${key}:`.red.bold, colors.green(stringify(value)))
const logLine = (values) => {
	readline.clearLine(rl, 0)
	readline.cursorTo(process.stdout, 0)
	values.forEach(val => rl.write(val))
}

const runTests = (testCases) => {
	let numComplete = 0

	const updateLog = () => {
		let percentDone = parseInt(((numComplete) / testCases.length) * 100, 10)
		logLine([`Testing... `.red.bold, `${percentDone}%`.green])
	}

	updateLog()
	testCases.forEach((testCase) => {
		Promise.resolve(testCase()).then(() => {
			numComplete++
			updateLog()
		})
	})
	Promise.all(testCases).then(() => console.log(""))
}

const displayResults = (answer1, answer2) => {
	log("Answer #1", answer1)
	log("Answer #2", answer2)
}

module.exports = {
	fileName,
	getInput,
	log,
	logLine,
	runTests,
	displayResults
}